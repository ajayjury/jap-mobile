import { IonButton, IonFooter, IonIcon, IonImg, IonToolbar } from "@ionic/react";
import { logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from "ionicons/icons";


const MainFooter: React.FC = () => {
    return (
        <IonFooter className='main-header-background'>
            <IonToolbar className='main-header-background'>
              <IonImg
                  src="/images/logo.webp"
                  alt="Logo"
                  className="footer-img-logo  mt-1"
              ></IonImg>
              <div className='text-center mt-1 mb-1'>
                <IonButton color='success' fill='clear'>
                  <IonIcon slot="icon-only" icon={logoFacebook}></IonIcon>
                </IonButton>
                <IonButton color='success' fill='clear'>
                  <IonIcon slot="icon-only" icon={logoInstagram}></IonIcon>
                </IonButton>
                <IonButton color='success' fill='clear'>
                  <IonIcon slot="icon-only" icon={logoLinkedin}></IonIcon>
                </IonButton>
                <IonButton color='success' fill='clear'>
                  <IonIcon slot="icon-only" icon={logoTwitter}></IonIcon>
                </IonButton>
              </div>
            </IonToolbar>
        </IonFooter>
    );
}

export default MainFooter;