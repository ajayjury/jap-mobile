import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

type Props = {
    title: string,
    link: string,
};

const BackHeader: React.FC<Props> = ({title, link}) => {
    return (
        <IonHeader translucent={true} className='main-header-background'>
            <IonToolbar className='main-header-background'>
              <IonButtons slot="start">
                <IonBackButton defaultHref={link}></IonBackButton>
              </IonButtons>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

export default BackHeader;