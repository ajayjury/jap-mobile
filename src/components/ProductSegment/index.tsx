import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, } from "@ionic/react";
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
    const [segment, setSegment] = useState<string>('default')
    const [segmentUrl, setSegmentUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [products, setProducts] = useState<any[]>([]);
    const [meta, setMeta] = useState<any>({
        next: true,
        prev: true,
    });

    useEffect(() => {
      fetchProducts();
      return () => {}
    }, [page, segmentUrl])

    const fetchProducts = async ():Promise<void> => {
        setLoading(true);
        try {
            let category_slug_link = api_routes.products+`?page=${page}`;
            if(category_slug){
                category_slug_link+=`?page=${page}&filter[has_categories]=${category_slug}`
            }
            const response:AxiosResponse = await axiosPublic.get(category_slug_link+segmentUrl);
            setProducts([...response.data.data])
            if(response.data.links.next){
                setMeta({
                    ...meta, next: false
                })
            }else{
                setMeta({
                    ...meta, next: true
                })
            }
            if(response.data.links.prev){
                setMeta({
                    ...meta, prev: false
                })
            }else{
                setMeta({
                    ...meta, prev: true
                })
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const segmentChangeHandler = (data:any):void => {
        setSegment(data.detail.value)
        if(data.detail.value==='default'){
            setSegmentUrl('')
            return;
        }
        setSegmentUrl(`&filter[${data.detail.value}]=true`)
    }

    const prevHandler = ():void => {
        setPage(page-1)
    }
    
    const nextHandler = ():void => {
        setPage(page+1)
    }

    console.log('fired')
    
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

            {/* {loading && <LoadingCard />} */}
            
            {loading ? <LoadingCard /> : products.length>0 ? <>
                <IonGrid className="mt-1 p-0">
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
                    <Pagination prev={()=>prevHandler()} prev_disabled={meta.prev} next={()=>nextHandler()} next_disabled={meta.next} />
                </IonGrid>
            </> : <IonText color={'success'}>
               <p className="text-center mt-1">Oops! No products available.</p>
            </IonText>}

        </>
    );
}

export default ProductSegment;