import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class SearchStudentDto {
  @IsString({ message: 'Số báo danh phải là chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Số báo danh không được để trống.' })
  @IsNumberString({}, { message: 'Số báo danh chỉ được chứa chữ số.' })
  sbd!: string;
}
