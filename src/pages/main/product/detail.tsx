import { IonPage, IonContent, IonImg, ScrollDetail, IonButton, IonCol, IonIcon, IonItemDivider, IonRow, IonText, IonInput, IonItem, IonCard, IonSpinner, IonToast } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useContext, useEffect, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { bookmarkOutline, informationCircleOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from 'ionicons/icons';
import BackHeader from '../../../components/BackHeader';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import Slider from '../../../components/Slider';
import { ProductSegmentState } from '../../../helper/types';
import { AxiosResponse } from 'axios';
import LoadingDetail from '../../../components/LoadingDetail';
import LoadingPricingTable from '../../../components/LoadingPricingTable';
import CartQuantity from '../../../components/CartQuantity';
import { WishlistContext } from '../../../context/WishlistProvider';
import { CartContext } from '../../../context/CartProvider';
import { AuthContext } from '../../../context/AuthProvider';
import Review from '../../../components/Review';
import { Browser } from '@capacitor/browser';


interface ProductProps extends RouteComponentProps<{
    slug: string;
}> {}

const pincodeSchema = yup
  .object({
    pincode: yup.string().required(),
  })
  .required();

const ProductDetail: React.FC<ProductProps> = ({match}) => {

  const {wishlist, setWishlist, wishlistLoading } = useContext(WishlistContext);
  const {cart, setCart, cartLoading } = useContext(CartContext);
  const {auth} = useContext(AuthContext);
  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);
  const [loadingPincode, setLoadingPincode] = useState<boolean>(false);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [pincodeResponseMessage, setPincodeResponseMessage] = useState<{
    message: string,
    status: 'success'|'error'
  }>({
    message: '',
    status: 'error'
  });
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
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
    weight: null,
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

  const pincodeForm = useForm({
    resolver: yupResolver(pincodeSchema),
  });

  function handleScroll(ev: CustomEvent<ScrollDetail>) {
    if(ev.detail.scrollTop>300){
      setShowSubHeader(true);
    }else{
      setShowSubHeader(false);
    }
  }
  
  const onPincodeSubmitHandler = async (data: any) => {
    setLoadingPincode(true);
    setPincodeResponseMessage({
        message: '',
        status: 'error'
    });
    try {
      const response = await axiosPublic.post(api_routes.pincode+`/${match.params.slug}`, data);
        setPincodeResponseMessage({
            message: data.pincode,
            status: 'success'
        });
      pincodeForm.reset({
        pincode: "",
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message && !error?.response?.data?.availability) {
        setPincodeResponseMessage({
            message: error?.response?.data?.message,
            status: 'error'
        });
      }
      if (error?.response?.data?.errors?.pincode) {
        pincodeForm.setError("pincode", {
          type: "server",
          message: error?.response?.data?.errors?.pincode[0],
        });
      }
    } finally {
      setLoadingPincode(false);
    }
  };

  const wishlistHandler = (id:number) => {   
    if([...wishlist.wishlist].indexOf(id)<0){
        setWishlist([...wishlist.wishlist, product.id])
        setResponseMessage('Product added to wishlist');
        setIsToastOpen(true);
    } else{
        const filteredWishlist = wishlist.wishlist.filter(item=> item!=id);
        setWishlist([...filteredWishlist])
        setResponseMessage('Product removed from wishlist');
        setIsToastOpen(true);
    }
  }

  useEffect(() => {
    getProductCartDetail()
    return () => {}
  }, [match.params.slug, product, auth, cart])
  
  const getProductCartDetail = () =>{
    const cart_prod = cart.cart.filter((item: any)=>item.product_id==product.id);
    if(cart_prod.length>0){
        setCartQuantity(cart_prod[0].quantity);
    }else{
        setCartQuantity(1);
    }
  }
  
  
  const cartHandler = (quantity:number) => {
     if(!auth.authenticated){
        setResponseMessage('Please sign in to add product to cart!');
        setIsToastOpen(true);
        return;
     }
    const filteredCart = cart.cart.filter(item=> item.product_id==product.id);
    if(filteredCart.length<1){
        setCart([...cart.cart, {quantity, product_id: product.id}])
    } else{
        const index = cart.cart.findIndex(x => x.product_id==product.id);
        const cartArr = cart.cart;
        cartArr[index].quantity = quantity;
        setCart([...cartArr])
    }
    setResponseMessage('Product added to cart');
    setIsToastOpen(true);
  }

  const shareProduct = async(url:string) =>{
    await Browser.open({ url });
  }

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
                                {wishlistLoading ? <IonSpinner name="dots" color={'success'}></IonSpinner> : 
                                <IonButton className="m-0 p-0" fill='solid' size='small' disabled={wishlistLoading} color={[...wishlist.wishlist].indexOf(product.id)<0 ? "success" : "danger"} onClick={()=>wishlistHandler(product.id)}>
                                    <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>
                                    {[...wishlist.wishlist].indexOf(product.id)<0 ? 'wishlist' : 'remove'}
                                </IonButton>}
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
                                <p className='p-0 m-0 font-normal'><code>Weight</code></p>
                            </IonCol>
                            <IonCol
                                size="9"
                                className='text-right'
                            >
                                <p className='p-0 m-0 font-normal'>{product.weight}</p>
                            </IonCol>
                        </IonRow>
                    </IonItemDivider>
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
                    <IonItemDivider className="category-divider category-divider-end">
                        <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                            <IonCol
                                size="12"
                                className='text-center'
                            >
                                <p className='p-0 m-0 font-normal mb-1'><code>Share</code></p>
                            </IonCol>
                            <IonCol
                                size="12"
                                className='text-center'
                            >
                                <div className='text-center mt-1 mb-1'>
                                    <IonButton color='success' fill='clear' onClick={()=>shareProduct(`https://www.facebook.com/share.php?u=https://jap.bio/shop-detail/${product.slug}&title=${product.name}`)}>
                                        <IonIcon slot="icon-only" icon={logoFacebook}></IonIcon>
                                    </IonButton>
                                    <IonButton color='success' fill='clear' onClick={()=>shareProduct(`https://www.linkedin.com/shareArticle?mini=true&url=https://jap.bio/shop-detail/${product.slug}&title=${product.name}&source=${product.name}`)}>
                                        <IonIcon slot="icon-only" icon={logoLinkedin}></IonIcon>
                                    </IonButton>
                                    <IonButton color='success' fill='clear' onClick={()=>shareProduct(`https://twitter.com/share?text=${product.name}&url=https://jap.bio/shop-detail/${product.slug}`)}>
                                        <IonIcon slot="icon-only" icon={logoTwitter}></IonIcon>
                                    </IonButton>
                                </div>
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
                        <form onSubmit={pincodeForm.handleSubmit(onPincodeSubmitHandler)}>    
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                                <IonCol
                                    size="9"
                                    className='text-left'
                                >
                                    <IonItem>
                                        <IonInput
                                        className="coupon-code-input-holder"
                                        clearInput={true}
                                        type="text"
                                        inputmode="text"
                                        placeholder="Enter Pincode"
                                        {...pincodeForm.register('pincode')}
                                        ></IonInput>
                                    </IonItem>
                                    <ErrorMessage
                                        errors={pincodeForm.formState.errors}
                                        name={'pincode'}
                                        as={<div style={{ color: 'red' }} />}
                                    />
                                </IonCol>
                                <IonCol
                                    size="3"
                                    className='text-right'
                                >
                                    <IonButton className="m-0" type='submit' size="small" fill='outline' color="success">
                                    {loadingPincode ? (
                                        <IonSpinner name="crescent" color={'success'}></IonSpinner>
                                    ) : (
                                        "CHECK"
                                    )}
                                    </IonButton>
                                </IonCol>
                                {pincodeResponseMessage.message.length>0 && <IonCol
                                    size="12"
                                    className='text-center'
                                >
                                    {pincodeResponseMessage.status=='error' ? 
                                        <p className={`text-${pincodeResponseMessage.status} mb-0 d-flex ion-align-items-center ion-justify-content-center`}><IonIcon slot="start" className={`info-icon-green`} icon={informationCircleOutline}></IonIcon> {pincodeResponseMessage.message}</p> :
                                        <p className={`text-${pincodeResponseMessage.status} mb-0 d-flex ion-align-items-center ion-justify-content-center`}><IonIcon slot="start" className={`info-icon-green`} icon={informationCircleOutline}></IonIcon> Product available for pincode : <b>{pincodeResponseMessage.message}</b></p>
                                    }
                                </IonCol>}
                            </IonRow>
                        </form>
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

                <Review reviews={product.reviews} product_id={product.id} />
                
                <MainFooter />
                <div className="final-table-2"></div>
                <CartQuantity max_quantity={product.inventory} cartHandler={cartHandler} cartLoading={cartLoading} quantity_count={cartQuantity} />
                <IonToast
                    isOpen={isToastOpen}
                    message={responseMessage}
                    onDidDismiss={() => setIsToastOpen(false)}
                    duration={5000}
                    buttons={[
                    {
                        text: "Close",
                        handler: () => {
                        setIsToastOpen(false);
                        },
                    },
                    ]}
                    layout="stacked"
                ></IonToast>
            </>}
        </IonContent>
      </IonPage>
    );
  };
  
export default ProductDetail;