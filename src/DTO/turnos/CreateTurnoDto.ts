import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateTurnoDto {
  @IsDateString({}, { message: 'La fecha debe ser una fecha válida en formato ISO' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  fecha: string;

  @IsString({ message: 'El motivo debe ser texto' })
  @IsNotEmpty({ message: 'El motivo es obligatorio' })
  motivo: string;

  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId: number;

  @IsString({ message: 'El nombre del veterinario debe ser texto' })
  @IsNotEmpty({ message: 'El veterinario es obligatorio' })
  veterinario: string;

  @IsString({ message: 'El estado debe ser texto' })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['pendiente', 'completado', 'cancelado'], { message: 'El estado debe ser "pendiente", "completado" o "cancelado"' })
  estado: string;
}