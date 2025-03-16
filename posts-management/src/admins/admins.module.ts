import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports:[DatabaseModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
