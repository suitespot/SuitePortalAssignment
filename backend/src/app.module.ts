import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceService } from './maintenance/maintenance.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceModule } from './maintenance/maintenance.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule global
    }),
    AuthModule, JwtModule, MaintenanceModule, MaintenanceModule],
  controllers: [AppController, MaintenanceController, AuthController],
  providers: [AppService, MaintenanceService, AuthService],
})
export class AppModule {}
