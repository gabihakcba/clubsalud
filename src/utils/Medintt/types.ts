export interface CreateBorrowerEmployee {
  Id: number
  Apellido: string
  Nombre: string
  NroDocumento: string
  FechaNacimiento: Date
  Direccion: string
  Barrio: string
  Id_Localidad: number
  Telefono: string
  Celular1: string
  Email: string
  Genero: string
  Cargo: string
  Puesto: string
  Funcion: string
  Id_Prestataria: number
  FamRespo_Nombre?: string
  FamRespo_Relacion?: string
  FamRespo_Telefono?: string
  FamRespo_Celular?: string
  FamRespo_Email?: string
}

export interface BorrowerEmployee {
  Id: number
  Apellido: string
  Nombre: string
  DNI: number
  Celular1: string
  FechaNacimiento: Date
  Email: string
  Genero: string
  Cargo: string
  Puesto: string
  Funcion: string
}

export type UpdateBorrowerEmployee = Partial<BorrowerEmployee>
