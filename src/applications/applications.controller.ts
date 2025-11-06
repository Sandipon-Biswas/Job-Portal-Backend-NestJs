import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RolesGuard } from '.././common/guards/roles.guard';
import { Roles } from '.././common/decorators/roles.decorator';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly appService: ApplicationsService) {}

  // User applies
  @UseGuards(JwtAuthGuard)
  @Post('apply/:jobId')
  apply(
    @Param('jobId') jobId: string,
    @Req() req: any,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.appService.apply(jobId, req.user.sub, dto);
  }

  // Recruiter views applicants
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Get('job/:jobId')
  applicants(@Param('jobId') jobId: string, @Req() req: any) {
    return this.appService.getApplicants(jobId, req.user.sub);
  }

  // Recruiter updates status
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Req() req: any,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.appService.updateStatus(id, dto, req.user.sub);
  }

  // User sees own applications
  @UseGuards(JwtAuthGuard)
  @Get('me')
  myApps(@Req() req: any) {
    return this.appService.myApps(req.user.sub);
  }
}
