import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EmpresaDto {
    @ApiProperty()
    @IsNotEmpty()
    nome: string
}