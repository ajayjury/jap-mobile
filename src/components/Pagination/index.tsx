import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

type Props = {
    prev: () => void;
    next: () => void;
    prev_disabled?: boolean;
    next_disabled?: boolean;
}
const Pagination: React.FC<Props> = ({prev, next, prev_disabled=true, next_disabled=true}) => {
    return (
        <IonRow className="ion-align-items-center ion-justify-center-center p-0 mt-1">
            <IonCol
                size="6"
                className='text-right'
            >
                <IonButton className="pagination-btn m-0" fill='outline' color="success" disabled={prev_disabled} onClick={prev}>
                <IonIcon slot="start" icon={chevronBackOutline}></IonIcon>
                    Prev
                </IonButton>
            </IonCol>
            <IonCol
                size="6"
                className='text-left'
            >
                <IonButton className="pagination-btn m-0" fill='outline' color="success" disabled={next_disabled} onClick={next}>
                    Next
                <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                </IonButton>
            </IonCol>
        </IonRow>
    );
}

export default Pagination;