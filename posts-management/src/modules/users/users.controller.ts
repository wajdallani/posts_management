import { Controller, Get,Param,Post,Body,Patch, Delete, Query, ParseIntPipe,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}
    //GET /users or /user?role=value&age=value
    @Get()
    findAll(@Query('role')role?:'POSTER' |'ADMIN'){
        return this.usersService.findAll(role)
    }

    // GET suers/:id
    @Get(':id')
    findOne(@Param ('id',ParseIntPipe)id: number){ 
        return this.usersService.findOne(id) //unary plus ==converts strign to number
    }

    //POST /users
    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto){
        return this.usersService.create(user)
    }

    //PATCH - PUT /users/:id
    @Patch (':id')
    update(@Param('id', ParseIntPipe) id:number , @Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.usersService.update(id, userUpdate)
    }

    //DELETE 
    @Delete(':id')
    delete(@Param('id' , ParseIntPipe) id:number){
        return this.usersService.delete(id)
    }
}

