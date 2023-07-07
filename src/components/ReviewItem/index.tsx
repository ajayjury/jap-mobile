import { IonItemDivider, IonRow, IonCol, IonText, IonIcon } from "@ionic/react";
import { starOutline } from "ionicons/icons";
import MainHeader from "../MainHeader";

const ReviewItem: React.FC = () => {
    return (
        <IonItemDivider className="review-divider-total">
            <div className="ion-padding w-100 pt-0 pb-0">
                <IonRow className="ion-align-items-center ion-justify-content-start p-0 w-100">
                    <IonCol
                        size="2"
                        className='text-left'
                    >
                        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </IonCol>
                    <IonCol
                        size="10"
                        className='text-left'
                    >
                        <IonText color="success" className="text-left mb-0 pb-0">
                            <h6 className="text-left mb-0 pb-0 mt-0 pt-0">John Doe</h6>
                        </IonText>
                        <IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon>
                    </IonCol>
                    <IonCol
                        size="12"
                        className='text-left'
                    >
                        <p className="font-normal mt-0 pt-0 mb-0 pb-0">Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic.</p>
                    </IonCol>
                </IonRow>
            </div>
        </IonItemDivider>
    );
}

export default ReviewItem;