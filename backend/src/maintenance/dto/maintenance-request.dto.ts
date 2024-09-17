// create-maintenance-request.dto.ts
import { IsNotEmpty, IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';

// Enum for ServiceType
export enum ServiceType {
  PLUMBING = 'Plumbing',
  ELECTRICAL = 'Electrical',
  HVAC = 'HVAC',
  CLEANING = 'Cleaning',
  OTHER = 'Other',
}

// Enum for Status
export enum Status {
  OPEN = 'Open',
  CLOSED = 'Closed',
}

export class CreateMaintenanceRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;  // Name of the requester

  @IsNotEmpty()
  @IsEmail()
  email: string;  // Email of the requester

  @IsNotEmpty()
  @IsString()
  unitNumber: string;  // The unit # in the building

  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;  // The type of service being requested

  @IsNotEmpty()
  @IsString()
  summary: string;  // A summary of the issue

  @IsOptional()
  @IsString()
  details?: string;  // Any extra details (optional)
}