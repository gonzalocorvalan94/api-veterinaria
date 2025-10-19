import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasController } from './mascotas/mascotas.controller';
import { PropietarioController } from './propietario/propietario.controller';
import { PropietarioService } from './propietario/propietario.service';
import { TurnosService } from './turnos/turnos.service';
import { TurnosController } from './turnos/turnos.controller';

@Module({
  imports: [],
  controllers: [AppController, MascotasController, PropietarioController, TurnosController],
  providers: [AppService, MascotasService, PropietarioService, TurnosService],
})
export class AppModule {}
