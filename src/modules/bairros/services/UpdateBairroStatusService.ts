import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';
interface IRequest {
  codigoBairro: string;
}
class UpdateBairroStatusService {
  public async execute({ codigoBairro }: IRequest): Promise<Bairro> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairro = await bairrosRepository.findById(codigoBairro);
    if (!bairro) {
      throw new AppError('Bairro nao encontrada.', 404);
    }

    bairro.status = bairro.status == 1 ? 2 : 1;
    await bairrosRepository.save(bairro);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: any = {
      codigoBairro: bairro.codigo_bairro,
      codigoMunicipio: bairro.codigo_municipio,
      nome: bairro.nome,
      status: bairro.status,
    };
    return dados;
  }
}

export default UpdateBairroStatusService;
