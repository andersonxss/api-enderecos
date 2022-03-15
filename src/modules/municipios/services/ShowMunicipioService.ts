import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';
interface IRequest {
  codigoMunicipio: string;
}
interface IDados {
  codigoMunicipio: string;
  codigoUF: string;
  nome: string;
  status: number;
}
class ShowMunicipioService {
  public async execute({
    codigoMunicipio,
  }: IRequest): Promise<IDados | Municipio> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipio = await municipiosRepository.findOne(codigoMunicipio);
    if (!municipio) {
      throw new AppError('Municipio nao encontrado.', 404);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: any = {
      codigoMunicipio: municipio.codigo_municipio,
      codigoUF: municipio.codigo_uf,
      nome: municipio.nome,
      status: municipio.status,
    };
    return dados;
  }
}

export default ShowMunicipioService;
