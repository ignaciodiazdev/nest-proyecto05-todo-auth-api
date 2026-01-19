import { IsString, MinLength } from "class-validator";

export class CreateTaskDto {

  @IsString()
  @MinLength(5)
  description: string;
}
