import { Injectable ,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users=[
        {
            "id":1,
            "name": "wajed allani",
            "email":"allaniwajd@gmail.com",
            "role":"ADMIN"
        },
        {
            "id":2,
            "name": "kim vu",
            "email":"kimvud@gmail.com",
            "role":"POSTER"
        },
        {
            "id":3,
            "name": "layane",
            "email":"layane@gmail.com",
            "role":"POSTER"
        },
    ]

    findAll(role?: 'POSTER' |'ADMIN'){
        if (role){
            const rolesArray= this.users.filter(user=> user.role ===role)
            if (rolesArray.length ===0) throw new NotFoundException ('Role not found')
            return rolesArray   
        
        }

        return this.users
    }

    findOne(id:number){
        const user=this.users.find(user=> user.id ===id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    create(user:CreateUserDto){
        const usersByHighestId=[...this.users].sort((a,b)=>b.id-a.id)
        const newUser={
            id:usersByHighestId[0].id+1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id:number, updateedUser:UpdateUserDto){
        this.users=this.users.map(user=>{
            if(user.id===id){
                return{...user,...updateedUser}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id:number){
        const removedUser= this.findOne(id)
        this.users=this.users.filter(user=>user.id !==id)
        return removedUser
    }
}
