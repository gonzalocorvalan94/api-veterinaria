import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTratamientoDto } from 'src/DTO/tratamientos/createTratamientoDto';
import { UpdateTratamientoDto } from 'src/DTO/tratamientos/updateTratamientoDto';

@Injectable()
export class TratamientosService {
  private dbPath = path.join('src/db/db.json');

  private leerDB() {
    const data = fs.readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  private guardarDB(db: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  }

  getAll() {
    const data = this.leerDB();

    return data.tratamientos;
  }

  getHistorial(id: number) {
    const data = this.leerDB();

    const historial = data.tratamientos.filter((m) => m.mascotaId === id);

    if (historial.length === 0) {
      throw new NotFoundException(`La mascota que esta consultando no existe`);
    }

    return historial;
  }

  createTratamiento(nuevoTratamiento: CreateTratamientoDto) {
    const data = this.leerDB();

    const mascotaExiste = data.mascotas.some(
      (m) => m.id === nuevoTratamiento.mascotaId,
    );

    if (!mascotaExiste) {
      throw new BadRequestException(
        `No existe una mascota con el id ${nuevoTratamiento.mascotaId}`,
      );
    }

    const lastId =
      data.tratamientos.length > 0
        ? Math.max(...data.tratamientos.map((t) => t.id))
        : 0;

    const newTratamiento = {
      id: lastId + 1,
      mascotaId: nuevoTratamiento.mascotaId,
      fecha: nuevoTratamiento.fecha,
      diagnostico: nuevoTratamiento.diagnostico,
      tratamiento: nuevoTratamiento.tratamiento,
      veterinario: nuevoTratamiento.veterinario,
    };

    data.tratamientos.push(newTratamiento);

    this.guardarDB(data);

    return newTratamiento;
  }

  updateTratamiento(id: number, tratamientoActualizado: UpdateTratamientoDto) {
    const data = this.leerDB();

    const index = data.tratamientos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new NotFoundException(`El tratamiento con id ${id} no existe`);
    }

    const tratamientoUpdate = {
      ...data.tratamientos[index],
      ...tratamientoActualizado,
      id,
    };

    data.tratamientos[index] = tratamientoUpdate;

    this.guardarDB(data);

    return tratamientoUpdate;
  }

  deleteTratamiento(id: number) {
    const data = this.leerDB();

    const index = data.tratamientos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    const tratamientoEliminado = data.tratamientos[index];

    data.tratamientos.splice(index, 1);

    this.guardarDB(data);

    return tratamientoEliminado;
  }
}
