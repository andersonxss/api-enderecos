import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';

class ListBairroService {
  public async execute(): Promise<Bairro[]> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairro = await bairrosRepository.find({ relations: ['municipios'] });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = bairro.map(elem => {
      return {
        codigoBairro: elem.codigo_bairro,
        codigoMunicipio: elem.codigo_municipio,
        nome: elem.nome,
        status: elem.status,
      };
    });

    return dados;
  }
}

export default ListBairroService;
