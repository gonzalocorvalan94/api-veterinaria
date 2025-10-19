import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasController } from './mascotas/mascotas.controller';
import { PropietarioController } from './propietario/propietario.controller';
import { PropietarioService } from './propietario/propietario.service';
import { TurnosService } from './turnos/turnos.service';
import { TurnosController } from './turnos/turnos.controller';
import { TratamientosService } from './tratamientos/tratamientos.service';
import { TratamientosController } from './tratamientos/tratamientos.controller';

@Module({
  imports: [],
  controllers: [AppController, MascotasController, PropietarioController, TurnosController, TratamientosController],
  providers: [AppService, MascotasService, PropietarioService, TurnosService, TratamientosService],
})
export class AppModule {}
