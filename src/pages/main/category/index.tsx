import { IonPage, IonContent, IonImg } from '@ionic/react';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import MainFooter from '../../../components/MainFooter';
import BackHeader from '../../../components/BackHeader';
import ProductSegment from '../../../components/ProductSegment';
import { RouteComponentProps } from "react-router";

const segments = [
  {
    name: 'All',
    value: 'default'
  },
  {
    name: 'New Arrival',
    value: 'new_arrival'
  },
  {
    name: 'Best Sale',
    value: 'best_sale'
  },
  {
    name: 'Featured',
    value: 'featured'
  },
];

interface CategoryProps extends RouteComponentProps<{
  slug: string;
}> {}



const Category: React.FC<CategoryProps> = ({match}) => {
    

    return (
      <IonPage>
        <BackHeader title='Category 1' link='/home' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
          <IonImg
              src={'/images/banner2.jpg'}
              alt="Sliders"
              style={{width: '100%'}}
          ></IonImg>
          <div className='content-main pt-10'>
              <h1>Category 1</h1>
          </div>
          <div className='ion-padding pt-0'>
            <div className="content-main">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tellus nec mauris auctor dignissim fermentum in
                risus. Sed nec convallis sapien, id tincidunt enim. Mauris ornare eleifend nunc id mattis. Fusce augue diam,
                sagittis nec posuere at, consectetur tempor lectus. Nulla at lectus eget mauris iaculis malesuada mollis sed neque.
                Curabitur et risus tristique, malesuada mauris finibus, elementum massa. Proin lacinia mauris quis ligula blandit
                ullamcorper. Donec ut posuere lorem. </p>
                <p>In volutpat magna vitae tellus posuere pulvinar. Nam varius ligula justo, nec
                placerat lacus pharetra ac. Aenean massa orci, tristique in nisl ut, aliquet consectetur libero. Etiam luctus
                placerat vulputate. Aliquam ipsum massa, porttitor at mollis ut, pretium sit amet mi. In neque mauris, placerat et
                neque vel, tempor interdum dolor. Suspendisse gravida malesuada tellus, vel dapibus nisl dignissim vel. Cras ut
                nulla sit amet erat malesuada euismod vel a nulla.
              </p>
            </div>

            <ProductSegment category_slug={match.params.slug} />

          </div>
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Category;