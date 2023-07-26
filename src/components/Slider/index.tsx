import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { IonImg } from '@ionic/react';
import { BannerImages } from '../../helper/types';

const Slider: React.FC<BannerImages> = ({images}) => {
    return (
        <Swiper 
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            autoplay={true}
            keyboard={true}
            pagination={{
              dynamicBullets: true,
            }}
            scrollbar={false}
            zoom={false}
          >
            {
              images.map((item, i) => <SwiperSlide key={i}>
                  <IonImg
                      src={item}
                      alt="Sliders"
                      style={{width: '100%'}}
                  ></IonImg>
              </SwiperSlide>)
            }
        </Swiper>
    );
}

export default Slider;