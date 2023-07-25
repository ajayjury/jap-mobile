import {
    IonButton,
    IonText,
    IonRow,
    IonCol,
    IonToast,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItemDivider,
    IonItem,
    IonIcon,
    IonInput,
    IonCard,
    IonModal,
    IonButtons,
    IonList,
    IonTextarea,
    IonSpinner,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useContext, useEffect, useRef, useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import { chevronForwardOutline } from "ionicons/icons";
import CartItem from "../../../components/CartItem";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { ErrorMessage } from "@hookform/error-message";
import { AuthContext } from "../../../context/AuthProvider";
import { CartContext } from "../../../context/CartProvider";
import LoadingPricingTable from "../../../components/LoadingPricingTable";
import { Cart as CartType } from "../../../helper/types";

const fields = [
    {
      placeholder: "Enter first name",
      label: "First Name",
      type: "text",
      name: "billing_first_name",
      inputmode: "text",
    },
    {
      placeholder: "Enter last name",
      label: "Last Name",
      type: "text",
      name: "billing_last_name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "billing_email",
      inputmode: "email",
    },
    {
        placeholder: "Enter phone",
        label: "Phone",
        type: "text",
        name: "billing_phone",
        inputmode: "numeric",
    },
    {
        placeholder: "Enter country",
        label: "Country",
        type: "text",
        name: "billing_country",
        inputmode: "text",
    },
    {
        placeholder: "Enter state",
        label: "State",
        type: "text",
        name: "billing_state",
        inputmode: "text",
    },
    {
        placeholder: "Enter city",
        label: "City",
        type: "text",
        name: "billing_city",
        inputmode: "text",
    },
    {
        placeholder: "Enter pin",
        label: "Pin",
        type: "text",
        name: "billing_pin",
        inputmode: "text",
    },
];

const schema = yup
  .object({
    billing_first_name: yup.string().required(),
    billing_last_name: yup.string().required(),
    billing_email: yup.string().email().required(),
    billing_phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    billing_country: yup.string().required(),
    billing_state: yup.string().required(),
    billing_city: yup.string().required(),
    billing_pin: yup.string().required(),
    billing_address_1: yup.string().required(),
  })
  .required();

const Cart: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState<CartType>({
        id: 0,
        total_items:0,
        coupon_discount: 0,
        delivery_charge: 0,
        gst_charge: 0,
        sub_total: 0,
        total_discount: 0,
        total_price_with_coupon_dicount: 0,
        total_price_with_gst_delivery_charge: 0,
        total_price_without_gst_delivery_charge: 0,
        total_quantity: 0,
        coupon: {
          name: null,
          description: null,
          discount: null,
          maximum_dicount_in_price: null,
          maximum_number_of_use: null,
          code: null,
        },
        products:[],
        created_at: '',
        updated_at: '',
    });

    const {auth} = useContext(AuthContext);
    const {cart, setCart, cartLoading } = useContext(CartContext);

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
        getWishlist()
        return () => {}
    }, [auth, cart])

    const getWishlist = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.get(api_routes.cart, {
            headers: {"Authorization" : `Bearer ${auth.token}`}
          });
          setCartProducts(response.data.cart)
        } catch (error: any) {
          console.log(error);
        }finally {
            setLoading(false);
        }
    }

    const removeWishlistHandler = (data:number) => {   
        const filteredWishlist = cart.cart.filter(item=> item.product_id!=data);
        setCart([...filteredWishlist])
    }

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

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.register, data);
          setResponseMessage(response.data.message);
          setIsToastOpen(true);
          reset({
            billing_first_name: "",
            billing_last_name: "",
            billing_email: "",
            billing_phone: "",
            billing_country: "",
            billing_state: "",
            billing_city: "",
            billing_pin: "",
            billing_address_1: "",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            setResponseMessage(error?.response?.data?.message);
            setIsToastOpen(true);
          }
          if (error?.response?.data?.errors?.billing_first_name) {
            setError("billing_first_name", {
              type: "server",
              message: error?.response?.data?.errors?.billing_first_name[0],
            });
          }
          if (error?.response?.data?.errors?.billing_last_name) {
            setError("billing_last_name", {
              type: "server",
              message: error?.response?.data?.errors?.billing_last_name[0],
            });
          }
          if (error?.response?.data?.errors?.billing_email) {
            setError("billing_email", {
              type: "server",
              message: error?.response?.data?.errors?.billing_email[0],
            });
          }
          if (error?.response?.data?.errors?.billing_phone) {
            setError("billing_phone", {
              type: "server",
              message: error?.response?.data?.errors?.billing_phone[0],
            });
          }
          if (error?.response?.data?.errors?.billing_country) {
            setError("billing_country", {
              type: "server",
              message: error?.response?.data?.errors?.billing_country[0],
            });
          }
          if (error?.response?.data?.errors?.billing_state) {
            setError("billing_state", {
              type: "server",
              message: error?.response?.data?.errors?.billing_state[0],
            });
          }
          if (error?.response?.data?.errors?.billing_city) {
            setError("billing_city", {
              type: "server",
              message: error?.response?.data?.errors?.billing_city[0],
            });
          }
          if (error?.response?.data?.errors?.billing_pin) {
            setError("billing_pin", {
              type: "server",
              message: error?.response?.data?.errors?.billing_pin[0],
            });
          }
          if (error?.response?.data?.errors?.billing_address_1) {
            setError("billing_address_1", {
              type: "server",
              message: error?.response?.data?.errors?.billing_address_1[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };


    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={true}>
                {auth.authenticated ? 
                loading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>:
                cartProducts.products.length>0 ? <>
                
                  <IonCard className=" mt-2 mb-2">
                      <div className='ion-padding pt-0 pb-2'>
                          <div className="content-main mt-1">
                              <h6>Cart Items</h6>
                          </div>
                      </div>
                      {
                          cartProducts.products.map((item, i) => <CartItem {...item} deleteHandler={removeWishlistHandler} loading={cartLoading} key={i} />)
                      }
                  </IonCard>

                  <IonCard className="final-table mt-2 mb-2">
                      <div className='ion-padding pt-0 pb-0'>
                          <div className="content-main mt-1">
                              <h6>Coupon Code</h6>
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
                                      placeholder="Enter Coupon Code"
                                      ></IonInput>
                                  </IonItem>
                              </IonCol>
                              <IonCol
                                  size="3"
                                  className='text-right'
                              >
                                  <IonButton className="m-0" size="small" fill='outline' color="success">
                                      Apply
                                  </IonButton>
                              </IonCol>
                          </IonRow>
                      </div>
                      
                  </IonCard>
                  
                  <IonCard className="final-table mt-2 mb-2">
                      <div className='ion-padding pt-0 pb-2'>
                          <div className="content-main mt-1">
                              <h6>Pricing Information</h6>
                          </div>
                      </div>
                      <table className="w-100 border-final-1">
                          <thead className="w-100">
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Total Items:</td>
                                  <td className="text-right tr-price">{cartProducts.total_items}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Sub Total:</td>
                                  <td className="text-right tr-price">Rs. {cartProducts.sub_total}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Total Discount:</td>
                                  <td className="text-right tr-price">- Rs. {cartProducts.total_discount}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">GST:</td>
                                  <td className="text-right tr-price">+ Rs. {cartProducts.gst_charge}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Delivery Charge:</td>
                                  <td className="text-right tr-price">+ Rs. {cartProducts.delivery_charge}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                  <td className="text-right tr-price font-bold">Rs. {(cartProducts.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Coupon Discount:</td>
                                  <td className="text-right tr-price">- Rs. {cartProducts.coupon_discount}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                  <td className="text-left tr-price font-bold">Total:</td>
                                  <td className="text-right tr-price font-bold">Rs. {cartProducts.total_price_with_coupon_dicount}</td>
                              </tr>
                          </thead>
                      </table>
                  </IonCard>

                  <IonItemDivider className="cart-divider-total" slot="fixed">
                      <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                          <IonCol
                              size="6"
                              className='text-left'
                          >
                              <IonText className="text-left mb-0 pb-0">
                                  <h4 className="text-left mb-0 pb-0 mt-0 pt-0">Rs. {cartProducts.total_price_with_coupon_dicount}</h4>
                              </IonText>
                          </IonCol>
                          <IonCol
                              size="6"
                              className='text-right'
                          >
                              <IonButton id="checkout-modal" className="pagination-btn m-0" fill='solid' color="success">
                                  Checkout
                                  <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                              </IonButton>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>

                  <div className="ion-padding">
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
                  </div>

                  <IonModal ref={modal} trigger="checkout-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                      <IonHeader>
                          <IonToolbar>
                              <IonTitle>Checkout</IonTitle>
                              <IonButtons slot="end">
                                  <IonButton size="small" color='success' shape='round' fill='outline' strong={true} onClick={() => modal.current?.dismiss('confirm')}>
                                      Cancel
                                  </IonButton>
                              </IonButtons>
                          </IonToolbar>
                      </IonHeader>
                      <IonContent>
                      <div className='ion-padding mb-1'>
                          <div className="content-main mt-1">
                              <h6>Billing Information</h6>
                          </div>
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
                                              placeholder='Enter address'
                                              label='Message'
                                              inputmode="text"
                                              {...register('billing_address_1')}
                                          >
                                          </IonTextarea>
                                      </IonItem>
                                      <ErrorMessage
                                          errors={errors}
                                          name='billing_address_1'
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
                                  "Place Order"
                              )}
                              </IonButton>
                          </form>
                      </div>
                      </IonContent>
                  </IonModal>

                </> : <EmptyCart type="cart" /> : <EmptyCart type="cart" />}

            </IonContent>
        </IonPage>
    );
};

export default Cart;
