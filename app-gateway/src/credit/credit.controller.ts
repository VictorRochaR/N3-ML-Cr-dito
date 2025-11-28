import { Controller, Post, Body } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';

@Controller('credit')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post('analyze')
  analyze(@Body() createCreditDto: CreateCreditDto) {
    return this.creditService.analyze(createCreditDto);
  }
}
