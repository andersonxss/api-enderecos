import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';
interface IRequest {
  codigoUF: string;
}
interface IDados {
  codigoMunicipio: string;
  codigoUF: string;
  nome: string;
  status: number;
}
class ShowMunicipioUfService {
  public async execute({ codigoUF }: IRequest): Promise<IDados | Municipio[]> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const munucipioUfs = await municipiosRepository.findByIdUf(codigoUF);
    if (!munucipioUfs.length) {
      throw new AppError(
        'Municipio nao encontrado que estaja relacionado com essa Uf.',
        404,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = munucipioUfs.map(elem => {
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

export default ShowMunicipioUfService;
