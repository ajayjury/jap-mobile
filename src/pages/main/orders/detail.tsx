import {
    IonButton,
    IonRow,
    IonCol,
    IonToast,
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonCard,
    IonIcon,
    IonLabel,
} from "@ionic/react";
import { useState } from "react";
import OrderItem from "../../../components/OrderItem";
import BackHeader from "../../../components/BackHeader";
import { callOutline, homeOutline, mailOutline, personOutline } from "ionicons/icons";

const OrderDetail: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);


    return (
        <IonPage>
            <BackHeader title='Order Detail' link='/orders' />
            <IonContent fullscreen={false} forceOverscroll={true}>

                <IonCard className="mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Order Information</h6>
                        </div>
                    </div>
                    <IonItem lines="full">
                        <IonLabel className="ion-text-wrap">
                            <p><code>Order ID: </code>22</p>
                            <p><code>Reciept: </code>68ddf3f0-2d46-4a36-b05d-5a135e8e3d35</p>
                            <p><code>Placed:</code> 3 weeks ago</p>
                            <p><code>Payment Mode:</code> ONLINE</p>
                            <p><code>Order Status:</code> OUT FOR DELIVERY</p>
                            <p><code>Coupon:</code> ABC10 (10%)</p>
                        </IonLabel>
                    </IonItem>
                    
                </IonCard>

                <IonCard className=" mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Order Items</h6>
                        </div>
                    </div>
                    <OrderItem />
                    <OrderItem />
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
                                <p>Subham Saha</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="inset">
                            <IonIcon icon={mailOutline} slot="start"></IonIcon>
                            <IonLabel>
                                <p>subham@gmail.com</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="inset">
                            <IonIcon icon={callOutline} slot="start"></IonIcon>
                            <IonLabel>
                                <p>7892156160</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="inset">
                            <IonIcon icon={homeOutline} slot="start"></IonIcon>
                            <IonLabel className="ion-text-wrap">
                                <p>Room 502, Mythri prestige apartment</p>
                                <p>Saraswatipuram cross, Arekere</p>
                                <p>Bangalore - 560076</p>
                                <p>karnataka, India</p>
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
                                <td className="text-right tr-price">3</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price">Sub Total:</td>
                                <td className="text-right tr-price">Rs. 16020</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price">Total Discount:</td>
                                <td className="text-right tr-price">Rs. 100</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price">GST:</td>
                                <td className="text-right tr-price">Rs. 100</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price">Delivery Charge:</td>
                                <td className="text-right tr-price">Rs. 100</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                <td className="text-right tr-price font-bold">Rs. 16020</td>
                            </tr>
                            <tr className="border-bottom-1 w-100">
                                <td className="text-left tr-price">Coupon Discount:</td>
                                <td className="text-right tr-price">Rs. 100</td>
                            </tr>
                            <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                <td className="text-left tr-price font-bold">Total:</td>
                                <td className="text-right tr-price font-bold">Rs. 16020</td>
                            </tr>
                        </thead>
                    </table>
                </IonCard>

                <div className="ion-padding">
                    <IonToast
                        isOpen={isToastOpen}
                        message={responseMessage}
                        onDidDismiss={() => setIsToastOpen(false)}
                        duration={5000}
                        buttons={[
                        {
                            text: "Close",
                            handler: () => {
                            setIsToastOpen(false);
                            },
                        },
                        ]}
                        layout="stacked"
                    ></IonToast>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default OrderDetail;
