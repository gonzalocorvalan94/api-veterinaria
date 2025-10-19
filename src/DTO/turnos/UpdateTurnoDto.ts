import { IsDateString, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateTurnoDto {
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe ser una fecha válida en formato ISO' })
  fecha?: string;

  @IsOptional()
  @IsString({ message: 'El motivo debe ser texto' })
  motivo?: string;

  @IsOptional()
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId?: number;

  @IsOptional()
  @IsString({ message: 'El nombre del veterinario debe ser texto' })
  veterinario?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser texto' })
  @IsIn(['pendiente', 'completado', 'cancelado'], { message: 'El estado debe ser "pendiente", "completado" o "cancelado"' })
  estado?: string;
}