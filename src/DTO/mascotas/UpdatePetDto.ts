import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePetDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  nombre?: string;

  @IsString({ message: 'La especie debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  especie?: string;

  @IsString({ message: 'La raza debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  raza?: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor que 0' })
  @IsOptional()
  edad?: number;

  @IsString({ message: 'El género debe ser texto' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  genero?: string;

  @IsInt({ message: 'El propietarioId debe ser un número entero' })
  @Min(1, { message: 'El propietarioId debe ser mayor que 0' })
  @IsOptional()
  propietarioId?: number;
}
