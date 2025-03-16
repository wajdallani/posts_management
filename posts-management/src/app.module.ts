import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './admins/admins.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UsersModule, DatabaseModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
