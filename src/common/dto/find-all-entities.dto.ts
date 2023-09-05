import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { Order } from '../constants';

export default class FindAllEntitiesDto {
  @ApiProperty({ example: 5, required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
    take: number = 20;

  @ApiProperty({ example: 0, required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
    page: number = 1;

  @ApiProperty({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
    order: Order = Order.ASC;
}
