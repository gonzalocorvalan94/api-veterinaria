import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePropietarioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Transform(({ value }) => value.trim().toLowerCase())
  nombre: string;

  @IsString({ message: 'El DNI debe ser texto' })
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MinLength(5, { message: 'El DNI debe tener al menos 5 números' })
  @Matches(/^\d+$/, { message: 'El DNI solo puede contener números' })
  dni: string;

  @MinLength(5, { message: 'El telefono debe tener minimo 5 numeros' })
  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  telefono: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @IsNotEmpty({ message: 'La direccion es obligatoria' })
  @MinLength(5, { message: 'La direccion debe tener 5 caracteres o mas' })
  @Transform(({ value }) => value.trim().toLowerCase())
  direccion: string;
}
