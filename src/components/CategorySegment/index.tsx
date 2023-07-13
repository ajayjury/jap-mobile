import { IonCol, IonGrid, IonRow, IonText, } from "@ionic/react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import { AxiosResponse } from "axios";
import LoadingCard from "../LoadingCard";
import CategoryCard from "../CategoryCard";
import {CategoryState, Meta} from '../../helper/types';
import { usePagination } from "../../hooks/usePagination";

const CategorySegment: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {page, prevHandler, nextHandler} = usePagination();
    const [categories, setCategories] = useState<CategoryState[]|[]>([]);
    const [meta, setMeta] = useState<Meta>({
        next_disabled: true,
        prev_disabled: true,
    });

    useEffect(() => {
      fetchCategories();
      return () => {}
    }, [page])

    const fetchCategories = useCallback(
      async () => {
        setLoading(true);
        try {
            let category_link = api_routes.categories+`?page=${page}`;
            const response:AxiosResponse = await axiosPublic.get(category_link);
            setCategories([...response.data.data])
            const metaResp = meta
            if(response.data.links.next){
                metaResp.next_disabled = false
            }else{
                metaResp.next_disabled = true
            }
            if(response.data.links.prev){
                metaResp.prev_disabled = false
            }else{
                metaResp.prev_disabled = true
            }
            setMeta({
                ...metaResp
            })
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
      },
      [page],
    )
    
    
    return (
        <>
            <div className="content-main">
              <h2>Top Category</h2>
            </div>
            
            {loading ? <LoadingCard /> : categories.length>0 ? <>
                <IonGrid className="mt-1 p-0">
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0">

                    {
                        categories.map((item, i) => <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6" className='p-0' key={i}
                    >
                        <Link className="no-underline" to={`/category/${item.slug}`}>
                            <CategoryCard image={item.icon_image_link} name={item.name} />
                        </Link>
                    </IonCol>)
                    }

                    </IonRow>
                    <Pagination prev={()=>prevHandler()} prev_disabled={meta.prev_disabled} next={()=>nextHandler()} next_disabled={meta.next_disabled} />
                </IonGrid>
            </> : <IonText color={'success'}>
               <p className="text-center mt-1">Oops! No categories available.</p>
            </IonText>}

        </>
    );
}

export default CategorySegment;