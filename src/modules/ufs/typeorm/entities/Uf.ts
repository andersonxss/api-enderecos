import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_uf')
class Uf {
  @PrimaryGeneratedColumn('uuid')
  codigo_uf: string;
  @Column()
  sigla: string;
  @Column()
  nome: string;
  @Column('int')
  status: number;
  @CreateDateColumn({ select: false })
  created_at: Date;
  @CreateDateColumn({ select: false })
  updated_at: Date;
}
export default Uf;
