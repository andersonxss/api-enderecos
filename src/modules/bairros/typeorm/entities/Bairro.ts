import Municipio from '@modules/municipios/typeorm/entities/Municipio';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_bairro')
class Bairro {
  @PrimaryGeneratedColumn('uuid')
  codigo_bairro: string;

  @Column()
  codigo_municipio: string;
  @Column()
  nome: string;
  @Column('int')
  status: number;
  @CreateDateColumn({ select: false })
  created_at: Date;
  @CreateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Municipio, municipio => municipio.codigo_municipio, {
    eager: true,
  })
  @JoinColumn({
    name: 'codigo_municipio',
    referencedColumnName: 'codigo_municipio',
  })
  municipios: Municipio;
}
export default Bairro;
