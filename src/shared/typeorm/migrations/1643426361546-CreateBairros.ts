import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBairros1643426361546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_bairro',
        columns: [
          {
            name: 'codigo_bairro',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_municipio',
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
            name: 'fk_codigo_municipio',
            referencedTableName: 'tb_municipio',
            referencedColumnNames: ['codigo_municipio'],
            columnNames: ['codigo_municipio'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_bairro');
  }
}
