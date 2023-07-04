import { IonContent, IonCard, IonPage, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import './index.css';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const Auth: React.FC<Props> = ({children} : Props) => {
    return (
      <IonPage>
        <IonContent fullscreen={false} forceOverscroll={true} className="ion-padding auth-main-background">
            <IonGrid className="h-100">
                <IonRow className="h-100 ion-align-items-center ion-justify-content-center">
                    <IonCol
                    size="6"
                    size-xl="6"
                    size-lg="6"
                    size-md="6"
                    size-sm="12"
                    size-xs="12"
                    >
                    <IonImg
                        src="/images/logo.webp"
                        alt="Logo"
                        className="img-logo"
                    ></IonImg>
                    <IonCard className="auth-card-background">
                        {children}
                    </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Auth;