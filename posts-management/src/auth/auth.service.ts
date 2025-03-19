import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminsService } from "../admins/admins.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private adminsService: AdminsService,
        private jwtService: JwtService
      ) {}
    // Verifies if credentials are correct.
      async validateUser(email: string, password: string): Promise<any> {
        const admin = await this.adminsService.findByEmail(email);  
        if (!admin) throw new UnauthorizedException("Invalid email.");
        const isPasswordValid =await bcrypt.compare(password, admin.password);
        if (!isPasswordValid)  throw new UnauthorizedException('Invalid  password');
        return admin
      }
    
      async login(email: string, password: string) {
        const admin = await this.validateUser(email, password);

        const payload = { email: admin.email, sub: admin.id };
        return {
          access_token: this.jwtService.sign(payload), // Generate JWT token
        };
      }
}

