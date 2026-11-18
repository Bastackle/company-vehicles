import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { QueryVehicleDto } from './dto/query-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const normalizedNumber = createVehicleDto.carNumber.trim();

    const existing = await this.vehicleRepo.findOne({
      where: { carNumber: normalizedNumber },
    });

    if (existing) {
      throw new ConflictException(
        `ทะเบียนรถ "${normalizedNumber}" มีอยู่ในระบบแล้ว`,
      );
    }

    const vehicle = this.vehicleRepo.create({
      ...createVehicleDto,
      carNumber: normalizedNumber,
      carBrand: createVehicleDto.carBrand.trim(),
      carModel: createVehicleDto.carModel.trim(),
      status: createVehicleDto.status || 'AVAILABLE',
    });

    return this.vehicleRepo.save(vehicle);
  }

  async findAll(
    query: QueryVehicleDto,
  ): Promise<{ data: Vehicle[]; meta: any }> {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;

    const queryBuilder = this.vehicleRepo.createQueryBuilder('vehicle');
    if (query.search && query.search.trim() !== '') {
      const keyword = `%${query.search.trim()}%`;
      queryBuilder.where(
        'vehicle.carNumber ILIKE :keyword OR vehicle.carBrand ILIKE :keyword OR vehicle.carModel ILIKE :keyword',
        { keyword },
      );
    }

    queryBuilder.orderBy('vehicle.id', 'DESC').skip(skip).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`ไม่พบข้อมูลรถยนต์รหัส ${id}`);
    }
    return vehicle;
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    if (!vehicle) {
      throw new NotFoundException(`ไม่พบข้อมูลรถยนต์รหัส ${id}`);
    }

    if (
      updateVehicleDto.carNumber &&
      updateVehicleDto.carNumber.trim() !== vehicle.carNumber
    ) {
      const normalizedNumber = updateVehicleDto.carNumber.trim();
      const existing = await this.vehicleRepo.findOne({
        where: { carNumber: normalizedNumber },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException(
          `ทะเบียนรถ "${normalizedNumber}" มีอยู่ในระบบแล้ว`,
        );
      }
      vehicle.carNumber = normalizedNumber;
    }

    if (updateVehicleDto.carBrand !== undefined)
      vehicle.carBrand = updateVehicleDto.carBrand.trim();
    if (updateVehicleDto.carModel !== undefined)
      vehicle.carModel = updateVehicleDto.carModel.trim();
    if (updateVehicleDto.year !== undefined)
      vehicle.year = updateVehicleDto.year;
    if (updateVehicleDto.color !== undefined)
      vehicle.color = updateVehicleDto.color;
    if (updateVehicleDto.status !== undefined)
      vehicle.status = updateVehicleDto.status;
    if (updateVehicleDto.note !== undefined)
      vehicle.note = updateVehicleDto.note;

    return this.vehicleRepo.save(vehicle);
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const vehicle = await this.findOne(id);
    if (!vehicle) {
      throw new NotFoundException(`ไม่พบข้อมูลรถยนต์รหัส ${id}`);
    }
    await this.vehicleRepo.remove(vehicle);
    return { deleted: true, id };
  }
}
