import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminsService {
  constructor(private readonly databaseService:DatabaseService){}
//POST 
async create(createAdminDto: Prisma.AdminCreateInput) {
  return this.databaseService.admin.create({
    data: {
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: createAdminDto.password,
      role: createAdminDto.role,
    }
  });
}

//GET ALL
  async findAll(role?: 'ADMIN' | 'POSTER') {
    if (role)
      return this.databaseService.admin.findMany({
        where:{
          role,
        }
      })
    return this.databaseService.admin.findMany()
  }
//GET BY ID
  async findOne(id: number) {
    return this.databaseService.admin.findUnique({
      where:{id,}
    });
  }

  //UPDATE
  async update(id: number, updateAdminDto: Prisma.AdminUpdateInput) {
    return this.databaseService.admin.update({
      where:{id,},
      data:updateAdminDto
    });  }
//DELETE
  async remove(id: number) {
    return this.databaseService.admin.delete({
      where:{id,}
    });
  }
}
