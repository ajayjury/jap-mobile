import { IonItem, IonRow, IonCol, IonImg, IonText } from "@ionic/react";

const OrderItem: React.FC = () => {
    return (
        <IonItem lines="full">
            <div className="ion-padding">
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
                    </IonCol>
                </IonRow>
                <table className="mt-1 w-100 border-1">
                    <thead className="w-100">
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Quantity:</td>
                            <td className="text-right tr-price">2</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Price:</td>
                            <td className="text-right tr-price">Rs. 100</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Discount:</td>
                            <td className="text-right tr-price">Rs. 100</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Sub Total:</td>
                            <td className="text-right tr-price">2(qty) x Rs. 100</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price font-bold">Total:</td>
                            <td className="text-right tr-price font-bold">Rs. 200</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </IonItem>
    );
}

export default OrderItem;