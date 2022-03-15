import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';

class ListMunicipioService {
  public async execute(): Promise<Municipio[]> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipio = await municipiosRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = municipio.map(elem => {
      return {
        codigoMunicipio: elem.codigo_municipio,
        codigoUF: elem.codigo_uf,
        nome: elem.nome,
        status: elem.status,
      };
    });

    return dados;
  }
}

export default ListMunicipioService;
