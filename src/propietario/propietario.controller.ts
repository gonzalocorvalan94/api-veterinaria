import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { CreatePropietarioDto } from 'src/DTO/propietarios/CreatePropietarioDto';
import { UpdatePropietarioDto } from 'src/DTO/propietarios/UpdatePropietarioDto';

@Controller('propietario')
export class PropietarioController {
  constructor(private readonly propietarioService: PropietarioService) {}

  @Get()
  getAll() {
    return this.propietarioService.getAll();
  }

  @Post()
  create(@Body() nuevoPropietario: CreatePropietarioDto) {
    return this.propietarioService.propRegister(nuevoPropietario);
  }

  @Put(':id')
  propietarioUpdate(@Param('id') id:number, propietarioActualizado: UpdatePropietarioDto){
    return this.propietarioService.updatePropietario(id, propietarioActualizado)
  }

  @Delete(':id')
  deletePropietario(@Param('id') id:number){
    return this.propietarioService.deletePropietario(id)
  }

}
