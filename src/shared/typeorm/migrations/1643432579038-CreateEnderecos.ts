import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEnderecos1643432579038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_endereco',
        columns: [
          {
            name: 'codigo_endereco',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_pessoa',
            type: 'uuid',
          },
          {
            name: 'codigo_bairro',
            type: 'uuid',
          },
          {
            name: 'nome_rua',
            type: 'varchar',
          },
          {
            name: 'numero',
            type: 'int',
          },
          {
            name: 'complemento',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
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
            name: 'fk_codigo_pessoa',
            referencedTableName: 'tb_pessoa',
            referencedColumnNames: ['codigo_pessoa'],
            columnNames: ['codigo_pessoa'],
          },
          {
            name: 'fk_codigo_bairro',
            referencedTableName: 'tb_bairro',
            referencedColumnNames: ['codigo_bairro'],
            columnNames: ['codigo_bairro'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_endereco');
  }
}
