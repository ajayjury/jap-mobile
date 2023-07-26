import { IonItem, IonLabel } from "@ionic/react";
import { Order } from "../../helper/types";

const OrderCard: React.FC<Order> = ({receipt, total_price_with_coupon_dicount, created_at, order_status, products}) => {
    return (
        <IonItem lines="full" detail={true}>
            <IonLabel>
                <h3><code>Receipt:</code> {receipt}</h3>
                <p><code>Items:</code> {products.map((item, i)=> <span>{item.name}{products.length==i+1 ? '' : ','} </span>)}</p>
                <p><code>Amount:</code> Rs. {total_price_with_coupon_dicount}</p>
                <p><code>Placed:</code> {created_at}</p>
                <p><code>Order Status:</code> {order_status}</p>
            </IonLabel>
        </IonItem>
    );
}

export default OrderCard;