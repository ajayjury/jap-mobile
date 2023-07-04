import { IonButton, IonCard, IonCardHeader, IonImg, IonText } from "@ionic/react";

type Props = {
    name: string,
    image: string,
    items: string,
};

const CategoryCard: React.FC<Props> = ({image, name, items}) => {
    return (
        <IonCard className='m-1 p-0 card-bg-grey'>
            <IonImg alt="category" className='category-img-card' src={image} />
            <IonCardHeader className='p-10'>
                <IonText color="success" className='text-center'>
                    <h5 className='p-0 m-0 text-capitalize'>{name}</h5>
                </IonText>
                <IonText className='text-center'>
                    <p className='p-0 m-0'>{items}</p>
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
                    VIEW
                </IonButton>
            </div>
        </IonCard>
    );
}

export default CategoryCard;