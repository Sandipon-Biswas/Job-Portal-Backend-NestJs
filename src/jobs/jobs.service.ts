import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(dto: CreateJobDto, recruiterId: string) {
    const job = new this.jobModel({ ...dto, recruiter: recruiterId });
    return job.save();
  }

  async findAll() {
    return this.jobModel
      .find()
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const job = await this.jobModel
      .findById(id)
      .populate('recruiter', 'name email');
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async update(id: string, dto: UpdateJobDto, recruiterId: string) {
    const job = await this.jobModel.findById(id);
    if (!job) throw new NotFoundException('Job not found');

    if (job.recruiter.toString() !== recruiterId)
      throw new ForbiddenException('Not your job posting');

    return this.jobModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string, recruiterId: string, isAdmin: boolean) {
    const job = await this.jobModel.findById(id);
    if (!job) throw new NotFoundException('Job not found');

    if (!isAdmin && job.recruiter.toString() !== recruiterId)
      throw new ForbiddenException('Not allowed');

    return this.jobModel.findByIdAndDelete(id);
  }
}
