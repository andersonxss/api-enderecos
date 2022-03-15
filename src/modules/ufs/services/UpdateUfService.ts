import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfsRepository from '../typeorm/repositories/UfsRepository';
interface IRequest {
  codigoUF: string;
  sigla: string;
  nome: string;
  status: number;
}
class UpdateUfService {
  public async execute({
    codigoUF,
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf> {
    const ufsRepository = getCustomRepository(UfsRepository);
    const uf = await ufsRepository.findById(codigoUF);
    if (!uf) {
      throw new AppError('UF não encontrada.', 404);
    }
    const ufExists = await ufsRepository.findBySigla(sigla);
    if (ufExists && sigla == uf.sigla) {
      throw new AppError('Ja existe uma UF com este nome', 404);
    }
    uf.sigla = sigla;
    uf.nome = nome;
    uf.status = status;
    await ufsRepository.save(uf);
    return uf;
  }
}

export default UpdateUfService;
