import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS for the frontend
   app.enableCors({
    origin: 'http://localhost:3001', // URL of the frontend
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
