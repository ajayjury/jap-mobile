import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import { Link } from "react-router-dom";

const EmptyCart: React.FC = () => {
    return (
        <IonGrid className="h-100">
            <IonRow className="h-100 ion-align-items-center ion-justify-content-center">
                <IonCol
                    size="6"
                    size-xl="6"
                    size-lg="6"
                    size-md="6"
                    size-sm="12"
                    size-xs="12"
                >
                    <IonCard className="auth-card-background">
                        <IonImg
                            src="/images/empty-cart.png"
                            alt="Logo"
                            className="img-empty-cart"
                        ></IonImg>
                        <IonCardHeader>
                            <IonText color="success" className="text-center">
                                <p>Oops! No products available in cart. Please add products to cart</p>
                            </IonText>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="text-center">
                                <Link to="/products">
                                    <IonButton color="success" size="small" shape="round">
                                        Add Products
                                    </IonButton>
                                </Link>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default EmptyCart;