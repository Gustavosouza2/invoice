import { Test } from '@nestjs/testing';

import { PrismaService } from '../../common/prisma/prisma.service';
import { UsersService } from './users.service';

type UserRow = { id: string };

type UserModelMock = {
  findMany: jest.Mock<Promise<UserRow[]>, [object?]>;
  findUnique: jest.Mock<Promise<UserRow | null>, [object]>;
  update: jest.Mock<Promise<UserRow>, [object]>;
  delete: jest.Mock<Promise<UserRow>, [object]>;
};

type PrismaMock = {
  user: UserModelMock;
};

describe('UsersService (unit)', () => {
  let service: UsersService;
  const prismaMock: PrismaMock = {
    user: {
      findMany: jest.fn<Promise<UserRow[]>, [object?]>(),
      findUnique: jest.fn<Promise<UserRow | null>, [object]>(),
      update: jest.fn<Promise<UserRow>, [object]>(),
      delete: jest.fn<Promise<UserRow>, [object]>(),
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock as unknown as PrismaService,
        },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
    jest.clearAllMocks();
  });

  it('findAllUsers() retorna lista', async () => {
    prismaMock.user.findMany.mockResolvedValue([{ id: '1' }]);
    const result = await service.findAllUsers();
    expect(Array.isArray(result)).toBe(true);
  });

  it('findUserById() retorna usuário', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: '1' });
    const result = await service.findUserById({ id: '1' });
    expect(result).toEqual({ id: '1' });
  });

  it('updateUser() retorna usuário atualizado', async () => {
    prismaMock.user.update.mockResolvedValue({ id: '1' });
    prismaMock.user.findUnique.mockResolvedValue({ id: '1' });
    const result = await service.updateUser({
      id: '1',
      userData: { name: 'A' },
    });
    expect(result).toEqual({ id: '1' });
  });

  it('removeUser() retorna void', async () => {
    prismaMock.user.delete.mockResolvedValue({ id: '1' });
    const result = await service.removeUser({ id: '1' });
    expect(result).toBeUndefined();
  });
});
