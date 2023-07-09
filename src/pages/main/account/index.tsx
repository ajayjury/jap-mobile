import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonIcon,
} from "@ionic/react";
import { bagCheckOutline, bookmarkOutline, cogOutline, personCircleOutline } from "ionicons/icons";
import { Link } from "react-router-dom";


const Account: React.FC = () => {


    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={true}>
                <Link className="no-underline" to="/profile">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Profile</IonLabel>
                        <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/setting">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Setting</IonLabel>
                        <IonIcon icon={cogOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/wishlist">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Wishlist</IonLabel>
                        <IonIcon icon={bookmarkOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/orders">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Orders</IonLabel>
                        <IonIcon icon={bagCheckOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>


            </IonContent>
        </IonPage>
    );
};

export default Account;
