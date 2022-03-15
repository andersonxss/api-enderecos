import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import BairrosRepository from '../typeorm/repositories/BairrosRepository';
interface IRequest {
  codigoBairro: string;
  codigoMunicipio: string;
  nome: string;
  status: number;
}
class UpdateBairroService {
  public async execute({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro> {
    const bairrosRepository = getCustomRepository(BairrosRepository);
    const bairro = await bairrosRepository.findById(codigoBairro);

    if (!bairro) {
      throw new AppError('Bairro nao encontrado.', 404);
    }
    const bairroExists = await bairrosRepository.findByNome(nome);
    if (bairroExists && nome == bairro.nome) {
      throw new AppError('Ja existe um bairro com este nome', 404);
    }
    bairro.codigo_municipio = codigoMunicipio;
    bairro.nome = nome;
    bairro.status = status;
    await bairrosRepository.save(bairro);
    return bairro;
  }
}

export default UpdateBairroService;
