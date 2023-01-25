import { IsString, IsNumber } from 'class-validator';
export class CreateUploadDto {
  @IsString()
  public readonly fieldname: string;
  @IsString()
  public readonly originalname: string;
  @IsString()
  public readonly encoding: string;
  @IsString()
  public readonly mimetype: string;
  @IsString()
  public readonly destination: string;
  @IsString()
  public readonly filename: string;
  @IsString()
  public readonly path: string;
  @IsNumber()
  public readonly size: number;
}
