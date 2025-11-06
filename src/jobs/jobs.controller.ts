import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RolesGuard } from '.././common/guards/roles.guard';
import { Roles } from '.././common/decorators/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Recruiter creates job
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Post()
  create(@Req() req: any, @Body() dto: CreateJobDto) {
    return this.jobsService.create(dto, req.user.sub);
  }

  // Public list
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // Public get job by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  // Recruiter updates own job
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJobDto, @Req() req: any) {
    return this.jobsService.update(id, dto, req.user.sub);
  }

  // Recruiter/Admin delete
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.jobsService.remove(id, req.user.sub, req.user.role === 'admin');
  }
}
