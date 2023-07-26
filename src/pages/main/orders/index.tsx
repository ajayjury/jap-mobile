import {
    IonPage,
    IonContent,
    IonGrid,
    IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";
import OrderCard from "../../../components/OrderCard";
import Pagination from "../../../components/Pagination";
import { useCallback, useContext, useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { Meta, Order as OrderType } from "../../../helper/types";
import { api_routes } from "../../../helper/routes";
import { AxiosResponse } from "axios";
import { axiosPublic } from "../../../../axios";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingOrderCard from "../../../components/LoadingOrderCard";


const Order: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const {page, prevHandler, nextHandler} = usePagination();
    const [orders, setOrders] = useState<OrderType[]|[]>([]);
    const [meta, setMeta] = useState<Meta>({
        next_disabled: true,
        prev_disabled: true,
    });
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        fetchOrders();
        return () => {}
      }, [page, auth])
  
      const fetchOrders = useCallback(
        async () => {
          setLoading(true);
          try {
              let order_link = api_routes.place_order_paginate+`?page=${page}`;
              const response:AxiosResponse = await axiosPublic.get(order_link, {
                headers: {"Authorization" : `Bearer ${auth.token}`}
              });
              setOrders([...response.data.data])
              const metaResp = meta
              if(response.data.links.next){
                  metaResp.next_disabled = false
              }else{
                  metaResp.next_disabled = true
              }
              if(response.data.links.prev){
                  metaResp.prev_disabled = false
              }else{
                  metaResp.prev_disabled = true
              }
              setMeta({
                  ...metaResp
              })
          } catch (error) {
              console.log(error);
          }finally{
              setLoading(false);
          }
        },
        [page, auth],
      )


    return (
        <IonPage>
            <BackHeader title='Orders' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={true}>
                {loading ? <LoadingOrderCard /> : orders.length>0 ? <>
                    {
                        orders.map((item, i) =><Link className="no-underline" to={`/orders/${item.receipt}`} key={i}>
                            <OrderCard {...item} />
                        </Link>)
                    }
                    <div className='ion-padding pt-0'>

                        <IonGrid className="mt-1 p-0">
                            <Pagination prev={()=>prevHandler()} prev_disabled={meta.prev_disabled} next={()=>nextHandler()} next_disabled={meta.next_disabled} />
                        </IonGrid>

                    </div>
                </> : <IonText color={'success'}>
                <p className="text-center mt-1">Oops! No orders available.</p>
                </IonText>}
            </IonContent>
        </IonPage>
    );
};

export default Order;
