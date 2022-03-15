import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';
interface IRequest {
  codigoMunicipio: string;
}
interface IDados {
  codigo_municipio: string;
  codigoUF: string;
  nome: string;
  status: number;
}
class UpdateMunicipioStatusService {
  public async execute({
    codigoMunicipio,
  }: IRequest): Promise<IDados | Municipio> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipio = await municipiosRepository.findById(codigoMunicipio);
    if (!municipio) {
      throw new AppError('Municipio nao encontrada.', 404);
    }

    municipio.status = municipio.status == 1 ? 2 : 1;
    await municipiosRepository.save(municipio);
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

export default UpdateMunicipioStatusService;
