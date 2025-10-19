import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTurnoDto } from 'src/DTO/CreateTurnoDto';

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
}
