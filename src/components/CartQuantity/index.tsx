import { IonButton, IonInput } from "@ionic/react";
import { useState } from "react";

type CartQuantityProps = {
  max_quantity: number;
};

const CartQuantity: React.FC<CartQuantityProps> = ({max_quantity}) => {
    const [quantity, setQuantity] = useState<number>(1);

    const incrementQuantity = () => setQuantity(Math.min(quantity+1, max_quantity));
    const decrementQuantity = () => setQuantity(Math.max(1, quantity-1));

    return (
      <div className="quantity-holder">
        <div className="col-auto">
          <IonButton color={'success'} size="small" onClick={decrementQuantity} className="m-0 h-100 p-0">
            -
          </IonButton>
        </div>
        <div className="col-3">
          <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={quantity} className="text-center quantity-text-holder"></IonInput>
        </div>
        <div className="col-auto">
          <IonButton color={'success'} size="small" onClick={incrementQuantity} className="m-0 h-100 p-0">
            +
          </IonButton>
        </div>
      </div>
    );
}

export default CartQuantity;