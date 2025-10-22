import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateVacunaDto {
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId: number;

  @IsString({ message: 'El nombre de la vacuna debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de la vacuna es obligatorio' })
  nombre: string;

  @IsDateString({}, { message: 'La fecha de aplicación debe ser una fecha válida en formato ISO (YYYY-MM-DD)' })
  
  @IsNotEmpty({ message: 'La fecha de aplicación es obligatoria' })
  fechaAplicacion: string;

  @IsDateString({}, { message: 'La próxima aplicación debe ser una fecha válida en formato ISO (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La próxima aplicación es obligatoria' })
  proximaAplicacion: string;
}