import { ContainCategories, PageBase } from '../../components';
import { SimpleCarousel } from './components/SimpleCarousel';
import Carousel from 'react-multi-carousel';
import { Carousel as Carousel3D } from 'react-configurable-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CardItem } from './components/CardItem';
import { ItemFooter } from './components/ItemFooter';

export const HomePage = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <PageBase>
      {/* <ButtonInfo /> */}

      <SimpleCarousel />
      {/* Categorías */}
      <section className="my-10 flex flex-col md:flex-row md:justify-center">
        <ContainCategories />
      </section>
      {/* Servicios maritimos más populares */}
      <section
        style={{
          background:
            'linear-gradient(90deg, rgba(0,233,186,1) 0%, rgba(0,191,232,1) 50%, rgba(0,10,255,1) 100%)'
        }}
        className="flex flex-col justify-center items-center h-[600px]"
      >
        <h1 className="font-light text-white mt-10 text-2xl tracking-[.40em]">
          SERVICIOS MARÍTIMOS MÁS POPULARES
        </h1>
        <Carousel className="z-9 w-[80%] h-[550px]" responsive={responsive}>
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
          <CardItem
            img={require('../../assets/images/naves-1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="250.000"
          />
          <CardItem
            img={require('../../assets/images/naves-2.png')}
            title="Servicio de transporte"
            direction="Dirección 2"
            price="2.050.000"
          />
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
        </Carousel>
      </section>
      {/*Como funciona womar y Carrusel 3D */}
      <section className="flex flex-col items-center py-4">
        <h2
          style={{ color: '#003BE9' }}
          className="my-10 font-bold text-4xl tracking-[.30em]"
        >
          ¿CÓMO FUNCIONA WOMAR?
        </h2>
        <Carousel3D
          arrows={true}
          dotsNavigation={false}
          dotsNavigationInside={true}
          width={'90%'}
          height={'400px'}
          carouselStyle={'3d'}
        >
          <div
            className="bg-center bg-cover bg-no-repeat w-[100%] h-[100%]"
            style={{
              backgroundImage: `url(${require('../../assets/images/comofunciona-1.png')})`
            }}
          ></div>
          <div
            className="bg-center bg-cover bg-no-repeat w-[100%] h-[100%]"
            style={{
              backgroundImage: `url(${require('../../assets/images/comofunciona-2.png')})`
            }}
          ></div>
          <div
            className="bg-center bg-cover bg-no-repeat w-[100%] h-[100%]"
            style={{
              backgroundImage: `url(${require('../../assets/images/comofunciona-3.png')})`
            }}
          ></div>
        </Carousel3D>
      </section>
      <footer
        className="relative bg-center bg-cover bg-no-repeat w-full h-72 mt-10"
        style={{
          backgroundImage: `url(${require('../../assets/images/footer.jpg')})`,
          zIndex: '-1'
        }}
      >
        {/* fondo de color */}
        <div className="absolute top-0 lef-0 w-full h-full"></div>
        <div className="relative grid grid-cols-3" style={{ zIndex: '9999' }}>
          <div className="grid-span-1 flex flex-col items-center pt-10">
            <h2
              className="text-white font-bold text-[2.8rem]"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              ¿AÚN
            </h2>
            <h2
              className="text-white font-medium text-[2.8rem] pl-40"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              TIENES
            </h2>
            <h2
              className="text-white font-medium text-[2.8rem] pl-60"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              DUDAS?
            </h2>
          </div>
          <div className="grid-span-2 flex items-center">
            <ItemFooter
              img={require('../../assets/images/ico-avion.svg')}
              text="Contáctanos"
            />
            <ItemFooter
              img={require('../../assets/images/ico-wsp.svg')}
              text="Envianos un WhatsApp"
            />
          </div>
        </div>
      </footer>
    </PageBase>
  );
};
