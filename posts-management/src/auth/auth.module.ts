import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminsService } from "../admins/admins.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { DatabaseModule } from "../database/database.module";
import * as dotenv from 'dotenv';
dotenv.config()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET_KEY,
      signOptions: { expiresIn: "1h" }, // Token expires in 1 hour
    }),
    DatabaseModule,
  ],
  providers: [AuthService, AdminsService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
