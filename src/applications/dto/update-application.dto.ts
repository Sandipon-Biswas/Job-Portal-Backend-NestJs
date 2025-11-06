import { IsString } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsString()
  status: string; // shortlisted, rejected, hired
}
