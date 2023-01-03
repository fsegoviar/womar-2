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
import React, { forwardRef, useEffect } from 'react';
import { DetailService } from '../../../interfaces';
import { TransitionProps } from '@mui/material/transitions';
import { InputForm } from '../../../styles/InputForm';
import {
  EditarPublicacion,
  ObtenerCategorias,
  ObtenerComunas
} from '../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import styled from '@emotion/styled';
import { BtnSubmit, ButtonSubmitOutlined } from '../../../styles';

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

export const DialogEditPublish = (props: PropsDialog) => {
  const { comunas } = ObtenerComunas();
  const { categories } = ObtenerCategorias();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TypeForm>();

  useEffect(() => {
    setValue('categoriaId', 1);
    setValue('comunaId', 1);
    setValue('descripcion', props.publish.descripcion);
    setValue('idPublicacion', props.publish.id);
    setValue('precio', props.publish.precio);
    setValue('titulo', props.publish.titulo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    console.log('Data Edit =>', data);
    const { fetchData } = EditarPublicacion(
      data,
      String(localStorage.getItem('tokenWomar'))
    );

    fetchData()
      .then((response: any) => console.log('Editado! =>', response))
      .catch((error: AxiosError) => console.log('Errror =>', error));
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
          {/* <ImageUploading
              multiple
              value={}
              onChange={onChange}
              maxNumber={5}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    style={{
                      backgroundColor: isDragging ? "#0BAEDC" : "white",
                      border: "2px solid #0BAEDC",
                      borderRadius: "20px",
                      width: "100%",
                      height: "150px",
                      textAlign: "center",
                      fontSize: "16px",
                      color: isDragging ? "white" : "black",
                      opacity: "0.7",
                      marginTop: "15px",
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
                      className="image-item"
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "80px",
                      }}
                    >
                      <img
                        src={image.dataURL}
                        alt=""
                        width="100px"
                        height={"100%"}
                        style={{ paddingTop: "10px", backgroundSize: "cover" }}
                      />
                      <button
                        onClick={() => onImageRemove(index)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          position: "absolute",
                          top: "-10px",
                          right: "-15px",
                          cursor: "pointer",
                        }}
                      >
                        <CloseIcon
                          style={{
                            color: "#FFFFFF",
                            backgroundColor: "#0BAEDC",
                            borderRadius: 50,
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading> */}
        </Grid>
        <Grid item xs={10}>
          <Box className="carousel-demo">
            {/* <Box className="card" sx={{ p: 2, height: "250px" }}>
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
                      border: "2px solid #55C6E7",
                      borderRadius: "20px",
                      height: "100%",
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No hay imagenes
                  </Box>
                )}
              </Box> */}
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
                  <SelectForm style={{ width: '100%' }} label="Comuna" required>
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
                    props.close(true);
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
