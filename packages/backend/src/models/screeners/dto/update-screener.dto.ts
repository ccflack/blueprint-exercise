import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenerDto } from './create-screener.dto';

export class UpdateScreenerDto extends PartialType(CreateScreenerDto) {}
