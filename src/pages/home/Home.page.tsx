import { Box, Container } from '@mui/material';
import { ContainCategories, PageBase } from '../../components';
import { StepsComponent } from './components/StepsComponent';

export const HomePage = () => {
  const steps = [
    {
      stepNumber: '1',
      label:
        'Explora los servicios marítimos, lee todos los detalles, reseñas, selecciona y contáctalo.',
      image: require('../../assets/images/servicio-1.png')
    },
    {
      stepNumber: '2',
      label: 'El proveedor del servicio revisará tu solicitud.',
      image: require('../../assets/images/servicio-2.png')
    },
    {
      stepNumber: '3',
      label:
        'Recibirás un correo electrónico de confirmación y listo habrás contactado tu servicio.',
      image: require('../../assets/images/servicio-3.png')
    }
  ];

  return (
    <PageBase>
      {/* Imagen de fondo */}
      <Box
        className="flex bg-cover bg-no-repeat bg-center justify-center items-start md:justify-end md:items-center"
        sx={{
          backgroundImage: `url(${require('../../assets/images/Banner.png')})`,
          width: '100%',
          height: '40vh'
        }}
      >
        <h3
          className="font text-center pt-5 text-2xl w-5/12 font-bold sm:text-sm md:text-5xl lg:text-6xl md:pt-0"
          style={{
            color: '#FFFFFF'
          }}
        >
          Contacta tu servicio marítimo
        </h3>
      </Box>
      {/* Categorías */}
      <section className="my-10 flex flex-col md:flex-row md:justify-center">
        <ContainCategories />
      </section>
      {/* Servicios maritimos más populares */}
      <Container maxWidth={'xl'} sx={{ width: '100%', height: 'auto' }}>
        {/* <Carrusel /> */}
      </Container>
      {/* Como publicar */}
      <Box
        className="bg-center bg-no-repeat bg-cover"
        sx={{
          backgroundImage: `url(${require('../../assets/images/background-ocean.jpeg')})`,
          width: '100%',
          height: '700px',
          py: 2
        }}
      >
        <Container maxWidth={'xl'}>
          <h4 className="font my-3 font-bold text-[20px] md:text-4xl">
            Cómo funciona Womar?
          </h4>
          <div className="flex mt-5 flex-col md:justify-around md:items-center md:flex-row md:mt-10">
            {/* Contenido card */}
            {steps.map((step, index) => (
              <StepsComponent
                key={index}
                spanNumber={step.stepNumber}
                label={step.label}
                image={step.image}
              />
            ))}
          </div>
        </Container>
      </Box>
    </PageBase>
  );
};
