import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { CreateVacunaDto } from 'src/DTO/vacunas/CreateVacunaDto';
import { UpdateVacunaDto } from 'src/DTO/vacunas/UpdateVacunaDto';

@Controller('vacunas')
export class VacunasController {
  constructor(private readonly VacunasService: VacunasService) {}

  @Get()
  getAll() {
    return this.VacunasService.getAll();
  }

  @Post()
  createVacunas(@Body() nuevaVacuna: CreateVacunaDto) {
    return this.VacunasService.createVacuna(nuevaVacuna);
  }

  @Put('id')
  updateVacuna(@Param(':id') id:number, @Body() updateVacuna: UpdateVacunaDto){
    return this.VacunasService.updateVacuna(id, updateVacuna)
  }

  @Delete('id')
  deleteVacuna(@Param(':id') id:number){
    return this.VacunasService.deleteVacuna(id)
  }
}
