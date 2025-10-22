import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasController } from './mascotas/mascotas.controller';
import { PropietarioController } from './propietarios/propietarios.controller';
import { PropietarioService } from './propietarios/propietarios.service';
import { TurnosService } from './turnos/turnos.service';
import { TurnosController } from './turnos/turnos.controller';
import { TratamientosService } from './tratamientos/tratamientos.service';
import { TratamientosController } from './tratamientos/tratamientos.controller';
import { VacunasService } from './vacunas/vacunas.service';
import { VacunasController } from './vacunas/vacunas.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    MascotasController,
    PropietarioController,
    TurnosController,
    TratamientosController,
    VacunasController,
  ],
  providers: [
    AppService,
    MascotasService,
    PropietarioService,
    TurnosService,
    TratamientosService,
    VacunasService,
  ],
})
export class AppModule {}
