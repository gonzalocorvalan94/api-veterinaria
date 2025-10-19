import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePropietarioDto } from '../DTO/propietarios/CreatePropietarioDto';

@Injectable()
export class PropietarioService {
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
    return data.propietarios;
  }

  propRegister(nuevoPropietario: CreatePropietarioDto) {
    const data = this.leerDB();

    const lastId =
      data.propietarios.length > 0
        ? Math.max(...data.propietarios.map((p) => p.id))
        : 0;

    const newProp = {
      id: lastId + 1,
      nombre: nuevoPropietario.nombre,
      dni: nuevoPropietario.dni,
      telefono: nuevoPropietario.telefono,
      email: nuevoPropietario.email,
      direccion: nuevoPropietario.direccion,
    };

    data.propietarios.push(newProp);
    this.guardarDB(data);

    return newProp;
  }

}
