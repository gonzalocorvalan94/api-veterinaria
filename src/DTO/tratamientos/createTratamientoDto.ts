import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateTratamientoDto {
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId: number;

  @IsDateString({}, { message: 'La fecha debe ser válida en formato ISO' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  fecha: string;

  @IsString({ message: 'El diagnóstico debe ser texto' })
  @IsNotEmpty({ message: 'El diagnóstico es obligatorio' })
  diagnostico: string;

  @IsString({ message: 'El tratamiento debe ser texto' })
  @IsNotEmpty({ message: 'El tratamiento es obligatorio' })
  tratamiento: string;

  @IsString({ message: 'El veterinario debe ser texto' })
  @IsNotEmpty({ message: 'El veterinario es obligatorio' })
  veterinario: string;
}
