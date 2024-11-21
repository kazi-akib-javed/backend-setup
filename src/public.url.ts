import { RequestMethod } from '@nestjs/common';

export const publicUrls = [
  { path: "/hello-world", method: RequestMethod.GET },
  { path: "/users/create", method: RequestMethod.POST },
  { path: "/auth/login", method: RequestMethod.POST },
  { path: "/auth/google", method: RequestMethod.GET },
  { path: "/auth/google/redirect", method: RequestMethod.GET },
];