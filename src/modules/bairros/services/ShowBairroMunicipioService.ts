import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';
interface IRequest {
  codigoMunicipio: string;
}
class ShowBairroMunicipioService {
  public async execute({ codigoMunicipio }: IRequest): Promise<Bairro[]> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairroMunicipios = await bairrosRepository.findByIdMunicipio(
      codigoMunicipio,
    );

    if (!bairroMunicipios.length) {
      throw new AppError(
        'Nenhum bairro encontrado que estaja relacionado com esse municipio.',
        404,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = bairroMunicipios.map(elem => {
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

export default ShowBairroMunicipioService;
