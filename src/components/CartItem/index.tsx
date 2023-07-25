import { IonItemGroup, IonItemDivider, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonImg, IonText, IonInput, IonSpinner } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import CartQuantityList from "../CartQuantityList";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";

type Props = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    price: number
    loading?: boolean
    deleteHandler?: (data:number) => void
};

const CartItem: React.FC<Props> = ({id, name, slug, description, featured_image_link, discount, discounted_price, price, inventory, deleteHandler, loading}) => {
    const [cartQuantity, setCartQuantity] = useState<number>(1);
    const {cart, setCart, cartLoading } = useContext(CartContext);

    const deleteClickHandler = () => {
        deleteHandler && deleteHandler(id);
    }
    useEffect(() => {
        getProductCartDetail()
        return () => {}
    }, [id])
      
    const getProductCartDetail = () =>{
        const cart_prod = cart.cart.filter((item: any)=>item.product_id==id);
        if(cart_prod.length>0){
            setCartQuantity(cart_prod[0].quantity);
        }else{
            setCartQuantity(1);
        }
    }

    const cartHandler = (quantity:number) => {
        
        const filteredCart = cart.cart.filter(item=> item.product_id==id);
        if(filteredCart.length<1){
            setCart([...cart.cart, {quantity, product_id: id}])
        } else{
            const index = cart.cart.findIndex(x => x.product_id==id);
            const cartArr = cart.cart;
            cartArr[index].quantity = quantity;
            setCart([...cartArr])
        }
    }

    return (
        <IonItemGroup>
            <IonItemDivider className="cart-divider">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                    <IonCol
                        size="10"
                        className='text-left'
                    >
                        <IonLabel>{name}</IonLabel>
                    </IonCol>
                    <IonCol
                        size="2"
                        className='text-right'
                    >
                        {loading ? <IonSpinner name="dots" color={'danger'}></IonSpinner> : 
                        <IonButton className="pagination-btn m-0" fill='outline' color="danger" disabled={loading} onClick={deleteClickHandler}>
                            <IonIcon icon={trashOutline}></IonIcon>
                        </IonButton>}
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
                        <CartQuantityList max_quantity={inventory}  cartHandler={cartHandler} cartLoading={cartLoading} quantity_count={cartQuantity} />
                    </IonCol>
                </IonRow>
                <table className="mt-1 w-100 border-1">
                    <thead className="w-100">
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Price:</td>
                            <td className="text-right tr-price">Rs. {price}</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Discount:</td>
                            <td className="text-right tr-price">{discount}%</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price font-bold">Total:</td>
                            <td className="text-right tr-price font-bold">Rs. {discounted_price}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </IonItemGroup>
    );
}

export default CartItem;