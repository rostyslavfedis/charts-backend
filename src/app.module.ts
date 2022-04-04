import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChartsModule } from './modules/charts/charts.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECT_URI || 'mongodb+srv://Rostyslav:renaultkangoo1406@cluster0.tibi7.mongodb.net/test'),
    UserModule,
    AuthModule,
    ChartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
