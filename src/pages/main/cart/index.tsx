import {
    IonButton,
    IonText,
    IonRow,
    IonCol,
    IonToast,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItemDivider,
    IonItem,
    IonIcon,
    IonInput,
    IonCard,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import { chevronForwardOutline } from "ionicons/icons";
import CartItem from "../../../components/CartItem";

const Cart: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);


    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={true}>
                {/* <EmptyCart type="cart" /> */}

                <IonCard className=" mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Cart Items</h6>
                        </div>
                    </div>
                    <CartItem type="cart" />
                    <CartItem type="cart" />
                </IonCard>

                <IonCard className="final-table mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Coupon Code</h6>
                        </div>
                    </div>
                    <div className='ion-padding'>
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                            <IonCol
                                size="9"
                                className='text-left'
                            >
                                <IonItem>
                                    <IonInput
                                    className="coupon-code-input-holder"
                                    clearInput={true}
                                    placeholder="Enter Coupon Code"
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol
                                size="3"
                                className='text-right'
                            >
                                <IonButton className="m-0" size="small" fill='outline' color="success">
                                    Apply
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </div>
                    
                </IonCard>
                
                <IonCard className="final-table mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Total Price</h6>
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

                <IonItemDivider className="cart-divider-total" slot="fixed">
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                        <IonCol
                            size="6"
                            className='text-left'
                        >
                            <IonText className="text-left mb-0 pb-0">
                                <h4 className="text-left mb-0 pb-0 mt-0 pt-0">Rs. 16020</h4>
                            </IonText>
                        </IonCol>
                        <IonCol
                            size="6"
                            className='text-right'
                        >
                            <IonButton className="pagination-btn m-0" fill='solid' color="success">
                                Checkout
                                <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>

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

export default Cart;
