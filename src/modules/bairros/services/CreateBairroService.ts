import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';

interface IRequest {
  codigo_municipio: string;
  nome: string;
  status: number;
}

class CreateBairroService {
  public async execute({
    codigo_municipio,
    nome,
    status,
  }: IRequest): Promise<Bairro> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairroExists = await bairrosRepository.findByNome(nome);

    if (bairroExists) {
      throw new AppError('Ja existe um bairro cadastrado com esse nome.', 404);
    }

    const bairro = bairrosRepository.create({
      codigo_municipio,
      nome,
      status,
    });

    await bairrosRepository.save(bairro);
    return bairro;
  }
}

export default CreateBairroService;
