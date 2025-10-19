import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { CreatePropietarioDto } from 'src/DTO/propietarios/CreatePropietarioDto';

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

}
