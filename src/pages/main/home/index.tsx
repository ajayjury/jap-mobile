import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonImg, IonSegment, IonSegmentButton, IonLabel, ScrollDetail } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import CategoryCard from '../../../components/CategoryCard';
import PaginationComponent from '../../../components/Pagination';
import ProductCard from '../../../components/ProductCard';

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

const products = [
  {
    name: 'product 1',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-01.png',
  },
  {
    name: 'product 2',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-02.png',
  },
  {
    name: 'product 3',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-03.png',
  },
  {
    name: 'product 4',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-04.png',
  },
  {
    name: 'product 5',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-05.png',
  },
  {
    name: 'product 6',
    price: 'Rs. 200',
    discounted_price: 'Rs. 150',
    image: 'https://orgado-react.vercel.app/assets/img/trending/product/product-01.png',
  },
];

const segments = [
  {
    name: 'All',
    value: 'default'
  },
  {
    name: 'New Arrival',
    value: 'new_arrival'
  },
  {
    name: 'Best Sale',
    value: 'best_sale'
  },
  {
    name: 'Featured',
    value: 'featured'
  },
];



const Home: React.FC = () => {

  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);

  function handleScroll(ev: CustomEvent<ScrollDetail>) {
    if(ev.detail.scrollTop>475){
      setShowSubHeader(true);
    }else{
      setShowSubHeader(false);
    }
  }

    return (
      <IonPage>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <MainHeader />
          <Swiper 
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            autoplay={true}
            keyboard={true}
            pagination={{
              dynamicBullets: true,
            }}
            scrollbar={false}
            zoom={false}
          >
            {
              images.map((item, i) => <SwiperSlide key={i}>
                  <IonImg
                      src={item}
                      alt="Sliders"
                      style={{width: '100%'}}
                  ></IonImg>
              </SwiperSlide>)
            }
          </Swiper>
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
            <div className="content-main">
              <h2>Top Category</h2>
            </div>
            <IonGrid className="mt-1 p-0">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0">

                  {
                    categories.map((item, i) => <IonCol
                    size="6"
                    size-xl="3"
                    size-lg="3"
                    size-md="4"
                    size-sm="6"
                    size-xs="6" className='p-0' key={i}
                  >
                      <Link className="no-underline" to={`/category/${i}`}>
                        <CategoryCard image={item.image} name={item.name} items={item.items} />
                      </Link>
                  </IonCol>)
                  }

                </IonRow>
                <PaginationComponent />
            </IonGrid>

            <div className="content-main mt-2 mb-1">
              <h2>Our Products</h2>
            </div>

            <IonSegment scrollable={true} value="default" color="success">
              {
                segments.map((item, i)=><IonSegmentButton value={item.value} key={i}>
                  <IonLabel>{item.name}</IonLabel>
                </IonSegmentButton>)
              }
            </IonSegment>

            <IonGrid className="mt-1 p-0">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0">

                  {
                    products.map((item, i) => <IonCol
                    size="6"
                    size-xl="3"
                    size-lg="3"
                    size-md="4"
                    size-sm="6"
                    size-xs="6" className='p-0' key={i}
                  >
                      <Link className="no-underline" to={`/products/${i}`}>
                        <ProductCard image={item.image} name={item.name} price={item.price} discounted_price={item.discounted_price} />
                      </Link>
                  </IonCol>)
                  }

                </IonRow>
                <PaginationComponent />
            </IonGrid>

          </div>
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Home;