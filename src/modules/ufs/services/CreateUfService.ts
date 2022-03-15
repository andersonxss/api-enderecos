import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfsRepository from '../typeorm/repositories/UfsRepository';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class CreateUfService {
  public async execute({ sigla, nome, status }: IRequest): Promise<Uf> {
    sigla = sigla.toUpperCase();
    nome = nome.toUpperCase();
    const ufsRepository = getCustomRepository(UfsRepository);
    const uftExists = await ufsRepository.findBySigla(sigla);

    if (uftExists) {
      throw new AppError('Ja existe um uf com esta sigla', 404);
    }

    const uf = ufsRepository.create({
      sigla,
      nome,
      status,
    });

    await ufsRepository.save(uf);
    return uf;
  }
}

export default CreateUfService;
