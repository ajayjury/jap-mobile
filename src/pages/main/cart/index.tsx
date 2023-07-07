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
            <IonContent fullscreen={false} forceOverscroll={true} className="ion-padding">
                <EmptyCart />
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
            </IonContent>
        </IonPage>
    );
};

export default Cart;
