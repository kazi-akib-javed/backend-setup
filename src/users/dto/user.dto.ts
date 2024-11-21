import { Allow } from "class-validator";
import { BaseDto } from "common";

export class UserDto extends BaseDto {
  @Allow()
  firstName: string;

  @Allow()
  lastName: string;

  @Allow()
  email: string;

  @Allow()
  userId: string;

  @Allow()
  address: string;
  
  @Allow()
  phone: string;
}
