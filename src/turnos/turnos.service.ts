import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTurnoDto } from 'src/DTO/turnos/CreateTurnoDto';
import { UpdateTurnoDto } from 'src/DTO/turnos/UpdateTurnoDto';

@Injectable()
export class TurnosService {
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
    return data.turnos;
  }

  turnoRegister(nuevoTurno: CreateTurnoDto) {
    const data = this.leerDB();

    const mascotaExiste = data.mascotas.some(
      (m) => m.id === nuevoTurno.mascotaId,
    );

    if (!mascotaExiste) {
      throw new BadRequestException(
        `No existe una mascota con id ${nuevoTurno.mascotaId}`,
      );
    }

    const lastId =
      data.turnos.length > 0 ? Math.max(...data.turnos.map((t) => t.id)) : 0;

    const newTurno = {
      id: lastId + 1,
      fecha: nuevoTurno.fecha,
      motivo: nuevoTurno.motivo,
      mascotaId: nuevoTurno.mascotaId,
      veterinario: nuevoTurno.veterinario,
      estado: nuevoTurno.estado,
    };

    data.turnos.push(newTurno);
    this.guardarDB(data);
    return newTurno;
  }

  updateTurno(id: number, actualizarTurno: UpdateTurnoDto) {
    const data = this.leerDB();

    const index = data.turnos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error(`No se encontro el turno con id ${id}`);
    }

    const turnoActualizado = {
      ...data.turnos[index],
      ...actualizarTurno,
      id: id,
    };

    data.turnos[index] = turnoActualizado;

    this.guardarDB(data);

    return turnoActualizado;
  }

  deleteTurno(id: number) {
    const data = this.leerDB();

    const index = data.turnos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `No se pudo encontrar un turno con el id ${id}`,
      );
    }

    const turnoEliminado = data.turnos[index];

    data.turnos.splice(index, 1);

    this.guardarDB(data);

    return turnoEliminado;
  }
}
