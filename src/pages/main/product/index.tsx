import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonImg, IonSegment, IonSegmentButton, IonLabel, ScrollDetail, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButton, IonIcon, IonList, IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/react';
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
import { filterOutline, funnelOutline } from 'ionicons/icons';

const images = [
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1488229297570-58520851e868',
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



const Product: React.FC = () => {

    return (
      <IonPage>
        <IonHeader translucent={true} className='main-header-background'>
          <IonToolbar className='main-header-background'> 
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
          <div className='ion-padding pt-0 pb-0'>
            <div className="content-main mt-2">
              <h2>Our Products</h2>
            </div>
          </div>

          <div className="ion-padding ptb-1 pt-0 p-sticky-0 bg-white">
            <IonGrid className="bg-white">
                  <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                      <IonCol
                          size="3" className='p-0 text-left'
                      >
                          <IonButton size="small" color='success' shape='round' fill='outline'>
                            <IonList class='transparent-bg'>
                              <IonItem className='transparent-item-bg'>
                                <IonSelect aria-label="fruit" interface="popover" placeholder="Sort">
                                  <IonSelectOption value="apples">Apples</IonSelectOption>
                                  <IonSelectOption value="oranges">Oranges</IonSelectOption>
                                  <IonSelectOption value="bananas">Bananas</IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonList>
                          </IonButton>
                      </IonCol>
                      <IonCol
                          size="6" className='p-0 text-right'
                      >
                          <IonButton size="small" color='success' shape='round' fill='outline'>
                            <IonIcon slot="end" icon={filterOutline}></IonIcon>
                            Filter
                          </IonButton>
                      </IonCol>
                  </IonRow>
            </IonGrid>
          </div>

          <div className='ion-padding pt-0'>

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
                      <Link className="no-underline" to="/register">
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
  
export default Product;