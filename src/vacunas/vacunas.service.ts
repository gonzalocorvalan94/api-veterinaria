import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateVacunaDto } from 'src/DTO/vacunas/CreateVacunaDto';
import { UpdateVacunaDto } from 'src/DTO/vacunas/UpdateVacunaDto';

@Injectable()
export class VacunasService {
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
    return data.vacunas;
  }

  createVacuna(nuevaVacuna: CreateVacunaDto) {
    const data = this.leerDB();

    const mascotaExiste = data.mascotas.some(
      (m) => m.id === nuevaVacuna.mascotaId,
    );
    if (!mascotaExiste) {
      throw new BadRequestException(
        `No existe una mascota con id ${nuevaVacuna.mascotaId}`,
      );
    }

    const fechaAplicacion = new Date(nuevaVacuna.fechaAplicacion);
    const proximaAplicacion = new Date(nuevaVacuna.proximaAplicacion);
    const ahora = new Date();

    if (fechaAplicacion > ahora) {
      throw new BadRequestException(
        `La fecha de aplicación no puede ser futura`,
      );
    }

    if (proximaAplicacion <= ahora) {
      throw new BadRequestException(
        `La próxima aplicación debe ser una fecha futura`,
      );
    }

    const lastId =
      data.vacunas.length > 0 ? Math.max(...data.vacunas.map((v) => v.id)) : 0;

    const newVacuna = {
      id: lastId + 1,
      mascotaId: nuevaVacuna.mascotaId,
      nombre: nuevaVacuna.nombre,
      fechaAplicacion: nuevaVacuna.fechaAplicacion,
      proximaAplicacion: nuevaVacuna.proximaAplicacion,
    };

    data.vacunas.push(newVacuna);
    this.guardarDB(data);
    return newVacuna;
  }

  updateVacuna(id: number, updateVacuna: CreateVacunaDto) {
    const data = this.leerDB();

    const index = data.vacunas.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new NotFoundException(`No se encontró una vacuna con el id ${id}`);
    }

    const mascotaExiste = data.mascotas.some(
      (m) => m.id === updateVacuna.mascotaId,
    );
    if (!mascotaExiste) {
      throw new BadRequestException(
        `No existe una mascota con id ${updateVacuna.mascotaId}`,
      );
    }

    const fechaAplicacion = new Date(updateVacuna.fechaAplicacion);
    const proximaAplicacion = new Date(updateVacuna.proximaAplicacion);
    const ahora = new Date();

    if (fechaAplicacion > ahora) {
      throw new BadRequestException(
        `La fecha de aplicación no puede ser futura`,
      );
    }
    if (proximaAplicacion <= ahora) {
      throw new BadRequestException(
        `La próxima aplicación debe ser una fecha futura`,
      );
    }

    const vacunaActualizada = {
      id,
      mascotaId: updateVacuna.mascotaId,
      nombre: updateVacuna.nombre,
      fechaAplicacion: updateVacuna.fechaAplicacion,
      proximaAplicacion: updateVacuna.proximaAplicacion,
    };

    data.vacunas[index] = vacunaActualizada;
    this.guardarDB(data);

    return vacunaActualizada;
  }

  deleteVacuna(id: number) {
    const data = this.leerDB();

    const index = data.vacunas.findIndex((v) => v.id === id);

    const vacunaEliminada = data.vacunas[index];

    data.vacunas.splice(index, 1);

    this.guardarDB(data);

    return vacunaEliminada;
  }
}
