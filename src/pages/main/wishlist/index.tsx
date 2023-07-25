import {
    IonToast,
    IonPage,
    IonContent,
    IonCard,
} from "@ionic/react";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useContext, useEffect, useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import CartItem from "../../../components/CartItem";
import BackHeader from "../../../components/BackHeader";
import { AuthContext } from "../../../context/AuthProvider";
import { WishlistContext } from "../../../context/WishlistProvider";
import { Wishlist as WishlistType } from "../../../helper/types";
import LoadingPricingTable from "../../../components/LoadingPricingTable";

const Wishlist: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [wishlistProducts, setWishlistProducts] = useState<WishlistType>({
        id: 0,
        total_items:0,
        products:[],
        created_at: '',
        updated_at: '',
    });
    const [isToastOpen, setIsToastOpen] = useState(false);

    const {auth} = useContext(AuthContext);
    const {wishlist, setWishlist, wishlistLoading} = useContext(WishlistContext);

    useEffect(() => {
        getWishlist()
        return () => {}
    }, [auth, wishlist])

    const getWishlist = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.get(api_routes.wishlist, {
            headers: {"Authorization" : `Bearer ${auth.token}`}
          });
          setWishlistProducts(response.data.wishlist)
        } catch (error: any) {
          console.log(error);
        }finally {
            setLoading(false);
        }
    }

    const removeWishlistHandler = (data:number) => {   
        const filteredWishlist = wishlist.wishlist.filter(item=> item!=data);
        setWishlist([...filteredWishlist])
    }
    


    return (
        <IonPage>
            <BackHeader title='Wishlist' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={true}>
                {loading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>: auth.authenticated && wishlistProducts.products.length>0 ? <>
                
                <IonCard className="mt-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Wishlist Items</h6>
                        </div>
                    </div>
                    {
                        wishlistProducts.products.map((item, i) => <CartItem {...item} deleteHandler={removeWishlistHandler} loading={wishlistLoading} key={i} />)
                    }
                </IonCard>


                <div className="ion-padding">
                    <IonToast
                        isOpen={isToastOpen}
                        message={responseMessage}
                        onDidDismiss={() => setIsToastOpen(false)}
                        duration={5000}
                        buttons={[
                        {
                            text: "Close",
                            handler: () => {
                            setIsToastOpen(false);
                            },
                        },
                        ]}
                        layout="stacked"
                    ></IonToast>
                </div>

            </> : <EmptyCart type="wishlist" />}
                

            </IonContent>
        </IonPage>
    );
};

export default Wishlist;
