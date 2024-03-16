import { Test, TestingModule } from '@nestjs/testing';
import { SpecificsService } from './specifics.service';

describe('SpecificsService', () => {
  let service: SpecificsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificsService],
    }).compile();

    service = module.get<SpecificsService>(SpecificsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
