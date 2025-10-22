import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreatePetDto } from 'src/DTO/mascotas/CreatePetDto';
import { UpdatePetDto } from 'src/DTO/mascotas/UpdatePetDto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  getAll() {
    return this.mascotasService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.mascotasService.getById(id);
  }

  @Post()
  create(@Body() nuevaMascota: CreatePetDto) {
    return this.mascotasService.petRegister(nuevaMascota);
  }

  @Put(':id')
  updatePet(@Param('id') id: number, actualizarMascota: UpdatePetDto) {
    return this.mascotasService.updatePet(id, actualizarMascota);
  }

  @Delete(':id')
  deletePet(@Param('id') id: number) {
    return this.mascotasService.deletePet(id);
  }
}
