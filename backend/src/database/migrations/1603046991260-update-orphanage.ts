import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class updateOrphanage1603046991260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'whatsapp_number',
            type: 'decimal',
            isNullable:true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfazer as alterações do up
        await queryRunner.dropColumn( 'orphanages', 'whatsapp_number');
    }  

}
