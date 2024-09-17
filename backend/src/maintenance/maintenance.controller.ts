import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMaintenanceRequestDto } from './dto/maintenance-request.dto';
import { MaintenanceService } from './maintenance.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('maintenance')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post('request')
  async createMaintenanceRequest(@Body() createMaintenanceRequestDto: CreateMaintenanceRequestDto) {
    return this.maintenanceService.addMaintenanceRequest(createMaintenanceRequestDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMaintenanceRequests() {
    return this.maintenanceService.getAllMaintenanceRequests();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMaintenanceRequestById(@Param('id') id: string) {
    return this.maintenanceService.getMaintenanceRequestById(id);
  }

  @Put('close/:id')
  @UseGuards(JwtAuthGuard)
  async closeMaintenanceRequest(@Param('id') id: string) {
    return this.maintenanceService.closeMaintenanceRequest(id);
  }
}
