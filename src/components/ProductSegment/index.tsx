import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton, } from "@ionic/react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import { AxiosResponse } from "axios";
import LoadingCard from "../LoadingCard";

type Props = {
    category_slug?: string;
};

const segments = [
    {
      name: 'All',
      value: 'default'
    },
    {
      name: 'New Arrival',
      value: 'is_new_arrival'
    },
    {
      name: 'Best Sale',
      value: 'is_best_sale'
    },
    {
      name: 'Featured',
      value: 'is_featured'
    },
];

const ProductSegment: React.FC<Props> = ({category_slug}) => {

    const [link, setLink] = useState<string>(category_slug ? api_routes.products+`?filter[has_categories]=${category_slug}` : api_routes.products)
    const [segment, setSegment] = useState<string>('default')
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
      fetchProducts();
      return () => {}
    }, [link])

    const fetchProducts = async ():Promise<void> => {
        setLoading(true);
        try {
            const response:AxiosResponse = await axiosPublic.get(link);
            console.log(response.data)
            setProducts([...response.data.data])
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }

    const segmentChangeHandler = (data:any):void => {
        setSegment(data.detail.value)
        if(data.detail.value==='default'){
            setLink(api_routes.products+`?filter[has_categories]=${category_slug}`)
            return;
        }
        setLink(api_routes.products+`?filter[has_categories]=${category_slug}`+`&filter[${data.detail.value}]=true`)
    }
    
    return (
        <>
            <div className="content-main mt-2 mb-1">
              <h2>Products</h2>
            </div>

            <IonSegment scrollable={true} value={segment} color="success" onIonChange={(data)=>segmentChangeHandler(data)}>
            {
                segments.map((item, i)=><IonSegmentButton value={item.value} key={i}>
                <IonLabel>{item.name}</IonLabel>
                </IonSegmentButton>)
            }
            </IonSegment>
            
            {loading && <LoadingCard />}
            
            {!loading && <IonGrid className="mt-1 p-0">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                {
                    products.map((item, i) => <IonCol
                    size="6"
                    size-xl="3"
                    size-lg="3"
                    size-md="4"
                    size-sm="6"
                    size-xs="6" className='p-0' key={i}
                >
                    <Link className="no-underline" to={`/products/${item.slug}`}>
                        <ProductCard image={item.featured_image_link} name={item.name} price={`Rs. ${item.price}`} discounted_price={`Rs. ${item.discounted_price}`} />
                    </Link>
                </IonCol>)
                }

                </IonRow>
                <Pagination prev={()=>alert('prev')} next={()=>alert('next')} />
            </IonGrid>}

        </>
    );
}

export default ProductSegment;