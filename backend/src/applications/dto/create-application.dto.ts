import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateApplicationDto {
  @IsUUID('4', { message: 'jobId must be a valid UUID' })
  @IsNotEmpty({ message: 'jobId is required' })
  jobId: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsUrl({}, { message: 'Please provide a valid URL for your resume (e.g. https://...)' })
  resumeLink: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  coverNote?: string;
}
