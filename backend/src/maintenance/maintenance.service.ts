import { Injectable, NotFoundException } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as uuid from 'uuid';
import { CreateMaintenanceRequestDto, Status } from './dto/maintenance-request.dto'

@Injectable()
export class MaintenanceService {
    private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    const adapter = new FileAsync('maintenance-db.json');
    this.db = await lowdb(adapter);
    const maintenanceRequests = await this.db.get('maintenanceRequests').value();
    if (!maintenanceRequests) {
      await this.db.set('maintenanceRequests', []).write();
    }
  }

  async addMaintenanceRequest(createMaintenanceRequestDto: CreateMaintenanceRequestDto): Promise<any> {
    const maintenanceRequests = await this.db.get('maintenanceRequests').value();
    const newRequest = {
      id: uuid.v1(),
      ...createMaintenanceRequestDto,
      status: Status.OPEN,  // Set default status to Open
      createdAt: new Date(),
    };
    maintenanceRequests.push(newRequest);
    await this.db.set('maintenanceRequests', maintenanceRequests).write();
    return newRequest;
  }

  async getAllMaintenanceRequests(): Promise<any[]> {
    return await this.db.get('maintenanceRequests').value();
  }

  async getMaintenanceRequestById(id: string): Promise<any> {
    const request = await this.db.get('maintenanceRequests').find({ id }).value();
    if (!request) {
      throw new NotFoundException(`Maintenance request with ID ${id} not found`);
    }
    return request;
  }

  async closeMaintenanceRequest(id: string): Promise<any> {
    const maintenanceRequests = await this.db.get('maintenanceRequests').value();
    const requestIndex = maintenanceRequests.findIndex((req) => req.id === id);
    if (requestIndex === -1) {
      throw new NotFoundException(`Maintenance request with ID ${id} not found`);
    }
    maintenanceRequests[requestIndex].status = Status.CLOSED;
    await this.db.set('maintenanceRequests', maintenanceRequests).write();
    return maintenanceRequests[requestIndex];
  }
}
