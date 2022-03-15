import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';

@EntityRepository(Municipio)
class UfsRepository extends Repository<Municipio> {
  public async findById(
    codigo_municipio: string,
  ): Promise<Municipio | undefined> {
    const municipio = this.findOne({
      where: {
        codigo_municipio,
      },
    });
    return municipio;
  }

  public async findByIdUf(codigo_uf: string): Promise<Municipio[]> {
    const munucipioUfs = this.find({
      where: {
        codigo_uf,
      },
    });
    return munucipioUfs;
  }

  public async findByNome(nome: string): Promise<Municipio | undefined> {
    const municipio = this.findOne({
      where: {
        nome,
      },
    });
    return municipio;
  }
}

export default UfsRepository;
