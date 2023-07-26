import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonLabel, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButton, IonIcon, IonList, IonItem, IonSelect, IonSelectOption, IonModal, IonButtons, IonAccordionGroup, IonAccordion, IonRange, IonCheckbox, SearchbarInputEventDetail, SelectChangeEventDetail, CheckboxChangeEventDetail, IonRadioGroup, IonRadio, RadioGroupChangeEventDetail, IonSpinner } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useEffect, useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import PaginationComponent from '../../../components/Pagination';
import ProductCard from '../../../components/ProductCard';
import { filterOutline, starOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import ProductGrid from '../../../components/ProductGrid';
import { usePagination } from '../../../hooks/usePagination';
import { CategoryState, Meta, ProductSegmentState } from '../../../helper/types';
import { AxiosResponse } from 'axios';
import { segments } from '../../../helper/constants';



const Product: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false)
  const [segment, setSegment] = useState<string>('default')
  const [star, setStar] = useState<string>('default')
  const [category, setCategory] = useState<string>('default')
  const [search, setSearch] = useState<string|null|undefined>('')
  const [sort, setSort] = useState<string|null|undefined>('-id')
  const {page, setPage, prevHandler, nextHandler} = usePagination();
  const [products, setProducts] = useState<ProductSegmentState[]|[]>([]);
  const [meta, setMeta] = useState<Meta>({
      next_disabled: true,
      prev_disabled: true,
  });
  const [categories, setCategories] = useState<CategoryState[]|[]>([]);
  const [pageCategory, setPageCategory] = useState<number>(1)
  const [metaCategory, setMetaCategory] = useState<Meta>({
      next_disabled: true,
      prev_disabled: true,
  });

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

  useEffect(() => {
    fetchCategories();
    return () => {}
  }, [pageCategory])

  const fetchCategories = useCallback(
    async () => {
      setCategoryLoading(true);
      try {
          let category_link = api_routes.categories+`?page=${pageCategory}`;
          const response:AxiosResponse = await axiosPublic.get(category_link);
          setCategories([...categories,...response.data.data])
          const metaResp = metaCategory
          if(response.data.links.next){
              metaResp.next_disabled = false
          }else{
              metaResp.next_disabled = true
          }
          if(response.data.links.prev){
              metaResp.prev_disabled = false
          }else{
              metaResp.prev_disabled = true
          }
          setMetaCategory({
              ...metaResp
          })
      } catch (error) {
          console.log(error);
      }finally{
          setCategoryLoading(false);
      }
    },
    [pageCategory],
  )

  useEffect(() => {
    fetchProducts();
    return () => {}
  }, [page, search, sort, segment, star, category])

  const fetchProducts = useCallback(
    async () => {
      setLoading(true);
      try {
          let products_link = api_routes.products+`?page=${page}&sort=${sort}${segment=='default' ? '' : '&filter['+segment+']=true'}${star=='default' ? '' : '&filter[has_reviews]='+star}${category=='default' ? '' : '&filter[has_categories]='+category}${search ? '' : '&filter[search]='+search}`;
          const response:AxiosResponse = await axiosPublic.get(products_link);
          setProducts([...response.data.data])
          const metaResp = meta
          if(response.data.links.next){
              metaResp.next_disabled = false
          }else{
              metaResp.next_disabled = true
          }
          if(response.data.links.prev){
              metaResp.prev_disabled = false
          }else{
              metaResp.prev_disabled = true
          }
          setMeta({
              ...metaResp
          })
      } catch (error) {
          console.log(error);
      }finally{
          setLoading(false);
      }
    },
    [page, search, sort, segment, star, category],
  )

  const searchHandler = useCallback((ev: CustomEvent<SearchbarInputEventDetail>):void => setSearch(ev.detail.value), [search])
  
  const sortHandler = useCallback((ev: CustomEvent<SelectChangeEventDetail>):void => setSort(ev.detail.value), [sort])

  const segmentHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setSegment(data.detail.value), [segment])
  
  const starHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setStar(data.detail.value), [star])
  
  const categoryHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setCategory(data.detail.value), [category])

    return (
      <IonPage>
        <IonHeader translucent={true} className='main-header-background'>
          <IonToolbar className='main-header-background'> 
            <IonSearchbar showClearButton="focus" debounce={500} onIonInput={(ev) => searchHandler(ev)}></IonSearchbar>
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
                                <IonSelect aria-label="sort" interface="popover" onIonChange={(ev)=>sortHandler(ev)} placeholder="Sort">
                                  <IonSelectOption value="-id">Default</IonSelectOption>
                                  <IonSelectOption value="name">Name: Asc</IonSelectOption>
                                  <IonSelectOption value="-name">Name: Desc</IonSelectOption>
                                  {/* <IonSelectOption value="price">Price: Low To High</IonSelectOption>
                                  <IonSelectOption value="-price">Price: High To Low</IonSelectOption> */}
                                  <IonSelectOption value="-discount">Discount</IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonList>
                          </IonButton>
                      </IonCol>
                      <IonCol
                          size="6" className='p-0 text-right'
                      >
                          <IonButton id="filter-modal" size="small" color='success' shape='round' fill='outline'>
                            <IonIcon slot="end" icon={filterOutline}></IonIcon>
                            Filter
                          </IonButton>
                      </IonCol>
                  </IonRow>
            </IonGrid>
          </div>

          <div className='ion-padding pt-0 min-height-40'>

            <ProductGrid loading={loading} products={products} prevHandler={prevHandler} nextHandler={nextHandler} meta={meta} />

          </div>
          <IonModal ref={modal} trigger="filter-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
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
                    <IonRadioGroup value={segment} onIonChange={(ev)=> segmentHandler(ev)}>
                      {segments.map((item, i) => <div key={i}>
                        <IonRadio value={item.value} labelPlacement="end">{item.name}</IonRadio>
                        <br/>
                      </div>)}
                    </IonRadioGroup>
                  </div>
                </IonAccordion>
                <IonAccordion value="third">
                  <IonItem slot="header" color="light">
                    <IonLabel>Category</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonRadioGroup value={category} onIonChange={(ev)=> categoryHandler(ev)}>
                      <IonRadio value={'default'} labelPlacement="end">All</IonRadio>
                        <br/>
                      {categories.map((item, i) => <div key={i}>
                        <IonRadio value={item.slug} labelPlacement="end">{item.name}</IonRadio>
                        <br/>
                      </div>)}
                      <br/>
                      {!metaCategory.next_disabled && categories.length>0 ? <div className='text-center'>
                          <IonButton size="small" color='success' shape='round' fill={categoryLoading? 'clear' : 'outline'} className='pt-1 pb-1' onClick={()=>setPageCategory(pageCategory+1)}>
                            {categoryLoading ? <IonSpinner name="crescent" color="success"></IonSpinner> : 'View More'}
                          </IonButton> 
                      </div>
                      : null}
                    </IonRadioGroup>
                  </div>
                </IonAccordion>
                <IonAccordion value="fourth">
                  <IonItem slot="header" color="light">
                    <IonLabel>Reviews</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonRadioGroup value={star} onIonChange={(ev)=>starHandler(ev)}>
                        <IonRadio value='default' labelPlacement="end">All</IonRadio>
                        <br/>
                        <IonRadio value='1' labelPlacement="end">1 star</IonRadio>
                        <br/>
                        <IonRadio value='2' labelPlacement="end">2 stars</IonRadio>
                        <br/>
                        <IonRadio value='3' labelPlacement="end">3 stars</IonRadio>
                        <br/>
                        <IonRadio value='4' labelPlacement="end">4 stars</IonRadio>
                        <br/>
                        <IonRadio value='5' labelPlacement="end">5 stars</IonRadio>
                        <br/>
                    </IonRadioGroup>
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