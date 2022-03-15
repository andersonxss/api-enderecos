import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfsRepository from '../typeorm/repositories/UfsRepository';

class ListUftService {
  public async execute(): Promise<Uf[]> {
    const ufsRepository = getCustomRepository(UfsRepository);

    const ufs = await ufsRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = ufs.map(elem => {
      return {
        codigoUF: elem.codigo_uf,
        sigla: elem.sigla,
        nome: elem.nome,
        status: elem.status,
      };
    });

    return dados;
  }
}

export default ListUftService;
