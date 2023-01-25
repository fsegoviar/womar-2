import {
  Box,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField
} from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react';
import { DetailService } from '../../../interfaces';
import { TransitionProps } from '@mui/material/transitions';
import { InputForm } from '../../../styles/InputForm';
import { ObtenerCategorias, ObtenerComunas } from '../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { BtnSubmit, ButtonSubmitOutlined } from '../../../styles';
import ImageGallery from 'react-image-gallery';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SelectForm = styled(Select)`
  border-color: #0bafdd;
  border-radius: 10px;
  & .MuiOutlinedInput-input {
    border-color: white;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #0bafdd;
  }

  &.Mui-focused fieldset {
    border-color: #0bafdd;
  }
`;

const TextAreaForm = styled(TextField)`
  background: white;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #0bafdd;
      border-radius: 10px;
    }

    &:hover fieldset {
      border-color: #0bafdd;
    }

    &.Mui-focused fieldset {
      border-color: #0bafdd;
    }
  }
`;

type TypeForm = {
  idPublicacion: number;
  titulo: string;
  comunaId: number;
  categoriaId: number;
  descripcion: string;
  precio: number;
};

type PropsDialog = {
  publish: DetailService;
  open: boolean;
  close: (value: boolean) => void;
};

/* type ImageToEdit = {
  id?: number;
  url: string;
}; */

export const DialogEditPublish = (props: PropsDialog) => {
  const { comunas } = ObtenerComunas();
  const { categories } = ObtenerCategorias();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      // idPublicacion: props.publish.id,
      titulo: props.publish.titulo,
      // comunaId: props.publish.comuna.id,
      categoriaId: 3,
      descripcion: props.publish.descripcion,
      precio: props.publish.precio
    }
  });
  const [caruselImg, setCarruselImg] = useState([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [countImg, setCountImg] = useState(0);

  useEffect(() => {
    console.log('Publish Edit => ', props.publish);
    generateImgCarusel();
    generateImgUploaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateImgCarusel = () => {
    props.publish.imagenes.forEach((imgCarrusel: any) => {
      let newCarrusel: any[] = caruselImg;
      newCarrusel.push({
        original: imgCarrusel.urlImagen,
        thumbnail: imgCarrusel.urlImagen,
        originalWidth: '100px'
      });
      setCarruselImg(newCarrusel as never[]);
    });
  };

  const generateImgUploaded = () => {
    setCountImg(props.publish.imagenes.length);
    props.publish.imagenes.forEach((url: any) => {
      let newListImg: ImageListType = images;
      newListImg.push({
        dataURL: url
      });
      setImages(newListImg as never[]);
    });
  };

  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    console.log('Data para Edit =>', data);

    //* Cargo editar publicacion

    //* Elimino las imagenes de la publicacion

    //* Cargo las nuevas imagenes

    // const { fetchData } = EditarPublicacion(
    //   data,
    //   String(localStorage.getItem('tokenWomar'))
    // );

    // fetchData()
    //   .then((response: any) => console.log('Editado! =>', response))
    //   .catch((error: AxiosError) => console.log('Errror =>', error));
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    if (imageList.length <= 5) setCountImg(imageList.length);

    setImages(imageList as never[]);

    const imgUrls: any[] = [];

    imageList.forEach((image: any) => {
      imgUrls.push({
        original: URL.createObjectURL(image.file!),
        thumbnail: URL.createObjectURL(image.file!),
        originalWidth: '100px'
      });
    });
    setCarruselImg(imgUrls as never[]);
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props.close(false)}
      maxWidth={'xl'}
    >
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={2}>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={5}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  className="text-center w-full text-[16px] opacity-70 mt-3"
                  style={{
                    backgroundColor: isDragging ? '#0BAEDC' : 'white',
                    border: '2px solid #0BAEDC',
                    borderRadius: '20px',
                    height: '150px',
                    color: isDragging ? 'white' : 'black'
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Arrastra o sube tu imagen {countImg}/5
                </button>
                &nbsp;
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="relative image-item"
                    style={{
                      width: '100px',
                      height: '80px'
                    }}
                  >
                    <img
                      src={image.dataURL}
                      alt=""
                      width="100px"
                      height={'100%'}
                      style={{ paddingTop: '10px', backgroundSize: 'cover' }}
                    />
                    <button
                      onClick={() => onImageRemove(index)}
                      className="absolute bg-transparent border-none cursor-pointer"
                      style={{
                        top: '-10px',
                        right: '-15px'
                      }}
                    >
                      <CloseIcon
                        style={{
                          color: '#FFFFFF',
                          backgroundColor: '#0BAEDC',
                          borderRadius: 50
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Grid>
        <Grid item xs={10}>
          <Box className="carousel-demo">
            <Box className="card" sx={{ p: 2, height: '250px' }}>
              {caruselImg.length > 0 ? (
                <ImageGallery
                  lazyLoad={true}
                  showPlayButton={false}
                  showNav={true}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  items={caruselImg}
                />
              ) : (
                <Box
                  sx={{
                    border: '2px solid #55C6E7',
                    borderRadius: '20px',
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  No hay imagenes
                </Box>
              )}
            </Box>
          </Box>
          <Grid item xs={12} sx={{ p: 2 }}>
            Datos de la publicacion
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputForm
                error={!!errors.titulo}
                id="title"
                style={{
                  margin: '10px 0',
                  width: '100%'
                }}
                label="Titulo *"
                {...register('titulo', { required: true })}
              />
              <FormControl
                fullWidth
                sx={{
                  p: 0,
                  m: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 1
                }}
              >
                <InputLabel>Categoria</InputLabel>
                <SelectForm
                  style={{ width: '100%' }}
                  label="Categoria"
                  required
                  value={getValues('categoriaId')}
                  // onChange={(evnt) => {
                  //   if (evnt.target.value) {
                  //     setValue("locacion", evnt.target.value as number);
                  //   }
                  // }}
                >
                  {categories.map((categorie, index) => (
                    <MenuItem key={index} value={categorie.id}>
                      {categorie.nombre}
                    </MenuItem>
                  ))}
                </SelectForm>
              </FormControl>
              <Stack
                direction="row"
                sx={{ mb: 1, justifyContent: 'space-around' }}
                spacing={2}
              >
                <FormControl
                  sx={{
                    p: 0,
                    m: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '49%'
                  }}
                >
                  <InputLabel>Comuna</InputLabel>
                  <SelectForm
                    style={{ width: '100%' }}
                    label="Comuna"
                    value={getValues('comunaId')}
                    required
                  >
                    {comunas.map((comuna, index) => (
                      <MenuItem key={index} value={comuna.id}>
                        {comuna.nombre}
                      </MenuItem>
                    ))}
                  </SelectForm>
                </FormControl>
                <InputForm
                  error={!!errors.precio}
                  id="price"
                  style={{
                    margin: '10px 0',
                    width: '49%'
                  }}
                  label="Precio *"
                  {...register('precio', { required: true })}
                />
              </Stack>
              <TextAreaForm
                error={!!errors.descripcion}
                id="description"
                fullWidth
                sx={{ my: 1 }}
                label="Descripción *"
                multiline
                rows={6}
                variant="outlined"
                {...register('descripcion', { required: true })}
              />

              <Box sx={{ float: 'right', '& > :not(style)': { m: 1 } }}>
                <ButtonSubmitOutlined
                  onClick={() => {
                    props.close(false);
                  }}
                >
                  Cancelar
                </ButtonSubmitOutlined>
                <BtnSubmit type="submit">Guardar</BtnSubmit>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
