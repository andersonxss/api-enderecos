import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';

interface IRequest {
  codigo_uf: string;
  nome: string;
  status: number;
}

class CreateMunicipioService {
  public async execute({
    codigo_uf,
    nome,
    status,
  }: IRequest): Promise<Municipio> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipioExists = await municipiosRepository.findByNome(nome);

    if (municipioExists) {
      throw new AppError(
        'Ja existe um municipio cadastrado com esse nome.',
        404,
      );
    }

    const municipio = municipiosRepository.create({
      codigo_uf,
      nome,
      status,
    });

    await municipiosRepository.save(municipio);
    return municipio;
  }
}

export default CreateMunicipioService;
