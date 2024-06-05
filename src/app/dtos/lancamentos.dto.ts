import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LancamentoDto {
    @ApiProperty()
    @IsNotEmpty()
    valor: number;

    @ApiProperty()
    @IsNotEmpty()
    obs?: string;

    @ApiProperty()
    @IsNotEmpty()
    recDesId: number;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    empresaId: number;

    @ApiProperty()
    @IsNotEmpty()
    tipo: string;

    @ApiProperty()
    @IsNotEmpty()
    dataHora: Date;
}