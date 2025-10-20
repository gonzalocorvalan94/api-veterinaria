import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreatePetDto } from 'src/DTO/mascotas/CreatePetDto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService){}

  @Get()
  getAll(){
    return this.mascotasService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number){
    return this.mascotasService.getById(id)
  }

  @Post()
  create(@Body() nuevaMascota: CreatePetDto) {
    return this.mascotasService.petRegister(nuevaMascota);
  }
}
