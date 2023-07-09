import {
    IonPage,
    IonContent,
    IonGrid,
} from "@ionic/react";
import { Link } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";
import OrderCard from "../../../components/OrderCard";
import Pagination from "../../../components/Pagination";


const Order: React.FC = () => {


    return (
        <IonPage>
            <BackHeader title='Orders' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={true}>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <Link className="no-underline" to="/orders/1">
                    <OrderCard />
                </Link>
                <div className='ion-padding pt-0'>

                    <IonGrid className="mt-1 p-0">
                        <Pagination />
                    </IonGrid>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Order;
