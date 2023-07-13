import { IonPage, IonContent, IonImg } from '@ionic/react';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import MainFooter from '../../../components/MainFooter';
import BackHeader from '../../../components/BackHeader';
import ProductSegment from '../../../components/ProductSegment';
import { RouteComponentProps } from "react-router";
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import LoadingDetail from '../../../components/LoadingDetail';

interface CategoryProps extends RouteComponentProps<{
  slug: string;
}> {}



const Category: React.FC<CategoryProps> = ({match}) => {
  
  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<any>({});

  useEffect(() => {
    fetchCategories();
    return () => {}
  }, [match.params.slug])

  const fetchCategories = useCallback(
    async () => {
      setLoading(true);
      try {
          let category_link = api_routes.category+`/${match.params.slug}`;
          const response:AxiosResponse = await axiosPublic.get(category_link);
          
          setCategory({...response.data.category})
      } catch (error) {
          console.log(error);
      }finally{
          setLoading(false);
      }
    },
    [match.params.slug],
  )

    return (
      <IonPage>
        <BackHeader title={category.name} link='/home' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
          {loading ? 
            <LoadingDetail /> :
            <>
              <IonImg
                  src={category.banner_image_link}
                  alt="Sliders"
                  style={{width: '100%'}}
              ></IonImg>
              <div className='content-main pt-10'>
                  <h1>{category.name}</h1>
              </div>
            </>
          }
          <div className='ion-padding pt-0'>
            <div className="content-main">
              <p>
                {category.description}
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