import Bairro from '@modules/bairros/typeorm/entities/Bairro';
import Pessoa from '@modules/pessoas/typeorm/entities/Pessoa';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_endereco')
class Endereco {
  @PrimaryGeneratedColumn('uuid')
  codigo_endereco: string;

  @Column()
  codigo_pessoa: string;

  @Column()
  codigo_bairro: string;

  @Column()
  nome_rua: string;

  @Column('int')
  numero: number;

  @Column()
  complemento: string;

  @Column()
  cep: string;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @CreateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Bairro, bairro => bairro.codigo_bairro, { eager: true })
  @JoinColumn({ name: 'codigo_bairro', referencedColumnName: 'codigo_bairro' })
  bairros: Bairro;

  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos)
  @JoinTable()
  @JoinColumn({ name: 'codigo_pessoa', referencedColumnName: 'codigo_pessoa' })
  pessoas: Pessoa;

  codigoEndereco: string;
  codigoBairro: string;
  codigoPessoa: string;
  nomeRua: number;
}
export default Endereco;
