import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';
interface IRequest {
  codigoBairro: string;
}
class DeleteBairroService {
  public async execute({ codigoBairro }: IRequest): Promise<void> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairro = await bairrosRepository.findOne(codigoBairro);
    if (!bairro) {
      throw new AppError('Bairro nao encontrado.', 404);
    }
    await bairrosRepository.remove(bairro);
  }
}

export default DeleteBairroService;
