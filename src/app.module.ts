import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/config.service'

@Module({
    imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
