import {
    IonButton,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonToast,
    IonSpinner,
    IonPage,
    IonContent,
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
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
import Auth from "../../../layout/Auth";
import EmptyCart from "../../../components/EmptyCart";
import { chevronForwardOutline, trashOutline } from "ionicons/icons";

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
                {/* <EmptyCart /> */}

                <IonCard className=" mt-2 mb-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Cart Items</h6>
                        </div>
                    </div>
                    <IonItemGroup>
                        <IonItemDivider className="cart-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="10"
                                    className='text-left'
                                >
                                    <IonLabel>Product 1</IonLabel>
                                </IonCol>
                                <IonCol
                                    size="2"
                                    className='text-right'
                                >
                                    <IonButton className="pagination-btn m-0" fill='outline' color="danger">
                                        <IonIcon icon={trashOutline}></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <div className="ion-padding">
                            <IonRow className="ion-align-items-center p-0 mt- w-100">
                                    <IonCol
                                        size="3"
                                        className='text-left'
                                    >
                                        <div className='product-img-container'>
                                            <IonImg alt="product" className='' src='https://orgado-react.vercel.app/assets/img/trending/product/product-01.png' />
                                        </div>
                                    </IonCol>
                                    <IonCol
                                        size="9"
                                        className='text-left'
                                    >
                                        <IonText color="success" className="text-left mb-0 pb-0">
                                            <h6 className="text-left mb-0 pb-0 mt-0 pt-0">Product 1</h6>
                                        </IonText>   
                                        <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic.</p>
                                        <div className="quantity-holder">
                                            <div className="col-auto">
                                                <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                                    -
                                                </IonButton>
                                            </div>
                                            <div className="col-3">
                                                <IonInput aria-label="Quantity" value="1" className="text-center quantity-text-holder"></IonInput>
                                            </div>
                                            <div className="col-auto">
                                                <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                                    +
                                                </IonButton>
                                            </div>
                                        </div>
                                    </IonCol>
                            </IonRow>
                            <table className="mt-1 w-100 border-1">
                                <thead className="w-100">
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Price:</td>
                                        <td className="text-right tr-price">Rs. 100</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Discount:</td>
                                        <td className="text-right tr-price">Rs. 100</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price font-bold">Total:</td>
                                        <td className="text-right tr-price font-bold">Rs. 100</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider className="cart-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="10"
                                    className='text-left'
                                >
                                    <IonLabel>Product 1</IonLabel>
                                </IonCol>
                                <IonCol
                                    size="2"
                                    className='text-right'
                                >
                                    <IonButton className="pagination-btn m-0" fill='outline' color="danger">
                                        <IonIcon icon={trashOutline}></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <div className="ion-padding">
                            <IonRow className="ion-align-items-center p-0 mt- w-100">
                                    <IonCol
                                        size="3"
                                        className='text-left'
                                    >
                                        <div className='product-img-container'>
                                            <IonImg alt="product" className='' src='https://orgado-react.vercel.app/assets/img/trending/product/product-01.png' />
                                        </div>
                                    </IonCol>
                                    <IonCol
                                        size="9"
                                        className='text-left'
                                    >
                                        <IonText color="success" className="text-left mb-0 pb-0">
                                            <h6 className="text-left mb-0 pb-0 mt-0 pt-0">Product 1</h6>
                                        </IonText>   
                                        <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic.</p>
                                        <div className="quantity-holder">
                                            <div className="col-auto">
                                                <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                                    -
                                                </IonButton>
                                            </div>
                                            <div className="col-3">
                                                <IonInput aria-label="Quantity" value="1" className="text-center quantity-text-holder"></IonInput>
                                            </div>
                                            <div className="col-auto">
                                                <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                                    +
                                                </IonButton>
                                            </div>
                                        </div>
                                    </IonCol>
                            </IonRow>
                            <table className="mt-1 w-100 border-1">
                                <thead className="w-100">
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Price:</td>
                                        <td className="text-right tr-price">Rs. 100</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Discount:</td>
                                        <td className="text-right tr-price">Rs. 100</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price font-bold">Total:</td>
                                        <td className="text-right tr-price font-bold">Rs. 100</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </IonItemGroup>
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
