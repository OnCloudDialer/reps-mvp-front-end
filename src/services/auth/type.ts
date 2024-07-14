import { ApiResponseDto } from "../type";

export type loginRequestDTO = {
  email: string;
  password: string;
};

export type signUpRequestDTO = {
  email: string;
  name: string;
  password: string;
};

export type loginResponse = ApiResponseDto<{
  user: any;
  access_token: string;
}>;
