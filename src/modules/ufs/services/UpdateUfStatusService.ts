import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfsRepository from '../typeorm/repositories/UfsRepository';
interface IRequest {
  codigoUF: string;
}
interface IDados {
  codigoUF: string;
  nome: string;
  sigla: string;
  status: number;
}
class UpdateUfStatusService {
  public async execute({ codigoUF }: IRequest): Promise<IDados | Uf> {
    const ufsRepository = getCustomRepository(UfsRepository);
    const uf = await ufsRepository.findById(codigoUF);
    if (!uf) {
      throw new AppError('UF nao encontrada.', 404);
    }

    uf.status = uf.status == 1 ? 2 : 1;
    await ufsRepository.save(uf);
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

export default UpdateUfStatusService;
