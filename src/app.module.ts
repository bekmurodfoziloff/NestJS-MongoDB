import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_DATABASE: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number()
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        const database = configService.get('MONGO_DATABASE');
        return {
          uri: `mongodb://${host}:${port}`,
          dbName: database,
          useNewUrlParser: true
        };
      },
      inject: [ConfigService]
    }),
    AuthenticationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
