import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { IsUniqueEmailValidator } from '../validators/IsUniqueEmail.validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, IsUniqueEmailValidator],
  exports: [UsersService],
  controllers: []
})
export class UsersModule {}
