import { IonApp, IonTabs, IonRouterOutlet, IonGrid, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, fileTrayStackedOutline, cartOutline, personCircleOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import ForgotPassword from "../../pages/auth/forgot-password";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Cart from "../../pages/main/cart";
import Category from "../../pages/main/category";
import Home from "../../pages/main/home";
import Order from "../../pages/main/orders";
import OrderDetail from "../../pages/main/orders/detail";
import Product from "../../pages/main/product";
import ProductDetail from "../../pages/main/product/detail";
import Profile from "../../pages/main/profile";
import Setting from "../../pages/main/setting";
import Wishlist from "../../pages/main/wishlist";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Account from "../../pages/main/account";

const PageTabs: React.FC = () => {
  const {auth} = useContext(AuthContext);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/forgot_password" component={ForgotPassword}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/category/:slug" component={Category}></Route>
            <Route exact path="/products" component={Product}></Route>
            <Route exact path="/products/:slug" component={ProductDetail}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/wishlist" component={Wishlist}></Route>
            <Route exact path="/account" component={auth.authenticated ? Account : Login}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/setting" component={Setting}></Route>
            <Route exact path="/orders" component={Order}></Route>
            <Route exact path="/orders/:receipt" component={OrderDetail}></Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <IonGrid className='h-100'></IonGrid>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton className='main-tabs' tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="products" href="/products">
              <IonIcon icon={fileTrayStackedOutline} />
              <IonLabel>Products</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="cart" href="/cart">
              <>
                <IonIcon icon={cartOutline} />
                <IonBadge color="success">2</IonBadge>
              </>
              <IonLabel>Cart</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="account" href="/account">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default PageTabs;