import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './admins/admins.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, DatabaseModule, AdminsModule, AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
