import { Test, TestingModule } from '@nestjs/testing';
import { GoodsTypeController } from './goods-type.controller';
import { GoodsTypeService } from './goods-type.service';

describe('GoodsTypeController', () => {
  let controller: GoodsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsTypeController],
      providers: [GoodsTypeService],
    }).compile();

    controller = module.get<GoodsTypeController>(GoodsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
