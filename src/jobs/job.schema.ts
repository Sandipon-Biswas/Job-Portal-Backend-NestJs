import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recruiter: Types.ObjectId;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: new Date() })
  deadline: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
