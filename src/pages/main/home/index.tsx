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
  '/images/banner1.jpg',
  '/images/banner3.avif',
  '/images/banner5.avif',
];

const categories = [
  {
    name: 'category 1',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-01.png',
  },
  {
    name: 'category 2',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-02.png',
  },
  {
    name: 'category 3',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-03.png',
  },
  {
    name: 'category 4',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-04.png',
  },
  {
    name: 'category 5',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-05.png',
  },
  {
    name: 'category 6',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-01.png',
  },
  {
    name: 'category 7',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-02.png',
  },
  {
    name: 'category 8',
    items: '25 items',
    image: 'https://orgado-react.vercel.app/assets/img/category/img/cateegory-img-03.png',
  },
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tellus nec mauris auctor dignissim fermentum in
                risus. Sed nec convallis sapien, id tincidunt enim. Mauris ornare eleifend nunc id mattis. Fusce augue diam,
                sagittis nec posuere at, consectetur tempor lectus. Nulla at lectus eget mauris iaculis malesuada mollis sed neque.
                Curabitur et risus tristique, malesuada mauris finibus, elementum massa. Proin lacinia mauris quis ligula blandit
                ullamcorper. Donec ut posuere lorem. </p>
                <p>In volutpat magna vitae tellus posuere pulvinar. Nam varius ligula justo, nec
                placerat lacus pharetra ac. Aenean massa orci, tristique in nisl ut, aliquet consectetur libero. Etiam luctus
                placerat vulputate. Aliquam ipsum massa, porttitor at mollis ut, pretium sit amet mi. In neque mauris, placerat et
                neque vel, tempor interdum dolor. Suspendisse gravida malesuada tellus, vel dapibus nisl dignissim vel. Cras ut
                nulla sit amet erat malesuada euismod vel a nulla.
              </p>
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