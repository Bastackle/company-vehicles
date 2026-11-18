import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'car_number', type: 'varchar', length: 32, unique: true })
  carNumber!: string;

  @Column({ name: 'car_brand', type: 'varchar', length: 100 })
  carBrand!: string;

  @Column({ name: 'car_model', type: 'varchar', length: 100 })
  carModel!: string;

  @Column({ type: 'integer', nullable: true })
  year!: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color!: string | null;

  @Column({ type: 'varchar', length: 30, default: 'AVAILABLE' })
  status!: VehicleStatus;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
