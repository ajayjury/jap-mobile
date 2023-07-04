import { IonCardHeader, IonButton, IonText, IonCardContent, IonGrid, IonRow, IonCol, IonList, IonSpinner, IonToast, IonPage, IonContent, IonicSlides, IonImg, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonCard, IonCardTitle, IonCardSubtitle, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonFooter } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { chevronBackOutline, chevronForwardOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from 'ionicons/icons';

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

const Home: React.FC = () => {

    return (
      <IonPage>
        <IonContent
          fullscreen={false}
          forceOverscroll={true}
        >
          <IonHeader className='main-header-background'>
            <IonToolbar className='main-header-background'>
              <IonImg
                  src="/images/logo.webp"
                  alt="Logo"
                  className="main-img-logo"
              ></IonImg>
            </IonToolbar>
          </IonHeader>
          <Swiper 
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            autoplay={true}
            keyboard={true}
            // pagination={true}
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
          <div className='ion-padding'>
            <div className="content-main">
              <h1>JAIVIK AVAM PRAKRUTIK</h1>

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
                      <Link className="no-underline" to="/register">
                      <IonCard className='m-1 p-0 card-bg-grey'>
                          <IonImg alt="category" className='category-img-card' src={item.image} />
                          <IonCardHeader className='p-10'>
                            <IonText color="success" className='text-center'>
                                <h5 className='p-0 m-0 text-capitalize'>{item.name}</h5>
                            </IonText>
                            <IonText className='text-center'>
                                <p className='p-0 m-0'>{item.items}</p>
                            </IonText>
                          </IonCardHeader>
                          <div className="text-center mb-1">
                            <IonButton
                            color="success"
                            type="submit"
                            expand="block"
                            shape="round"
                            fill='solid'
                            size="small"
                            className='d-inline-block text-center'
                            >
                              VIEW
                            </IonButton>
                          </div>
                      </IonCard>
                      </Link>
                  </IonCol>)
                  }

                </IonRow>
                <IonRow className="ion-align-items-center ion-justify-center-center p-0 mt-1">
                  <IonCol
                      size="6"
                      className='text-right'
                    >
                      <IonButton fill='outline' color="success">
                        <IonIcon slot="start" icon={chevronBackOutline}></IonIcon>
                        Previous
                      </IonButton>
                  </IonCol>
                  <IonCol
                      size="6"
                      className='text-left'
                    >
                      <IonButton fill='outline' color="success">
                        Next
                        <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                      </IonButton>
                  </IonCol>
                </IonRow>
            </IonGrid>

            <div className="content-main mt-2 mb-1">
              <h2>Our Products</h2>
            </div>

            <IonSegment scrollable={true} value="default" color="success">
              <IonSegmentButton value="default">
                <IonLabel>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="new_arrival">
                <IonLabel>New Arrival</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="best_sale">
                <IonLabel>Best Sale</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="featured">
                <IonLabel>Featured</IonLabel>
              </IonSegmentButton>
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
                      <Link className="no-underline" to="/register">
                      <IonCard className='m-1 p-0 product-card'>
                          <div className='product-img-container'>
                            <IonImg alt="product" className='' src={item.image} />
                          </div>
                          <IonCardHeader className='p-10'>
                            <IonText color="success" className='text-center'>
                                <h5 className='p-0 m-0 text-capitalize'>{item.name}</h5>
                            </IonText>
                            <IonText className='text-center'>
                                <p className='p-0 m-0'><s>{item.price}</s> <b>{item.discounted_price}</b></p>
                            </IonText>
                          </IonCardHeader>
                          <div className="text-center mb-1">
                            <IonButton
                            color="success"
                            type="submit"
                            expand="block"
                            shape="round"
                            fill='solid'
                            size="small"
                            className='d-inline-block text-center'
                            >
                              Buy Now
                            </IonButton>
                          </div>
                      </IonCard>
                      </Link>
                  </IonCol>)
                  }

                </IonRow>
                <IonRow className="ion-align-items-center ion-justify-center-center p-0 mt-1">
                  <IonCol
                      size="6"
                      className='text-right'
                    >
                      <IonButton fill='outline' color="success">
                        <IonIcon slot="start" icon={chevronBackOutline}></IonIcon>
                        Previous
                      </IonButton>
                  </IonCol>
                  <IonCol
                      size="6"
                      className='text-left'
                    >
                      <IonButton fill='outline' color="success">
                        Next
                        <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                      </IonButton>
                  </IonCol>
                </IonRow>
            </IonGrid>

          </div>
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
        </IonContent>
      </IonPage>
    );
  };
  
export default Home;