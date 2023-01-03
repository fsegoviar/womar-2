import { forwardRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { InputForm } from '../../../styles/InputForm';
import { ObtenerCategorias, ObtenerComunas } from '../../../services';
import axios from 'axios';
import { BtnSubmit, ButtonSubmitOutlined } from '../../../styles';
import styled from '@emotion/styled';
import { parseJwt } from '../../../utils';

type CreatePublishType = {
  title: string;
  address: string;
  price: number;
  description: string;
  categoriaId: number;
  comunaId: number;
  listImg: Blob;
};

type PropsDialog = {
  open: boolean;
  close: () => void;
};

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
  //Color del placeholder
  /*   & label.Mui-focused {
    color: red;
  } */

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

export const CreatePublish = (props: PropsDialog) => {
  const [images, setImages] = useState([]);
  const [countImg, setCountImg] = useState(0);
  const [caruselImg, setCarruselImg] = useState([]);
  const { comunas } = ObtenerComunas();
  const { categories } = ObtenerCategorias();
  const { userId } = parseJwt();
  const [file, setFile] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreatePublishType>();
  const maxNumber = 5;

  const fetchUploadImage = async (id: string, blob: Blob) => {
    let formData = new FormData();
    formData.append('IdPublicacion', id);
    formData.append('Imagen', blob);

    await axios
      .post(
        'https://womarapi.azurewebsites.net/api/Publicaciones/CargarImagen',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Respuesta OK =>', response);
      })
      .catch((error: any) => {
        console.log('Error =>', error);
      });
  };

  const onSubmit: SubmitHandler<CreatePublishType> = (data) => {
    let listBlobs = file.map((f) => new Blob([f!], { type: 'image/png' }));
    const fetchCreatePublish = async () => {
      await axios
        .post(
          'https://womarapi.azurewebsites.net/api/Publicaciones/CrearPublicacion',
          {
            UsuarioId: userId,
            CategoriaId: data.categoriaId,
            ComunaId: data.comunaId,
            Titulo: data.title,
            Descripcion: data.description,
            Precio: data.price
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
            }
          }
        )
        .then((response: any) => {
          console.log('Respuesta OK =>', response);
          const idPublish = response.data.id;
          console.log(`Listado Blobs`, listBlobs);
          listBlobs.forEach(async (blob) => {
            await fetchUploadImage(idPublish, blob);
          });
        })
        .catch((response: any) => {
          console.log('Respuesta ERROR =>', response);
        });
    };

    fetchCreatePublish();
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
    // let listBlobImg: Blob[] = [];
    let blobImg: Blob = new Blob();

    imageList.forEach((image: any) => {
      if (image) {
        // listBlobImg.push(new Blob([image.file!], { type: "image/png" }));
        console.log(`File => `, image.file!);
        let arrFiles = file!;
        arrFiles.push(image.file!);
        setFile(arrFiles);
      }

      imgUrls.push({
        original: URL.createObjectURL(image.file!),
        thumbnail: URL.createObjectURL(image.file!),
        originalWidth: '100px',
        originalHeight: '200px'
      });
    });
    setValue('listImg', blobImg);
    setCarruselImg(imgUrls as never[]);
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.close}
      maxWidth={'xl'}
    >
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={2}>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps
            }: any) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={{
                    backgroundColor: isDragging ? '#0BAEDC' : 'white',
                    border: '2px solid #0BAEDC',
                    borderRadius: '20px',
                    width: '100%',
                    height: '150px',
                    textAlign: 'center',
                    fontSize: '16px',
                    color: isDragging ? 'white' : 'black',
                    opacity: '0.7',
                    marginTop: '15px'
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Arrastra o sube tu imagen {countImg}/5
                </button>
                &nbsp;
                {imageList.map((image: ImageType, index: number) => (
                  <div
                    key={index}
                    className="image-item"
                    style={{
                      position: 'relative',
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
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        position: 'absolute',
                        top: '-10px',
                        right: '-15px',
                        cursor: 'pointer'
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
                error={!!errors.title}
                id="title"
                style={{
                  margin: '10px 0',
                  width: '100%'
                }}
                label="Titulo *"
                {...register('title', { required: true })}
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
                  onChange={(evnt) => {
                    if (evnt.target.value) {
                      setValue('categoriaId', evnt.target.value as number);
                    }
                  }}
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
                    required
                    onChange={(evnt) => {
                      if (evnt.target.value) {
                        setValue('comunaId', evnt.target.value as number);
                      }
                    }}
                  >
                    {comunas.map((comuna, index) => (
                      <MenuItem key={index} value={comuna.id}>
                        {comuna.nombre}
                      </MenuItem>
                    ))}
                  </SelectForm>
                </FormControl>
                <InputForm
                  error={!!errors.price}
                  id="price"
                  style={{
                    margin: '10px 0',
                    width: '49%'
                  }}
                  label="Precio *"
                  {...register('price', { required: true })}
                />
              </Stack>
              <TextAreaForm
                error={!!errors.description}
                id="description"
                fullWidth
                sx={{ my: 1 }}
                label="Descripción *"
                multiline
                rows={6}
                variant="outlined"
                {...register('description', { required: true })}
              />

              <Box sx={{ float: 'right', '& > :not(style)': { m: 1 } }}>
                <ButtonSubmitOutlined
                  onClick={() => {
                    setImages([]);
                    setCarruselImg([]);
                    setCountImg(0);
                    props.close();
                  }}
                >
                  Cancelar
                </ButtonSubmitOutlined>
                <BtnSubmit type="submit">Crear Publicación</BtnSubmit>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
