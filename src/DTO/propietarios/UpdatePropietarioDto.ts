import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePropietarioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  nombre?: string;

  @IsInt({ message: 'El DNI debe ser un número entero' })
  @IsOptional()
  dni?: number;

  @IsString({ message: 'El teléfono debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  telefono?: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @IsOptional()
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  direccion?: string;
}
