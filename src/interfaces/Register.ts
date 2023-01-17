interface RegisterUser {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  comunaId: number;
  telefono: number;
  email: string;
  password: string;
  role: string;
}

interface RegisterExternalUser {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  comunaId: number;
  telefono: string;
  email: string;
  rut: string;
  proveedor: string;
  role: string;
}

export type { RegisterUser, RegisterExternalUser };
