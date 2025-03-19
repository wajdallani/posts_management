import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcryptjs";


@Injectable()
export class AdminsService {
  constructor(private readonly databaseService:DatabaseService){}
//POST 
async create(createAdminDto: Prisma.AdminCreateInput) {
  const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
  return this.databaseService.admin.create({
    data: {
      name: createAdminDto.name,
      email: createAdminDto.email,
      password:hashedPassword,
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


  //GET BY EMAIL
  async findByEmail(email: string) {
    return this.databaseService.admin.findUnique({ where: { email } });
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
