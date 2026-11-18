export interface Usuario {
  id: number;
  username: string;
  role: string;
}

export interface NuevoUsuario {
  username: string;
  password: string;
  role: string;
}
