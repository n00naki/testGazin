import { MigrationInterface, QueryRunner } from "typeorm";

export class testeGazin1617318464016 implements MigrationInterface {

    name = "testeGazin1617318464016";

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `CREATE TABLE "developer" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "sexo" character(1) NOT NULL DEFAULT 'M', "idade" integer NOT NULL, "hobby" character varying NOT NULL, "datanascimento" TIMESTAMP NOT NULL, PRIMARY KEY ("id"))`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE "developer"`);

    }

}
