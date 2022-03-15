import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';
interface IRequest {
  codigoMunicipio: string;
}
class DeleteMunicipioService {
  public async execute({ codigoMunicipio }: IRequest): Promise<void> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipio = await municipiosRepository.findOne(codigoMunicipio);
    if (!municipio) {
      throw new AppError('Municipio nao encontrado.', 404);
    }

    await municipiosRepository.remove(municipio);
  }
}

export default DeleteMunicipioService;
