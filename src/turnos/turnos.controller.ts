import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from '../DTO/turnos/CreateTurnoDto';
import { UpdateTurnoDto } from 'src/DTO/turnos/UpdateTurnoDto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  getAll() {
    return this.turnosService.getAll();
  }

  @Post()
  create(@Body() nuevoTurno: CreateTurnoDto) {
    return this.turnosService.turnoRegister(nuevoTurno);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() actualizarTurno : UpdateTurnoDto){
    return this.turnosService.updateTurno(id, actualizarTurno)
  }

  @Delete(':id')
  delete(@Param('id') id:number){
    return this.turnosService.deleteTurno(id)
  }
}

