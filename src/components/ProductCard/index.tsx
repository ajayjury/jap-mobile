import { IonButton, IonCard, IonCardHeader, IonImg, IonText } from "@ionic/react";

type Props = {
    name: string,
    image: string,
    price: string,
    discounted_price: string,
};

const ProductCard: React.FC<Props> = ({image, name, price, discounted_price}) => {
    return (
        <IonCard className='m-1 p-0 product-card'>
            <div className='product-img-container'>
                <IonImg alt="product" className='' src={image} />
            </div>
            <IonCardHeader className='p-10'>
                <IonText color="success" className='text-center'>
                    <h5 className='p-0 m-0 text-capitalize'>{name}</h5>
                </IonText>
                <IonText className='text-center'>
                    <p className='p-0 m-0'><s>{price}</s> <b>{discounted_price}</b></p>
                </IonText>
            </IonCardHeader>
            <div className="text-center mb-1">
                <IonButton
                    color="success"
                    type="submit"
                    expand="block"
                    shape="round"
                    fill='solid'
                    size="small"
                    className='d-inline-block text-center'
                >
                    Buy Now
                </IonButton>
            </div>
        </IonCard>
    );
}

export default ProductCard;