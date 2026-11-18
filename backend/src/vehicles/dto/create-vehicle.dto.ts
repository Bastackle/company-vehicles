import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import type { VehicleStatus } from '../entities/vehicle.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุทะเบียนรถ' })
  @MaxLength(32)
  @ApiProperty({ type: String })
  carNumber!: string;

  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุยี่ห้อรถ' })
  @MaxLength(100)
  @ApiProperty({ type: String })
  carBrand!: string;

  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุรุ่นรถ' })
  @MaxLength(100)
  @ApiProperty({ type: String })
  carModel!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1950)
  @Max(2100)
  @ApiPropertyOptional({ type: Number })
  year?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({ type: String })
  color?: string;

  @IsOptional()
  @IsIn(['AVAILABLE', 'IN_USE', 'MAINTENANCE'])
  @ApiPropertyOptional({
    type: String,
    enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE'],
  })
  status?: VehicleStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  note?: string;
}
