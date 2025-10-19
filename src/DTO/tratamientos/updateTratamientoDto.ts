import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTratamientoDto {
  @IsOptional()
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe ser válida en formato ISO' })
  fecha?: string;

  @IsOptional()
  @IsString({ message: 'El diagnóstico debe ser texto' })
  diagnostico?: string;

  @IsOptional()
  @IsString({ message: 'El tratamiento debe ser texto' })
  tratamiento?: string;

  @IsOptional()
  @IsString({ message: 'El veterinario debe ser texto' })
  veterinario?: string;
}