import { IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  coverLetter?: string;
}
