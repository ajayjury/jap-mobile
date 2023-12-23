import { IonGrid, IonRow, IonCol, IonPage, IonContent, ScrollDetail } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useState } from 'react';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import CategoryCard from '../../../components/CategoryCard';
import PaginationComponent from '../../../components/Pagination';
import Slider from '../../../components/Slider';
import ProductSegment from '../../../components/ProductSegment';
import CategorySegment from '../../../components/CategorySegment';

const images = [
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
];



const Home: React.FC = () => {

  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);

  const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => {
    if(ev.detail.scrollTop>475){
      setShowSubHeader(true);
    }else{
      setShowSubHeader(false);
    }
  }, [])
  

    return (
      <IonPage>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <MainHeader />
          <Slider images={images} />
          <div className={`content-main custom-main-header ${isPlatform('ios') ? 'pt-40' : 'pt-10'} ${showSubHeader ? isPlatform('ios') ? 'custom-main-header-bg pt-40' : 'custom-main-header-bg pt-10' : ''}`}>
              <h1>JAIVIK AVAM PRAKRUTIK</h1>
          </div>
          <div className='ion-padding pt-0'>
            <div className="content-main">
              <p>JAP-PCL was created as a multi-state farmer's producer company, started by shareholder-member farmers from Karnataka, Tamil Nadu, Kerala and Andhra Pradesh. All these farmers practice only organic farming or natural farming, and hence the names, jaivik (organic) and pratrutik (natural). These organic farmers have been certified since 2015. Later, the new PCL was joined by small holders certified groups (ICS groups – Internal Control Systems) from different districts/locations from the 4 states, thus giving a wider basket of offerings for FPOs to connect to markets and buyers.</p>
              <p>The formation of JAP-PCL and connecting it to buyers and markets are powered and facilitated by ICCOA – International Competence Centre for Organic Agriculture as part of its strategy to incubate a farmer - producer company to maintain and carry forward the sustainable farming status and organic certification of farmer groups created by ICCOA's projects during the last ten years or so.</p>
            </div>
            
            <CategorySegment />

            <ProductSegment />

          </div>
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Home;