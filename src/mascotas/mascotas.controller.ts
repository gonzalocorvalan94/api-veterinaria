import { Body, Controller, Get, Post } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreatePetDto } from 'src/DTO/CreatePetDto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService){}

  @Get()
  getAll(){
    return this.mascotasService.getAll();
  }

  @Post()
  create(@Body() nuevaMascota: CreatePetDto) {
    return this.mascotasService.petRegister(nuevaMascota);
  }
}
