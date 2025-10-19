import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


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

  petRegister(nuevaMascota: any){
    const data = this.leerDB();

    const lastId = data.mascotas.length > 0 ? Math.max(...data.mascotas.map(m => m.id)) : 0;

    const newPet = {
      id: lastId +1,
      nombre: nuevaMascota.nombre,
      especie: nuevaMascota.especie,
      raza: nuevaMascota.raza,
      edad: nuevaMascota.edad,
      genero: nuevaMascota.genero,
      propietarioId: nuevaMascota.propietarioId
    }

    data.mascotas.push(newPet);
    this.guardarDB(data);

    return newPet;

  }
}
