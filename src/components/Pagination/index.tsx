import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

const Pagination: React.FC = () => {
    return (
        <IonRow className="ion-align-items-center ion-justify-center-center p-0 mt-1">
            <IonCol
                size="6"
                className='text-right'
            >
                <IonButton className="pagination-btn m-0" fill='outline' color="success">
                <IonIcon slot="start" icon={chevronBackOutline}></IonIcon>
                Prev
                </IonButton>
            </IonCol>
            <IonCol
                size="6"
                className='text-left'
            >
                <IonButton className="pagination-btn m-0" fill='outline' color="success">
                Next
                <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                </IonButton>
            </IonCol>
        </IonRow>
    );
}

export default Pagination;