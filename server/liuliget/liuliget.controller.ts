import { Controller, Get, Query } from '@nestjs/common';
import { LiuliService } from './liuliget.service';
import {SearchType} from '../../core/net/http.service';

@Controller('api')
export class LiuliController {
  constructor(private readonly liuliService: LiuliService) {}

  @Get()
  getLiuliList(@Query() query: {pageIndex?: number; type?: SearchType}) {
    const {pageIndex = 1, type = 'all'} = query;
    return this.liuliService.getNewsPage(pageIndex, type);
  }

  @Get('/url')
  getDownloadUrl(@Query('url') url: string) {
    return this.liuliService.getDownloadUrl(url);
  }
}
