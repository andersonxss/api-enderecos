import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMunicipios1643422754912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_municipio',
        columns: [
          {
            name: 'codigo_municipio',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_uf',
            type: 'uuid',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_codigo_uf',
            referencedTableName: 'tb_uf',
            referencedColumnNames: ['codigo_uf'],
            columnNames: ['codigo_uf'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_municipio');
  }
}
