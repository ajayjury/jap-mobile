import {
    IonPage,
    IonContent,
    IonItem,
    IonCard,
    IonIcon,
    IonLabel,
} from "@ionic/react";
import { useCallback, useContext, useEffect, useState } from "react";
import OrderItem from "../../../components/OrderItem";
import BackHeader from "../../../components/BackHeader";
import { callOutline, homeOutline, mailOutline, personOutline } from "ionicons/icons";
import { RouteComponentProps, useLocation } from "react-router";
import { api_routes } from "../../../helper/routes";
import { AxiosResponse } from "axios";
import { axiosPublic } from "../../../../axios";
import { Order } from "../../../helper/types";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingPricingTable from "../../../components/LoadingPricingTable";

interface OrderProps extends RouteComponentProps<{
    receipt: string;
}> {}

const OrderDetail: React.FC<OrderProps> = ({match}) => {
    
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<Order>({
        id: 0,
        receipt: match.params.receipt,
        created_at: '',
        updated_at: '',
        coupon_discount: 0,
        delivery_charge: 0,
        gst_charge: 0,
        sub_total: 0,
        total_discount: 0,
        total_items: 0,
        total_quantity: 0,
        total_price_with_coupon_dicount: 0,
        total_price_with_gst_delivery_charge: 0,
        total_price_without_gst_delivery_charge: 0,
        coupon: {
            name: null,
            description: null,
            discount: null,
            maximum_dicount_in_price: null,
            maximum_number_of_use: null,
            code: null,
        },
        products: [],
        coupon_name: '',
        coupon_code: '',
        coupon_discount_percentage: '',
        coupon_maximum_discount: 0,
        coupon_maximum_use: 0,
        billing_first_name: '',
        billing_last_name: '',
        billing_email: '',
        billing_phone: 0,
        billing_country: '',
        billing_state: '',
        billing_city: '',
        billing_pin: 0,
        billing_address_1: '',
        billing_address_2: '',
        shipping_first_name: '',
        shipping_last_name: '',
        shipping_email: '',
        shipping_phone: 0,
        shipping_country: '',
        shipping_state: '',
        shipping_city: '',
        shipping_pin: 0,
        shipping_address_1: '',
        shipping_address_2: '',
        order_notes: '',
        mode_of_payment: 'Cash On Delivery',
        order_status: '',
        payment_status: '',
        razorpay_order_id: '',
      });

      const {auth} = useContext(AuthContext);

    useEffect(() => {
        fetchProducts();
        return () => {}
      }, [match.params.receipt, auth])
    
      const fetchProducts = useCallback(
        async () => {
          setLoading(true);
          try {
              let product_link = api_routes.place_order_detail+`/${match.params.receipt}`;
              const response:AxiosResponse = await axiosPublic.get(product_link, {
                headers: {"Authorization" : `Bearer ${auth.token}`}
              });
              setOrder({...response.data.order})
              
          } catch (error) {
              console.log(error);
          }finally{
              setLoading(false);
          }
        },
        [match.params.receipt, auth],
      )


    return (
        <IonPage>
            <BackHeader title='Order Detail' link='/orders' />
            <IonContent fullscreen={false} forceOverscroll={true}>

                {
                    loading ? <>
                        <LoadingPricingTable />
                        <LoadingPricingTable />
                    </>: <>
                        <IonCard className="mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-0'>
                                <div className="content-main mt-1">
                                    <h6>Order Information</h6>
                                </div>
                            </div>
                            <IonItem lines="full">
                                <IonLabel className="ion-text-wrap">
                                    <p><code>Order ID: </code>{order.id}</p>
                                    <p><code>Reciept: </code>{order.receipt}</p>
                                    <p><code>Placed:</code> {order.created_at}</p>
                                    <p><code>Payment Mode:</code> {order.mode_of_payment}</p>
                                    <p><code>Order Status:</code> {order.order_status}</p>
                                    {order.coupon.code ? <p><code>Coupon:</code> {order.coupon.code} ({order.coupon.discount}%)</p> : null}
                                </IonLabel>
                            </IonItem>
                            
                        </IonCard>

                        <IonCard className=" mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-0'>
                                <div className="content-main mt-1">
                                    <h6>Order Items</h6>
                                </div>
                            </div>
                            {
                                order.products.map((item, i) => <OrderItem {...item} key={i} />)
                            }
                        </IonCard>

                        <IonCard className="mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-0'>
                                <div className="content-main mt-1">
                                    <h6>Billing Information</h6>
                                </div>
                            </div>
                            <div>
                                <IonItem lines="inset">
                                    <IonIcon icon={personOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_first_name} {order.billing_last_name}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_email}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={callOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_phone}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={homeOutline} slot="start"></IonIcon>
                                    <IonLabel className="ion-text-wrap">
                                        <p>{order.billing_address_1}</p>
                                        {order.billing_address_2 ? <p>{order.billing_address_2}</p> : null}
                                        <p>{order.billing_city} - {order.billing_pin}</p>
                                        <p>{order.billing_state}, {order.billing_country}</p>
                                    </IonLabel>
                                </IonItem>
                            </div>
                            
                        </IonCard>
                        
                        <IonCard className="mt-2">
                            <div className='ion-padding pt-0 pb-2'>
                                <div className="content-main mt-1">
                                    <h6>Pricing Information</h6>
                                </div>
                            </div>
                            <table className="w-100 border-final-1">
                                <thead className="w-100">
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Total Items:</td>
                                        <td className="text-right tr-price">{order.total_items}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Sub Total:</td>
                                        <td className="text-right tr-price">Rs. {order.sub_total}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Total Discount:</td>
                                        <td className="text-right tr-price">- Rs. {order.total_discount}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">GST:</td>
                                        <td className="text-right tr-price">+ Rs. {order.gst_charge}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Delivery Charge:</td>
                                        <td className="text-right tr-price">+ Rs. {order.delivery_charge}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                        <td className="text-right tr-price font-bold">Rs. {(order.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Coupon Discount:</td>
                                        <td className="text-right tr-price">- Rs. {order.coupon_discount}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                        <td className="text-left tr-price font-bold">Total:</td>
                                        <td className="text-right tr-price font-bold">Rs. {order.total_price_with_coupon_dicount}</td>
                                    </tr>
                                </thead>
                            </table>
                        </IonCard>
                    </>
                }

            </IonContent>
        </IonPage>
    );
};

export default OrderDetail;
