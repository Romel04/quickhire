import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // POST /api/applications
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  // GET /api/applications  (admin)
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  // GET /api/applications/job/:jobId  (admin)
  @Get('job/:jobId')
  findByJob(@Param('jobId') jobId: string) {
    return this.applicationsService.findByJob(jobId);
  }
}
