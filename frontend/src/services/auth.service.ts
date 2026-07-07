import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from "@/types/auth";

import { api } from "@/lib/api";

export interface RegisterData {
  email: string;
  username: string;
  full_name: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function login(
  data: LoginRequest,
): Promise<TokenResponse> {
  const response = await api.post("/auth/login", data);
  return response.data;
}