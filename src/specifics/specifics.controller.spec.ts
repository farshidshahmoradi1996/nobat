import { Test, TestingModule } from '@nestjs/testing';
import { SpecificsController } from './specifics.controller';
import { SpecificsService } from './specifics.service';

describe('SpecificsController', () => {
  let controller: SpecificsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificsController],
      providers: [SpecificsService],
    }).compile();

    controller = module.get<SpecificsController>(SpecificsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
