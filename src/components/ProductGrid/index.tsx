import { IonCol, IonGrid, IonRow, IonText, } from "@ionic/react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import Pagination from "../Pagination";
import LoadingCard from "../LoadingCard";
import { Meta, ProductSegmentState } from "../../helper/types";

type ProductGridProps = {
    loading: boolean;
    products: ProductSegmentState[]|[];
    prevHandler: ()=>void;
    nextHandler: ()=>void;
    meta: Meta
};

const ProductGrid: React.FC<ProductGridProps> = ({loading, products, prevHandler, nextHandler, meta}) => {
    
    return (
        <>
            
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
                    <Pagination prev={()=>prevHandler()} prev_disabled={meta.prev_disabled} next={()=>nextHandler()} next_disabled={meta.next_disabled} />
                </IonGrid>
            </> : <IonText color={'success'}>
               <p className="text-center mt-1">Oops! No products available.</p>
            </IonText>}

        </>
    );
}

export default ProductGrid;