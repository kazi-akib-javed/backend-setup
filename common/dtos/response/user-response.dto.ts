import { BaseDto } from "../dto.config";

export class UserResponseDto extends BaseDto {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    roles: '';
    email: string;
    accessToken: string;
    isUser: boolean;
  }