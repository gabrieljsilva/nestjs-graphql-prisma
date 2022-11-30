import { TokenService } from './token.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@prisma/module';

describe('token service tests', () => {
  let module: TestingModule;
  let service: TokenService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: TokenService,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('shoud be defined', () => {
    expect(service).toBeDefined();
  });
});
