export interface InfoUser {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  urlImgPerfil: string;
  comuna: {
    id: number;
    nombre: string;
  };
  rut: string | null;
  telefono: string;
}
