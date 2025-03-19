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
        console.log("Admin object:", admin);
      
        if (!admin) {
          // If admin is null, throw an error
          throw new UnauthorizedException("Invalid email.");
        }
      
        console.log("admin role:", admin.role); // Now TypeScript knows admin is not null
      
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password');
        }
        return admin ;
      }
    
      async login(email: string, password: string) {
        const admin = await this.validateUser(email, password);
        console.log("role admin:", admin.role)

        const payload = { email: admin.email, role:admin.role };
        return {
          access_token: this.jwtService.sign(payload), // Generate JWT token
        };
      }
}

