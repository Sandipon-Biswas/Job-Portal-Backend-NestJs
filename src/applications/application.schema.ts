import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  applicant: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  job: Types.ObjectId;

  @Prop({ default: 'applied' })
  status: string; // applied, shortlisted, rejected, hired

  @Prop({ default: null })
  coverLetter?: string;

  @Prop({ default: null })
  cvUrl?: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
