import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonImg, IonSegment, IonSegmentButton, IonLabel, ScrollDetail } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import PaginationComponent from '../../../components/Pagination';
import ProductCard from '../../../components/ProductCard';
import BackHeader from '../../../components/BackHeader';

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



const Category: React.FC = () => {

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
        <BackHeader title='Category 1' link='/home' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <IonImg
              src={'/images/banner2.jpg'}
              alt="Sliders"
              style={{width: '100%'}}
          ></IonImg>
          <div className='content-main pt-10'>
              <h1>Category 1</h1>
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

            <div className="content-main mt-2 mb-1">
              <h2>Products</h2>
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
  
export default Category;