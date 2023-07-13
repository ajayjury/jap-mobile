import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, } from "@ionic/react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import { AxiosResponse } from "axios";
import LoadingCard from "../LoadingCard";
import { CategorySlugProps, Meta, ProductSegmentState } from "../../helper/types";
import { usePagination } from "../../hooks/usePagination";
import { segments } from "../../helper/constants";

const ProductSegment: React.FC<CategorySlugProps> = ({category_slug}) => {
    const [segment, setSegment] = useState<string>('default')
    const [segmentUrl, setSegmentUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const {page, setPage, prevHandler, nextHandler} = usePagination();
    const [products, setProducts] = useState<ProductSegmentState[]|[]>([]);
    const [meta, setMeta] = useState<Meta>({
        next_disabled: true,
        prev_disabled: true,
    });

    useEffect(() => {
      fetchProducts();
      return () => {}
    }, [page, segmentUrl])

    const fetchProducts = useCallback(
      async () => {
        setLoading(true);
        try {
            let category_slug_link = api_routes.products+`?page=${page}`;
            if(category_slug){
                category_slug_link+=`?page=${page}&filter[has_categories]=${category_slug}`
            }
            const response:AxiosResponse = await axiosPublic.get(category_slug_link+segmentUrl);
            setProducts([...response.data.data])
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
      [page, segmentUrl],
    )

    const segmentChangeHandler = useCallback((data:any):void => {
        setSegment(data.detail.value)
        setPage(1)
        if(data.detail.value==='default'){
            setSegmentUrl('')
            return;
        }
        setSegmentUrl(`&filter[${data.detail.value}]=true`)
    }, [segmentUrl])
    
    return (
        <>
            <div className="content-main mt-2 mb-1">
              <h2>Products</h2>
            </div>

            <IonSegment scrollable={true} value={segment} color="success" onIonChange={(data)=>segmentChangeHandler(data)}>
                {
                    segments.map((item, i)=><IonSegmentButton value={item.value} key={i}>
                    <IonLabel>{item.name}</IonLabel>
                    </IonSegmentButton>)
                }
            </IonSegment>
            
            {loading ? <LoadingCard /> : products.length>0 ? <>
                <IonGrid className="mt-1 p-0">
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                    {
                        products.map((item, i) => <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6" className='p-0' key={i}
                    >
                        <Link className="no-underline" to={`/products/${item.slug}`}>
                            <ProductCard image={item.featured_image_link} name={item.name} price={`Rs. ${item.price}`} discounted_price={`Rs. ${item.discounted_price}`} />
                        </Link>
                    </IonCol>)
                    }

                    </IonRow>
                    <Pagination prev={()=>prevHandler()} prev_disabled={meta.prev_disabled} next={()=>nextHandler()} next_disabled={meta.next_disabled} />
                </IonGrid>
            </> : <IonText color={'success'}>
               <p className="text-center mt-1">Oops! No products available.</p>
            </IonText>}

        </>
    );
}

export default ProductSegment;