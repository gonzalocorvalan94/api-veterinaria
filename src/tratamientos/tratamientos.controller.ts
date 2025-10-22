import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { CreateTratamientoDto } from 'src/DTO/tratamientos/createTratamientoDto';
import { UpdateTratamientoDto } from 'src/DTO/tratamientos/updateTratamientoDto';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly TratamientosService: TratamientosService) {}

  @Get()
  getAll() {
    return this.TratamientosService.getAll();
  }

  @Get(':id')
  getHistorial(@Param('id') id: number) {
    return this.TratamientosService.getHistorial(id);
  }

  @Post()
  create(@Body() nuevoTratamiento: CreateTratamientoDto) {
    return this.TratamientosService.createTratamiento(nuevoTratamiento);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTratamiento: CreateTratamientoDto,
  ) {
    return this.TratamientosService.updateTratamiento(id, updateTratamiento);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.TratamientosService.deleteTratamiento(id);
  }
}
