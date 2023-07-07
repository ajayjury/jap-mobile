import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonLabel, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButton, IonIcon, IonList, IonItem, IonSelect, IonSelectOption, IonModal, IonButtons, IonAccordionGroup, IonAccordion, IonRange, IonCheckbox } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import PaginationComponent from '../../../components/Pagination';
import ProductCard from '../../../components/ProductCard';
import { filterOutline, starOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

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



const Product: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss('confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

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
                          <IonButton id="open-modal" size="small" color='success' shape='round' fill='outline'>
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
                      <Link className="no-underline" to={`/products/${i}`}>
                        <ProductCard image={item.image} name={item.name} price={item.price} discounted_price={item.discounted_price} />
                      </Link>
                  </IonCol>)
                  }

                </IonRow>
                <PaginationComponent />
            </IonGrid>

          </div>
          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Filters</IonTitle>
                <IonButtons slot="end">
                  <IonButton  size="small" color='success' shape='round' fill='outline' strong={true} onClick={() => confirm()}>
                    Apply
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonAccordionGroup>
                <IonAccordion value="first">
                  <IonItem slot="header" color="light">
                    <IonLabel>Special Features</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonCheckbox className='mb-1' labelPlacement="end">New Arrival</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end">Featured</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end">Best Sale</IonCheckbox>
                    <br/>
                  </div>
                </IonAccordion>
                <IonAccordion value="second">
                  <IonItem slot="header" color="light">
                    <IonLabel>Price</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                  <IonRange
                    aria-label="Dual Knobs Range"
                    dualKnobs={true}
                    value={{
                      lower: 20,
                      upper: 80,
                    }}
                  ></IonRange>
                  </div>
                </IonAccordion>
                <IonAccordion value="third">
                  <IonItem slot="header" color="light">
                    <IonLabel>Categories</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonCheckbox className='mb-1' labelPlacement="end">Catgeory 1</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end">Catgeory 2</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end">Catgeory 3</IonCheckbox>
                  </div>
                </IonAccordion>
                <IonAccordion value="fourth">
                  <IonItem slot="header" color="light">
                    <IonLabel>Reviews</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonCheckbox className='mb-1' labelPlacement="end"><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon> & above</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end"><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon> & above</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end"><IonIcon icon={starOutline}></IonIcon><IonIcon icon={starOutline}></IonIcon> & above</IonCheckbox>
                    <br/>
                    <IonCheckbox className='mb-1' labelPlacement="end"><IonIcon icon={starOutline}></IonIcon> & above</IonCheckbox>
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            </IonContent>
          </IonModal>
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Product;