import {
    IonToast,
    IonPage,
    IonContent,
    IonCard,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useContext, useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import CartItem from "../../../components/CartItem";
import BackHeader from "../../../components/BackHeader";
import { AuthContext } from "../../../context/AuthProvider";

const Wishlist: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);

    const {auth} = useContext(AuthContext);


    return (
        <IonPage>
            <BackHeader title='Wishlist' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={true}>

                {auth.authenticated ? <>
                
                    <IonCard className="mt-2">
                        <div className='ion-padding pt-0 pb-2'>
                            <div className="content-main mt-1">
                                <h6>Wishlist Items</h6>
                            </div>
                        </div>
                        <CartItem type="wishlist" />
                        <CartItem type="wishlist" />
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

                </> : <EmptyCart type="wishlist" />}

            </IonContent>
        </IonPage>
    );
};

export default Wishlist;
