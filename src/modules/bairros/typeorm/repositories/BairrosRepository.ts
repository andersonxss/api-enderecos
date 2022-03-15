import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entities/Bairro';

@EntityRepository(Bairro)
class BairrosRepository extends Repository<Bairro> {
  public async findById(codigo_bairro: string): Promise<Bairro | undefined> {
    const bairro = this.findOne({
      where: {
        codigo_bairro,
      },
    });
    return bairro;
  }

  public async findByIdMunicipio(codigo_municipio: string): Promise<Bairro[]> {
    const bairroMunicipios = this.find({
      where: { codigo_municipio: codigo_municipio },
    });
    return bairroMunicipios;
  }

  public async findByNome(nome: string): Promise<Bairro | undefined> {
    const bairro = this.findOne({
      where: {
        nome,
      },
    });
    return bairro;
  }
}

export default BairrosRepository;
