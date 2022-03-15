import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipiosRepository from '../typeorm/repositories/MunicipiosRepository';
interface IRequest {
  codigoMunicipio: string;
  codigoUF: string;
  nome: string;
  status: number;
}
class UpdateMunicipioService {
  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio> {
    const municipiosRepository = getCustomRepository(MunicipiosRepository);
    const municipio = await municipiosRepository.findById(codigoMunicipio);
    if (!municipio) {
      throw new AppError('Municipio nao encontrado.', 404);
    }
    const municipioExists = await municipiosRepository.findByNome(nome);
    if (municipioExists && nome == municipio.nome) {
      throw new AppError('Ja existe um municipio com este nome', 404);
    }
    municipio.codigo_uf = codigoUF;
    municipio.nome = nome;
    municipio.status = status;
    await municipiosRepository.save(municipio);
    return municipio;
  }
}

export default UpdateMunicipioService;
