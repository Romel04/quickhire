import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Company is required' })
  @MaxLength(100)
  company: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @MaxLength(100)
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  @IsIn(
    [
      'Design',
      'Sales',
      'Marketing',
      'Finance',
      'Technology',
      'Engineering',
      'Business',
      'Human Resource',
    ],
    { message: 'Category must be a valid option' },
  )
  category: string;

  @IsString()
  @IsIn(['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship'], {
    message: 'Type must be Full-Time, Part-Time, Remote, Contract, or Internship',
  })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(20)
  description: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  salary?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
