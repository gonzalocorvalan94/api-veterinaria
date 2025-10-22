import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePropietarioDto } from '../DTO/propietarios/CreatePropietarioDto';
import { UpdatePropietarioDto } from 'src/DTO/propietarios/UpdatePropietarioDto';

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

    const existeDni = data.propietarios.some(
      (p) => p.dni === nuevoPropietario.dni,
    );

    if (existeDni) {
      throw new BadRequestException(
        `Ya existe un propietario con el DNI ${nuevoPropietario.dni}`,
      );
    }

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

  updatePropietario(id: number, propietarioUpdate: CreatePropietarioDto) {
    const data = this.leerDB();

    const index = data.propietarios.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }

    const propietarioActualizado: any = {
      id,
      nombre: propietarioUpdate.nombre,
      dni: propietarioUpdate.dni,
      telefono: propietarioUpdate.telefono,
      email: propietarioUpdate.email,
      direccion: propietarioUpdate.direccion,
    };

    data.propietarios[index] = propietarioActualizado;

    this.guardarDB(data);

    return propietarioActualizado;
  }

  deletePropietario(id: number) {
    const data = this.leerDB();

    const index = data.propietarios.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`El propietario con id ${id} no existe`);
    }

    const propietarioEliminado = data.propietarios[index];

    data.propietarios.splice(index, 1);

    this.guardarDB(data);

    return propietarioEliminado;
  }
}
