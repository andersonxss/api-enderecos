import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';

@EntityRepository(Uf)
class UfsRepository extends Repository<Uf> {
  public async findById(codigo_uf: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        codigo_uf,
      },
    });
    return uf;
  }

  public async findBySigla(sigla: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        sigla,
      },
    });
    return uf;
  }
}

export default UfsRepository;
