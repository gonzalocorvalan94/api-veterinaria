import { Body, Controller, Get, Post } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from '../DTO/CreateTurnoDto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService){}

  @Get()
  getAll(){
    return this.turnosService.getAll();
  }

  @Post()
  create(@Body() nuevoTurno: CreateTurnoDto){
    return this.turnosService.turnoRegister(nuevoTurno);
  }
}
