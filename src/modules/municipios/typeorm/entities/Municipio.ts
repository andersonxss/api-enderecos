import Uf from '@modules/ufs/typeorm/entities/Uf';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_municipio')
class Municipio {
  @PrimaryGeneratedColumn('uuid')
  codigo_municipio: string;
  @Column()
  codigo_uf: string;
  @Column()
  nome: string;
  @Column('int')
  status: number;
  @CreateDateColumn({ select: false })
  created_at: Date;
  @CreateDateColumn({ select: false })
  updated_at: Date;

  @OneToOne(() => Uf, uf => uf.codigo_uf, { eager: true })
  @JoinColumn({ name: 'codigo_uf' })
  ufs: Uf;
}
export default Municipio;
