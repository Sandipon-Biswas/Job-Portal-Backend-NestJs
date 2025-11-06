import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  // keep password hidden by default in queries
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: ['user', 'recruiter', 'admin'], default: 'user' })
  role: 'user' | 'recruiter' | 'admin';

  @Prop({ default: null })
  phone?: string;

  @Prop({ default: null })
  address?: string;

  @Prop({ default: null })
  photoUrl?: string;

  @Prop({ default: null })
  cvUrl?: string;

  @Prop({ default: false })
  banned?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
// strip password in every JSON response
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ['password', '__v', 'createdAt', 'updatedAt'].forEach(
      (key) => delete ret[key],
    );
    return ret;
  },
});
