import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePetDto } from 'src/DTO/mascotas/CreatePetDto';
import { UpdatePetDto } from 'src/DTO/mascotas/UpdatePetDto';

@Injectable()
export class MascotasService {
  private dbPath = path.join('src/db/db.json');

  private leerDB() {
    const data = fs.readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  private guardarDB(db: any[]) {
    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  }

  getAll() {
    const data = this.leerDB();
    return data.mascotas;
  }

  getById(id: number) {
    const data = this.leerDB();

    const mascota = data.mascotas.find((m) => m.id === id);

    if (!mascota) {
      throw new NotFoundException(`La mascota con el id ${id} no existe`);
    }

    return mascota;
  }

  petRegister(nuevaMascota: CreatePetDto) {
    const data = this.leerDB();

    const lastId =
      data.mascotas.length > 0
        ? Math.max(...data.mascotas.map((m) => m.id))
        : 0;

    const newPet = {
      id: lastId + 1,
      nombre: nuevaMascota.nombre,
      especie: nuevaMascota.especie,
      raza: nuevaMascota.raza,
      edad: nuevaMascota.edad,
      genero: nuevaMascota.genero,
      propietarioId: nuevaMascota.propietarioId,
    };

    data.mascotas.push(newPet);
    this.guardarDB(data);

    return newPet;
  }

  updatePet(id: number, mascotaActualizada: UpdatePetDto) {
    const data = this.leerDB();

    const index = data.mascotas.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException(`La mascota con el id ${id} no existe`);
    }

    const mascotaUpdate = {
      ...data.mascotas[index],
      ...mascotaActualizada,
      id,
    };

    data.mascotas[index] = mascotaUpdate;

    this.guardarDB(data);

    return mascotaUpdate;
  }

  deletePet(id: number) {
    const data = this.leerDB();

    const index = data.mascotas.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException(`La mascota con id ${id} no existe`);
    }

    const mascotaEliminada = data.mascotas[index];

    data.mascotas.splice(index, 1);

    this.guardarDB(data);

    return mascotaEliminada;
  }
}
