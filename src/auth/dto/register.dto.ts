export class RegisterDto {
  name!: string;
  email!: string;
  password!: string;

  role?: 'USER' | 'ADMIN' | 'OPERATOR' | 'SUPERVISOR';
  plan?: 'CORE' | 'VIP' | 'ELITE' | 'GLOBAL';
}