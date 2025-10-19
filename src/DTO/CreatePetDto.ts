import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePetDto {
  @IsString({message: 'El nombre debe ser texto'})
  @IsNotEmpty({message: 'El nombre es obligatorio'})
  @Transform(({value}) => value.trim().toLowerCase())
  nombre: string;

  @IsString()
  @IsNotEmpty({message: 'La especie es obligatoria'})
  @Transform(({value}) => value.trim().toLowerCase()) 
  especie: string;

  @IsString() 
  @IsNotEmpty({message: 'La raza es obligatoria'})
  @Transform(({value}) => value.trim().toLowerCase())
  raza: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor que 0' })
  @IsNotEmpty({message: 'La edad es obligatoria'})
  edad: number;
  
  
  @IsString({message: 'El nombre debe ser texto'})
  @IsNotEmpty({message: 'El genero es obligatorio'})
  @Transform(({value}) => value.trim().toLowerCase())
  genero: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor que 0' })
  @IsNotEmpty({message: 'Este campo es obligatorio'})
  propietarioId: number;
}

