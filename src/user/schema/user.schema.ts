import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student',
  })
  role: 'admin' | 'teacher' | 'student';

  @Prop({ type: Number, min: 6, max: 9 })
  grade: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }] })
  managedClasses?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class?: Types.ObjectId;

  @Prop()
  socketId?: string;

  @Prop()
  isOnline?: boolean;

  @Prop({
    type: String,
    enum: ['active', 'background', 'inactive'],
    default: 'active',
  })
  appState: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  avatarr?: string;

  @Prop({ default: Date.now })
  lastActiveAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
