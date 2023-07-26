import { IonItem, IonRow, IonCol, IonImg, IonText } from "@ionic/react";
import { CartProducts } from "../../helper/types";

const OrderItem: React.FC<CartProducts> = ({featured_image_link, name, description, quantity, price, discount, discounted_price, total_quantity_price}) => {
    return (
        <IonItem lines="full">
            <div className="ion-no-padding ptb-1_5">
                <IonRow className="ion-align-items-center p-0 mt- w-100">
                    <IonCol
                        size="3"
                        className='text-left'
                    >
                        <div className='product-img-container'>
                            <IonImg alt="product" className='' src={featured_image_link} />
                        </div>
                    </IonCol>
                    <IonCol
                        size="9"
                        className='text-left'
                    >
                        <IonText color="success" className="text-left mb-0 pb-0">
                            <h6 className="text-left mb-0 pb-0 mt-0 pt-0">{name}</h6>
                        </IonText>
                        <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">{description}</p>
                    </IonCol>
                </IonRow>
                <table className="mt-1 w-100 border-1">
                    <thead className="w-100">
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Quantity:</td>
                            <td className="text-right tr-price">{quantity}</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Price:</td>
                            <td className="text-right tr-price">Rs. {price}</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Discount:</td>
                            <td className="text-right tr-price">{discount}%</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Sub Total:</td>
                            <td className="text-right tr-price">{quantity}(qty) x Rs. {discounted_price}</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price font-bold">Total:</td>
                            <td className="text-right tr-price font-bold">Rs. {total_quantity_price}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </IonItem>
    );
}

export default OrderItem;