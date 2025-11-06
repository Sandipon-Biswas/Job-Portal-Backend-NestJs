import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application.dto';
import { JobsService } from '../jobs/jobs.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private appModel: Model<ApplicationDocument>,
    private jobsService: JobsService,
    private usersService: UsersService,
  ) {}

  // User applies to a job
  async apply(jobId: string, userId: string, dto: CreateApplicationDto) {
    // Check job exists
    const job = await this.jobsService.findOne(jobId);

   

    // Check already applied
    const exists = await this.appModel.exists({
      applicant: userId,
      job: jobId,
    });
    if (exists) throw new BadRequestException('Already applied');

    // Get applicant's CV
    const user = await this.usersService.findById(userId);
    const cvUrl = user.cvUrl;

    const app = new this.appModel({
      ...dto,
      applicant: userId,
      job: jobId,
      cvUrl,
    });

    return app.save();
  }

  // Recruiter view applicants for a job
  async getApplicants(jobId: string, recruiterId: string) {
    const job = await this.jobsService.findOne(jobId);

    if (job.recruiter.toString() !== recruiterId)
      throw new ForbiddenException('Not your job');

    return this.appModel
      .find({ job: jobId })
      .populate('applicant', 'name email cvUrl');
  }

  // Update status (recruiter)
  async updateStatus(
    id: string,
    dto: UpdateApplicationStatusDto,
    recruiterId: string,
  ) {
    const app = await this.appModel.findById(id).populate('job');


    if (!app) throw new NotFoundException('Application not found');

   

    return this.appModel.findByIdAndUpdate(id, dto, { new: true });
  }

  // User view own applications
  async myApps(userId: string) {
    return this.appModel
      .find({ applicant: userId })
      .populate('job', 'title company location active');
  }
}
