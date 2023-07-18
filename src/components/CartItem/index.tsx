import { IonItemGroup, IonItemDivider, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonImg, IonText, IonInput } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

type Props = {
    type: 'cart'|'wishlist',
};

const CartItem: React.FC<Props> = ({type}) => {
    return (
        <IonItemGroup>
            <IonItemDivider className="cart-divider">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                    <IonCol
                        size="10"
                        className='text-left'
                    >
                        <IonLabel>Product 1</IonLabel>
                    </IonCol>
                    <IonCol
                        size="2"
                        className='text-right'
                    >
                        <IonButton className="pagination-btn m-0" fill='outline' color="danger">
                            <IonIcon icon={trashOutline}></IonIcon>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonItemDivider>
            <div className="ion-padding p-inline-5">
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
                            <h6 className="text-left mb-0 pb-0 mt-0 pt-0">Product 1</h6>
                        </IonText>
                        <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic.</p>
                        <div className="d-flex ion-align-items-center">
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
                            {type=='wishlist' && <IonButton color={'success'} size="small" className="p-0 cart-btn">
                                Add to Cart
                            </IonButton>}
                        </div>
                    </IonCol>
                </IonRow>
                <table className="mt-1 w-100 border-1">
                    <thead className="w-100">
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Price:</td>
                            <td className="text-right tr-price">Rs. 100</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Discount:</td>
                            <td className="text-right tr-price">Rs. 100</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price font-bold">Total:</td>
                            <td className="text-right tr-price font-bold">Rs. 100</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </IonItemGroup>
    );
}

export default CartItem;