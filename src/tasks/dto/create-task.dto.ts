import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
