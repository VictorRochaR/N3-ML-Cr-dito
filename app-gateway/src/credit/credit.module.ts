import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';

@Module({
  imports: [HttpModule],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
