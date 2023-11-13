import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './Tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TasksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
