import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UfsRepository from '../typeorm/repositories/UfsRepository';
interface IRequest {
  codigoUF: string;
}
class DeleteUfService {
  public async execute({ codigoUF }: IRequest): Promise<void> {
    const ufsRepository = getCustomRepository(UfsRepository);
    const uf = await ufsRepository.findOne(codigoUF);
    if (!uf) {
      throw new AppError('UF nao encontrado.', 404);
    }
    await ufsRepository.remove(uf);
  }
}

export default DeleteUfService;
