export type DetailService = {
  // id: number;
  // address: string;
  // price: number;
  // title: string;
  // rating: number;
  // description?: string;
  // urlImgCover: string;
  // urlOtherImg: string[];
  id: number;
  estado: string;
  titulo: string;
  comuna: {
    id: number;
    nombre: string;
  };
  categoria: {
    id: number;
    nombre: string;
  };
  descripcion: string;
  locacion: string;
  puntuacion: number;
  urlImagenPrincipal: string;
  otrasImagenes: string[];
  precio: number;
};
