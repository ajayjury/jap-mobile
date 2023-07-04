import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBadge,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { homeOutline, fileTrayStackedOutline, cartOutline, personCircleOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

import Login from './pages/auth/login';
import ForgotPassword from './pages/auth/forgot-password';
import Register from './pages/auth/register';
import Home from './pages/main/home';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgot_password">
            <ForgotPassword />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
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

          <IonTabButton className='main-tabs' tab="forgot_password" href="/forgot_password">
            <IonIcon icon={fileTrayStackedOutline} />
            <IonLabel>Products</IonLabel>
          </IonTabButton>

          <IonTabButton className='main-tabs' tab="register" href="/register">
            <>
            <IonIcon icon={cartOutline} />
            <IonBadge color="success">2</IonBadge>
            </>
            <IonLabel>Cart</IonLabel>
          </IonTabButton>

          <IonTabButton className='main-tabs' tab="login" href="/login">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
