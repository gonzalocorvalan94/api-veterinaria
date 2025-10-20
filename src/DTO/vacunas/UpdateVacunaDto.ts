import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateVacunaDto {
  @IsOptional()
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId?: number;

  @IsOptional()
  @IsString({ message: 'El nombre de la vacuna debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de la vacuna no puede estar vacío' })
  nombre?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de aplicación debe ser una fecha válida en formato ISO (YYYY-MM-DD)' })
  fechaAplicacion?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La próxima aplicación debe ser una fecha válida en formato ISO (YYYY-MM-DD)' })
  proximaAplicacion?: string;
}
