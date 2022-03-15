import Endereco from '@modules/endereco/typeorm/entities/Endereco';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_pessoa')
class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  codigo_pessoa: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column('int')
  idade: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  status: number;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @CreateDateColumn({ select: false })
  updated_at: Date;

  @OneToMany(() => Endereco, endereco => endereco.pessoas, { primary: true })
  @JoinTable({ name: 'codigo_pessoa' })
  enderecos: Endereco[];
}
export default Pessoa;
