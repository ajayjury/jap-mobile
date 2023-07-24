import { IonItemGroup, IonItemDivider, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonImg, IonText, IonInput, IonSpinner } from "@ionic/react";
import { cartOutline, trashOutline } from "ionicons/icons";

type Props = {
    type: 'cart'|'wishlist',
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

const CartItem: React.FC<Props> = ({type, id, name, slug, description, featured_image_link, discount, discounted_price, price, deleteHandler, loading}) => {
    const deleteClickHandler = () => {
        deleteHandler && deleteHandler(id);
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
                                <IonIcon icon={cartOutline} slot="start"></IonIcon> Add
                            </IonButton>}
                        </div>
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