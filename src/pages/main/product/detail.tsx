import { IonPage, IonContent, IonImg, ScrollDetail, IonButton, IonCol, IonIcon, IonItemDivider, IonRow, IonText, IonInput, IonItem, IonAvatar, IonLabel, IonBadge, IonCard, IonList, IonSpinner, IonTextarea } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { Link } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useState } from 'react';
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

const ProductDetail: React.FC = () => {

  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

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
        <BackHeader title='Product 1' link='/products' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <Slider images={images} />
          <div className={`content-main custom-main-header pt-10 ${showSubHeader ? isPlatform('ios') ? 'custom-main-header-bg' : 'custom-main-header-bg' : ''}`}>
              {/* <h1>JAIVIK AVAM PRAKRUTIK</h1> */}
              <div className="ion-padding pt-0 pb-0">
                <IonRow className="ion-align-items-center p-0 mt- w-100">
                    <IonCol
                        size="3"
                        className='text-left'
                    >
                        <div className='product-img-container'>
                            <IonImg alt="product" className='' src='https://orgado-react.vercel.app/assets/img/trending/product/product-01.png' />
                        </div>
                    </IonCol>
                    <IonCol
                        size="9"
                        className='text-left'
                    >
                        <IonText color="success" className="text-left mb-0 pb-0">
                            <h5 className="text-left mb-0 pb-0 mt-0 pt-0">Product 1</h5>
                        </IonText>
                        <div style={{marginTop:5, marginBottom: 5}}>
                            <p className='p-0 m-0'><s>Rs. 100</s> <b>Rs. 200</b></p>
                        </div>
                        <IonButton className="m-0 p-0" fill='solid' size='small' color="success">
                            <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>
                            wishlist
                        </IonButton>
                    </IonCol>
                </IonRow>
              </div>
          </div>

            <IonItemDivider className="category-divider category-divider-end">
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
                        <p className='p-0 m-0 font-normal'>Catgeory 1, Category 2</p>
                    </IonCol>
                </IonRow>
            </IonItemDivider>

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
          </div>
          <IonCard className="final-table">
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
                            <p className='p-0 m-0 font-normal'>Rs. 100</p>
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
                            <p className='p-0 m-0 font-normal'>Rs. 200</p>
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
                            <p className='p-0 m-0 font-normal'><b>Rs. 200</b></p>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
            </div>
            
          </IonCard>

            <div className='ion-padding pt-1'>
                <div className="content-main">
                <h6>Reviews</h6>
                </div>
            </div>

            <div className="mb-1">
                <ReviewItem />
                <ReviewItem />
            </div>

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
        </IonContent>
      </IonPage>
    );
  };
  
export default ProductDetail;