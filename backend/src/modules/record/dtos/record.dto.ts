import {
  IsEmail,
  IsString,
  Length,
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @Length(1, 100)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(14, 14)
  cpf: string;

  @IsString()
  celular: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  conhecimentos: string[];

  validado: boolean;

  @IsString()
  @IsIn(['Validado', 'Não validado'])
  status: string;
}
