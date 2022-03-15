import DeleteEnderecoService from './DeleteEnderecoService';
interface IRequest {
  endereco: [];
}
class CheckEnderecoPessoaService {
  public async execute(
    endereco: { codigoEndereco: string }[],
  ): Promise<IRequest | void> {
    const deleteEnderecoService = new DeleteEnderecoService();
    endereco.map((elem: { codigoEndereco: string }) => {
      const codigoEndereco = elem.codigoEndereco;
      deleteEnderecoService.execute({ codigoEndereco });
    });
  }
}

export default CheckEnderecoPessoaService;
