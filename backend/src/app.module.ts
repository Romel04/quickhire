import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    // Load .env globally — no need to import ConfigModule per-feature module
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    JobsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
