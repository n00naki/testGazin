import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

enum sexo {
    M,
    F
}

@Entity()
export class Developer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @Column({ type: "char", length: 1, default: "M" })
    @IsNotEmpty()
    @IsEnum(sexo, {message: 'Sex must be a valid enum value M or F'})
    sexo: string;

    @Column()
    @IsInt()
    @IsNotEmpty()
    idade: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    hobby: string;

    @Column()
    @IsNotEmpty()
    datanascimento: Date;

}