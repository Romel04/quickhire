import {
  IsString,
  IsOptional,
  IsBoolean,
  IsIn,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(120)
  title?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string

  @IsString()
  @IsOptional()
  @IsIn(['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'])
  category?: string

  @IsString()
  @IsOptional()
  @IsIn(['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship'])
  type?: string

  @IsString()
  @IsOptional()
  @MinLength(20)
  description?: string

  @IsString()
  @IsOptional()
  requirements?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  salary?: string

  @IsString()
  @IsOptional()
  logoUrl?: string

  @IsBoolean()
  @IsOptional()
  featured?: boolean
}
