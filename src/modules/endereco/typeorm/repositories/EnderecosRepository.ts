import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

@EntityRepository(Endereco)
class EnderecosRepository extends Repository<Endereco> {
  public async findById(
    codigo_endereco: string,
  ): Promise<Endereco | undefined> {
    const endereco = this.findOne({
      where: {
        codigo_endereco,
      },
    });
    return endereco;
  }

  public async findByIdPessoa(codigo_pessoa: string): Promise<Endereco[]> {
    const endereco = this.find({
      relations: ['bairros'],
      where: { codigo_pessoa },
    });
    return endereco;
  }

  public async findByIdCheckEnderecoPessoa(
    codigo_pessoa: string,
  ): Promise<Endereco[]> {
    const endereco = this.find({
      where: { codigo_pessoa },
    });
    return endereco;
  }

  public async findByNome(nome: string): Promise<Endereco | undefined> {
    const endereco = this.findOne({
      where: {
        nome,
      },
    });
    return endereco;
  }
}

export default EnderecosRepository;
