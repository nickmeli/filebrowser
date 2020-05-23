import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FsService } from './providers/fs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    FsService,
  ],
})
export class AppModule {}
