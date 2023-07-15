import { IonPage, IonContent, IonImg, ScrollDetail, IonButton, IonCol, IonIcon, IonItemDivider, IonRow, IonText, IonInput, IonItem, IonAvatar, IonLabel, IonBadge, IonCard, IonList, IonSpinner, IonTextarea } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useEffect, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { bookmarkOutline } from 'ionicons/icons';
import BackHeader from '../../../components/BackHeader';
import ReviewItem from '../../../components/ReviewItem';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '../../../components/Input';
import { ErrorMessage } from '@hookform/error-message';
import Slider from '../../../components/Slider';
import { BannerImages, ProductSegmentState } from '../../../helper/types';
import { AxiosResponse } from 'axios';
import LoadingDetail from '../../../components/LoadingDetail';
import LoadingPricingTable from '../../../components/LoadingPricingTable';


interface ProductProps extends RouteComponentProps<{
    slug: string;
}> {}

const images = [
  '/images/product1.png',
  '/images/product2.png',
  '/images/product3.jpg',
];

const fields = [
    {
      placeholder: "Enter name",
      label: "Name",
      type: "text",
      name: "name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
  })
  .required();

const ProductDetail: React.FC<ProductProps> = ({match}) => {

  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductSegmentState>({
    id: 0,
    name: '',
    slug: match.params.slug,
    description: '',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    featured_image_link: '',
    created_at: '',
    updated_at: '',
    is_active: false,
    discount: 0,
    discounted_price: 0,
    image_alt: '',
    image_title: '',
    in_stock: false,
    inventory: 0,
    is_best_sale: false,
    is_featured: false,
    is_new_arrival: false,
    other_images: [],
    price: 0,
    reviews: [],
    categories: []
  });
  const [banner, setBanner] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
    return () => {}
  }, [match.params.slug])

  const fetchProducts = useCallback(
    async () => {
      setProductLoading(true);
      try {
          let product_link = api_routes.product+`/${match.params.slug}`;
          const response:AxiosResponse = await axiosPublic.get(product_link);
          setProduct({...response.data.product})
          const bannerImages = response.data.product.other_images.map((item:any)=>item.image_link)
          setBanner([...bannerImages]);
          
      } catch (error) {
          console.log(error);
      }finally{
          setProductLoading(false);
      }
    },
    [match.params.slug],
  )

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleScroll(ev: CustomEvent<ScrollDetail>) {
    if(ev.detail.scrollTop>300){
      setShowSubHeader(true);
    }else{
      setShowSubHeader(false);
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.register, data);
      setResponseMessage(response.data.message);
      setIsToastOpen(true);
      reset({
        name: "",
        message: "",
        email: "",
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        setResponseMessage(error?.response?.data?.message);
        setIsToastOpen(true);
      }
      if (error?.response?.data?.errors?.name) {
        setError("name", {
          type: "server",
          message: error?.response?.data?.errors?.name[0],
        });
      }
      if (error?.response?.data?.errors?.email) {
        setError("email", {
          type: "server",
          message: error?.response?.data?.errors?.email[0],
        });
      }
      if (error?.response?.data?.errors?.message) {
        setError("message", {
          type: "server",
          message: error?.response?.data?.errors?.message[0],
        });
      }
    } finally {
      setLoading(false);
    }
  };

    return (
      <IonPage>
        <BackHeader title={product.name} link='/products' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
            {productLoading ? <>
                <LoadingDetail />
                <LoadingPricingTable />
                <LoadingPricingTable />
            </> : <>
                <Slider images={banner} />
                <div className={`content-main custom-main-header pt-10 ${showSubHeader ? isPlatform('ios') ? 'custom-main-header-bg' : 'custom-main-header-bg' : ''}`}>
                    <div className="ion-padding pt-0 pb-0">
                        <IonRow className="ion-align-items-center p-0 mt- w-100">
                            <IonCol
                                size="3"
                                className='text-left'
                            >
                                <div className='product-img-container'>
                                    <IonImg alt="product" className='' src={product?.featured_image_link} />
                                </div>
                            </IonCol>
                            <IonCol
                                size="9"
                                className='text-left'
                            >
                                <IonText color="success" className="text-left mb-0 pb-0">
                                    <h5 className="text-left mb-0 pb-0 mt-0 pt-0">{product?.name}</h5>
                                </IonText>
                                <div style={{marginTop:5, marginBottom: 5}}>
                                    <p className='p-0 m-0'><s>Rs. {product?.price}</s> <b>Rs. {product?.discounted_price}</b></p>
                                </div>
                                <IonButton className="m-0 p-0" fill='solid' size='small' color="success">
                                    <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>
                                    wishlist
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>

                <div className='ion-padding pt-0'>
                    <div className="content-main">
                    <p>{product.description}</p>
                    </div>
                </div>

                <div>

                    {product.categories.length>0 && <IonItemDivider className="category-divider category-divider-end">
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                            <IonCol
                                size="3"
                                className='text-left'
                            >
                                <p className='p-0 m-0 font-normal'><code>Category</code></p>
                            </IonCol>
                            <IonCol
                                size="9"
                                className='text-right'
                            >
                                <p className='p-0 m-0 font-normal'>{
                                    product.categories.map((item, i)=>product.categories.length==i+1 ? item.name : `${item.name}, `)
                                }</p>
                            </IonCol>
                        </IonRow>
                    </IonItemDivider>}
                    <IonItemDivider className="category-divider category-divider-end">
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                            <IonCol
                                size="3"
                                className='text-left'
                            >
                                <p className='p-0 m-0 font-normal'><code>In Stock</code></p>
                            </IonCol>
                            <IonCol
                                size="9"
                                className='text-right'
                            >
                                <p className='p-0 m-0 font-normal'>{
                                    product.in_stock ? 'Yes' : 'No'
                                }</p>
                            </IonCol>
                        </IonRow>
                    </IonItemDivider>
                    <IonItemDivider className="category-divider category-divider-end">
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                            <IonCol
                                size="4"
                                className='text-left'
                            >
                                <p className='p-0 m-0 font-normal'><code>Items Left</code></p>
                            </IonCol>
                            <IonCol
                                size="8"
                                className='text-right'
                            >
                                <p className='p-0 m-0 font-normal'>{
                                    product.inventory
                                }</p>
                            </IonCol>
                        </IonRow>
                    </IonItemDivider>
                </div>
                
                <IonCard className="final-table mt-2">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Check Availability</h6>
                        </div>
                    </div>
                    <div className='ion-padding'>
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                            <IonCol
                                size="9"
                                className='text-left'
                            >
                                <IonItem>
                                    <IonInput
                                    className="coupon-code-input-holder"
                                    clearInput={true}
                                    placeholder="Enter Pincode"
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol
                                size="3"
                                className='text-right'
                            >
                                <IonButton className="m-0" size="small" fill='outline' color="success">
                                    Check
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </div>
                    
                </IonCard>
                
                <IonCard className="final-table">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Pricing</h6>
                        </div>
                    </div>
                    <div className='mt-1 mb-1'>
                        <IonItemDivider className="category-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>MRP</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'>Rs. {product.price}</p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <IonItemDivider className="category-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>Discount</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'>{product.discount}%</p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <IonItemDivider className="category-divider category-divider-end">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>Our Price</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'><b>Rs. {product.discounted_price}</b></p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                    </div>
                    
                </IonCard>

                    {product.reviews.length>0 &&<>
                        <div className='ion-padding pt-1'>
                            <div className="content-main">
                            <h6>Reviews</h6>
                            </div>
                        </div>
                        <div className="mb-1">
                            {product.reviews.map((item, i) => <ReviewItem {...item} key={i} />)}
                        </div>
                    </>}

                    <IonCard className="final-table mt-2">
                        <div className='ion-padding pt-0 pb-0'>
                            <div className="content-main mt-1">
                                <h6>Add Review</h6>
                            </div>
                        </div>
                        <div className='ion-padding mb-1'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <IonList className="ion-no-padding">
                            {fields.map((item, i) => (
                                <Input
                                {...item}
                                register={register}
                                errors={errors}
                                key={i}
                                />
                            ))}
                            </IonList>
                            <IonList className="ion-no-padding">
                                <>
                                    <IonItem className="ion-no-padding auth-card-background">
                                        <IonTextarea 
                                            className="ion-no-padding" 
                                            labelPlacement="floating" 
                                            placeholder='Enter message'
                                            label='Message'
                                            inputmode="text"
                                            {...register('message')}
                                        >
                                        </IonTextarea>
                                    </IonItem>
                                    <ErrorMessage
                                        errors={errors}
                                        name='message'
                                        as={<div style={{ color: 'red' }} />}
                                    />
                                </>
                            </IonList>
                            <IonButton
                                color="success"
                                type="submit"
                                expand="block"
                                shape="round"
                                className="mt-2"
                            >
                            {loading ? (
                                <IonSpinner name="crescent"></IonSpinner>
                            ) : (
                                "Submit"
                            )}
                            </IonButton>
                        </form>
                        </div>
                        
                    </IonCard>
                
                <MainFooter />
                <div className="final-table-2"></div>
                <IonItemDivider className="cart-divider-total" slot="fixed">
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                            <IonCol
                                size="6"
                                className='text-left'
                            >
                                <div className="quantity-holder">
                                    <div className="col-auto">
                                        <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                            -
                                        </IonButton>
                                    </div>
                                    <div className="col-3">
                                        <IonInput type="number" inputmode="numeric" aria-label="Quantity" value="1" className="text-center quantity-text-holder"></IonInput>
                                    </div>
                                    <div className="col-auto">
                                        <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                            +
                                        </IonButton>
                                    </div>
                                </div>
                            </IonCol>
                            <IonCol
                                size="6"
                                className='text-right'
                            >
                                <IonButton className="m-0 p-0 cart-btn" fill='solid' color="success">
                                    Add to Cart
                                </IonButton>
                            </IonCol>
                        </IonRow>
                </IonItemDivider>
            </>}
        </IonContent>
      </IonPage>
    );
  };
  
export default ProductDetail;