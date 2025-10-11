import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { auth } from './auth';

type AuthApiMock = {
  api: {
    signUpEmail: jest.Mock;
    signInEmail: jest.Mock;
    signOut: jest.Mock;
  };
};

jest.mock('./auth', () => {
  return {
    auth: {
      api: {
        signUpEmail: jest.fn(),
        signInEmail: jest.fn(),
        signOut: jest.fn(),
      },
    },
  };
});

const mockedAuth = auth as unknown as AuthApiMock;

describe('AuthService', () => {
  let service: AuthService;
  const jwtSignMock = jest.fn().mockReturnValue('signed.jwt.token');

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jwtSignMock },
        },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
    jest.clearAllMocks();
  });

  it('register', async () => {
    const dto = {
      email: 'test@mail.com',
      password: '123456',
      name: 'Tester',
      phone: '11999999999',
    } as RegisterDto;

    mockedAuth.api.signUpEmail.mockResolvedValue({
      token: 'session-token',
      user: { id: 'u1', email: dto.email, name: dto.name },
    });

    const result = await service.register({ registerData: dto });
    expect(result.success).toBe(true);
    expect(result.token).toBe('session-token');
    expect(result.jwt).toBe('signed.jwt.token');
    expect(jwtSignMock).toHaveBeenCalledWith({
      sub: 'u1',
      email: dto.email,
      name: dto.name,
    });
  });

  it('login', async () => {
    const loginDto = { email: 't@mail.com', password: '123456' } as LoginDto;

    mockedAuth.api.signInEmail.mockResolvedValue({
      token: 'session-token',
      user: { id: 'u1', email: loginDto.email, name: 'Tester' },
    });

    const result = await service.login({ loginData: loginDto });
    expect(result.success).toBe(true);
    expect(result.token).toBe('session-token');
    expect(result.jwt).toBe('signed.jwt.token');
  });

  it('logout', async () => {
    mockedAuth.api.signOut.mockResolvedValue({ success: true });
    await expect(service.logout({ token: 'session-token' })).resolves.toEqual({
      success: true,
    });
  });
});
