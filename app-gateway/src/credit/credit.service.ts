import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateCreditDto } from './dto/create-credit.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CreditService {
  constructor(private readonly httpService: HttpService) {}

  async analyze(createCreditDto: CreateCreditDto) {
    const mlUrl = process.env.ML_API_URL || 'http://ml-engine:5000';
    
    const { data } = await lastValueFrom(
      this.httpService.post(`${mlUrl}/predict`, createCreditDto)
    );
    
    return data;
  }
}
