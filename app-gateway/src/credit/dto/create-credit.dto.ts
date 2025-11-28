import { IsNumber, IsInt, IsOptional } from 'class-validator';

export class CreateCreditDto {
  @IsNumber() person_age: number;
  @IsNumber() person_income: number;
  @IsInt() person_emp_exp: number;
  @IsNumber() loan_amnt: number;
  @IsNumber() loan_int_rate: number;
  @IsNumber() loan_percent_income: number;
  @IsNumber() cb_person_cred_hist_length: number;
  @IsInt() credit_score: number;
  @IsInt() person_gender: number;
  @IsInt() previous_loan_defaults_on_file: number;
  
  @IsInt() @IsOptional() person_education_Bachelor: number = 0;
  @IsInt() @IsOptional() person_education_Doctorate: number = 0;
  @IsInt() @IsOptional() person_education_Master: number = 0;
  @IsInt() @IsOptional() person_education_Associate: number = 0;
  @IsInt() @IsOptional() person_home_ownership_OWN: number = 0;
  @IsInt() @IsOptional() person_home_ownership_RENT: number = 0;
  @IsInt() @IsOptional() person_home_ownership_MORTGAGE: number = 0;
  @IsInt() @IsOptional() loan_intent_EDUCATION: number = 0;
  @IsInt() @IsOptional() loan_intent_HOMEIMPROVEMENT: number = 0;
  @IsInt() @IsOptional() loan_intent_MEDICAL: number = 0;
  @IsInt() @IsOptional() loan_intent_PERSONAL: number = 0;
  @IsInt() @IsOptional() loan_intent_VENTURE: number = 0;
  @IsInt() @IsOptional() loan_intent_DEBTCONSOLIDATION: number = 0;
}
