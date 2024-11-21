import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    VersionColumn,
  } from 'typeorm';
  import { ActiveStatus } from '../enum/enum.config';
  
  export class CustomBaseEntity extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number;
  
      @VersionColumn({
          default: 1,
      })
      version: number;
  
      @Column({
          type: "int",
          name: "is_active",
          enum: ActiveStatus,
          default: `${ActiveStatus.enabled}`,
      })
      isActive: ActiveStatus;
  
      @Column({ type: "int", name: "created_by", nullable: true })
      createdBy: number | null;
  
      @Column({ type: "int", name: "updated_by", nullable: true })
      updatedBy: number | null;
  
      @Column({
          type: "timestamp",
          name: "created_at",
          nullable: true,
      })
      createdAt: Date | null;
  
      @Column({
          type: "timestamp",
          name: "updated_at",
          nullable: true,
      })
      updatedAt: Date | null;
  }