import { IonButton, IonFooter, IonIcon, IonImg, IonToolbar } from "@ionic/react";
import { logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from "ionicons/icons";
import { Browser } from '@capacitor/browser';


const MainFooter: React.FC = () => {
  const openBrowser = async(url:string) =>{
    await Browser.open({ url });
  }

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
              <div className='text-center mt-1 mb-1'>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/gallery')}>Gallery</IonButton>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/certifications')}>Certifications</IonButton>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/shipping-policy')}>Shipping Policy</IonButton>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/terms-conditions')}>Terms & Conditions</IonButton>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/privacy-policy')}>Privacy Policy</IonButton>
                <IonButton fill="clear" color='success' onClick={()=>openBrowser('https://jap.bio/return-refund')}>Return & Refund</IonButton>
              </div>
            </IonToolbar>
        </IonFooter>
    );
}

export default MainFooter;