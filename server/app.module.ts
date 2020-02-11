import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiuliController } from './liuliget/liuliget.controller';
import { LiuliService } from './liuliget/liuliget.service';
import { NestNextModule } from 'nest-next-module';

const dev = process.env.NODE_ENV !== 'production';

@Module({
  imports: [NestNextModule.forRoot({ dev })],
  controllers: [AppController, LiuliController],
  providers: [AppService, LiuliService],
})
export class AppModule {}
