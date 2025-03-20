import {UseGuards ,Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admins')
@Roles('ADMIN') 
@UseGuards(JwtAuthGuard, RolesGuard)// Only allow users with 'admin' role
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: Prisma.AdminCreateInput) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @Roles('ADMIN') // Only allow users with 'admin' role
  findAll(@Query('role') role?: 'ADMIN' | 'POSTER') {

    return this.adminsService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: Prisma.AdminUpdateInput) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
