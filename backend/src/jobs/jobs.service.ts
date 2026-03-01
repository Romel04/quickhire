import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /api/jobs — list all with optional filters
  async findAll(filters: FilterJobsDto) {
    const { search, category, location, type } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (type) {
      where.type = { equals: type, mode: 'insensitive' };
    }

    const jobs = await this.prisma.job.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: { _count: { select: { applications: true } } },
    });

    return { success: true, count: jobs.length, data: jobs };
  }

  // GET /api/jobs/featured — homepage featured jobs
  async findFeatured() {
    const jobs = await this.prisma.job.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { _count: { select: { applications: true } } },
    });

    return { success: true, data: jobs };
  }

  // GET /api/jobs/categories — grouped counts per category
  async getCategories() {
    const grouped = await this.prisma.job.groupBy({
      by: ['category'],
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    });

    return {
      success: true,
      data: grouped.map((g) => ({ name: g.category, count: g._count.category })),
    };
  }

  // GET /api/jobs/:id — single job with application count
  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } },
    });

    if (!job) {
      throw new NotFoundException(`Job with id "${id}" was not found`);
    }

    return { success: true, data: job };
  }

  // POST /api/jobs — create (admin)
  async create(dto: CreateJobDto) {
    const job = await this.prisma.job.create({ data: dto });
    return { success: true, data: job, message: 'Job created successfully' };
  }

  // DELETE /api/jobs/:id — delete (admin)
  async remove(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) {
      throw new NotFoundException(`Job with id "${id}" was not found`);
    }

    await this.prisma.job.delete({ where: { id } });
    return { success: true, message: 'Job deleted successfully' };
  }
}
