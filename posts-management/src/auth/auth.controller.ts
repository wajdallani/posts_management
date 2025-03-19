import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //login endpoint //POST
    @Post('login')
    login(@Body() req){
        return this.authService.login(req.email,req.password);

    }
}
