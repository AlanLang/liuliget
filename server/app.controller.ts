import { Controller, Get, Res } from '@nestjs/common';
import { NextResponse } from 'nest-next-module';
import { get } from 'http';

@Controller()
export class AppController {
  @Get()
  index(@Res() res: NextResponse) {
    return res.nextRender('/index');
  }
}
