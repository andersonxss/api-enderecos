import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';

@EntityRepository(Pessoa)
class PessoasRepository extends Repository<Pessoa> {
  public async findById(codigo_pessoa: string): Promise<Pessoa | undefined> {
    const pessoa = this.findOne({
      where: {
        codigo_pessoa,
      },
    });

    return pessoa;
  }

  public async findByLogin(login: string): Promise<Pessoa | undefined> {
    const pessoa = this.findOne({
      where: {
        login,
      },
    });
    return pessoa;
  }
}

export default PessoasRepository;
