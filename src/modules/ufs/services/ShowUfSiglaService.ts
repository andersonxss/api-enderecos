import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfsRepository from '../typeorm/repositories/UfsRepository';
interface IRequest {
  sigla: string;
}
interface IDados {
  codigoUF: string;
  nome: string;
  sigla: string;
  status: number;
}
class ShowUfSiglaService {
  public async execute({ sigla }: IRequest): Promise<IDados | Uf> {
    sigla = sigla.toUpperCase();
    const pufsRepository = getCustomRepository(UfsRepository);

    const uf = await pufsRepository.findBySigla(sigla);

    if (!uf) {
      throw new AppError('Sigla nao encontrada.', 404);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: any = {
      codigoUF: uf.codigo_uf,
      nome: uf.nome,
      sigla: uf.sigla,
      status: uf.status,
    };
    return dados;
  }
}

export default ShowUfSiglaService;
