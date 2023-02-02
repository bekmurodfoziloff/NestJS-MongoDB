import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @Prop({ type: String })
  @Exclude()
  currentHashedRefreshToken: string;

  @Prop({ type: Date, default: Date.now(), required: true })
  createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: UserDocument) {
    return `${this.firstName} ${this.lastName}`;
});

export { UserSchema };
