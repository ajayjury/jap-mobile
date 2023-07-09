import { IonItem, IonLabel } from "@ionic/react";

const OrderCard: React.FC = () => {
    return (
        <IonItem lines="full" detail={true}>
            <IonLabel>
                <h3><code>Receipt:</code> 68ddf3f0-2d46-4a36-b05d-5a135e8e3d35</h3>
                <p><code>Items:</code> Product 1, Product 2, Product 3, Product 4</p>
                <p><code>Amount:</code> Rs. 12555.6</p>
                <p><code>Date:</code> 3 weeks ago</p>
                <p><code>Order Status:</code> OUT FOR DELIVERY</p>
            </IonLabel>
        </IonItem>
    );
}

export default OrderCard;