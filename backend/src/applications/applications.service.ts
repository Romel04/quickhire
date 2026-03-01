import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  // POST /api/applications — submit application
  async create(dto: CreateApplicationDto) {
    // 1. Verify the job exists
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) {
      throw new NotFoundException(`Job with id "${dto.jobId}" was not found`);
    }

    // 2. Prevent duplicate application (same email + same job)
    const duplicate = await this.prisma.application.findFirst({
      where: { jobId: dto.jobId, email: dto.email.toLowerCase() },
    });
    if (duplicate) {
      throw new ConflictException('You have already applied for this job with this email');
    }

    const application = await this.prisma.application.create({
      data: { ...dto, email: dto.email.toLowerCase() },
      include: { job: { select: { title: true, company: true } } },
    });

    return {
      success: true,
      data: application,
      message: `Application submitted for "${job.title}" at ${job.company}`,
    };
  }

  // GET /api/applications — all applications (admin)
  async findAll() {
    const applications = await this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      include: { job: { select: { title: true, company: true } } },
    });

    return { success: true, count: applications.length, data: applications };
  }

  // GET /api/applications/job/:jobId — applications for a job (admin)
  async findByJob(jobId: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException(`Job with id "${jobId}" was not found`);
    }

    const applications = await this.prisma.application.findMany({
      where: { jobId },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, count: applications.length, data: applications };
  }
}
