import { Request, Response } from 'express';
import CreateMunicipioService from '../services/CreateMunicipioService';
import DeleteMunicipioService from '../services/DeleteMunicipioService';
import ListMunicipiotService from '../services/ListMunicipioService';
import ShowMunicipioService from '../services/ShowMunicipioService';
import ShowMunicipioUfService from '../services/ShowMunicipioUfService';

import UpdateMunicipioService from '../services/UpdateMunicipioService';
import UpdateMunicipioStatusService from '../services/UpdateMunicipioStatusService';

class MunicipiosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMunicipios = new ListMunicipiotService();
    const showMunicipio = new ShowMunicipioService();
    const showMunicipioUf = new ShowMunicipioUfService();
    const { codigoMunicipio, codigoUF } = request.query as never;

    let municipios;
    if (codigoMunicipio !== undefined && codigoUF !== undefined) {
      //Se codigoMunicipio ou  codigoUF for diferente de undefined, deve-se buscar pelo id
      municipios = await showMunicipio.execute({ codigoMunicipio });
    } else if (codigoMunicipio !== undefined) {
      //Se codigoMunicipio  for diferente de undefined, deve-se pelo por id
      municipios = await showMunicipio.execute({ codigoMunicipio });
    } else if (codigoUF !== undefined) {
      //Se codigoUF for diferente de undefined, deve-se buscar pela codigoUF
      municipios = await showMunicipioUf.execute({ codigoUF });
    } else {
      //Se não existir parâmetro, deve-se buscar todas Ufs
      municipios = await listMunicipios.execute();
    }

    return response.json(municipios);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status } = request.body;
    const createMunicipio = new CreateMunicipioService();
    const listMunicipios = new ListMunicipiotService();
    const codigo_uf = codigoUF;
    await createMunicipio.execute({
      codigo_uf,
      nome,
      status,
    });
    const municipio = await listMunicipios.execute();
    return response.json(municipio);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status, codigoMunicipio } = request.body;
    const updateMunicipio = new UpdateMunicipioService();
    const listMunicipios = new ListMunicipiotService();
    await updateMunicipio.execute({
      codigoMunicipio,
      codigoUF,
      nome,
      status,
    });
    const municipio = await listMunicipios.execute();
    return response.json(municipio);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoMunicipio } = request.params;
    const updateMunicipio = new UpdateMunicipioStatusService();
    const municipio = await updateMunicipio.execute({
      codigoMunicipio,
    });
    return response.json(municipio);
  }

  public async delete(request: Request, response: Response) {
    const { codigoMunicipio } = request.params;
    const deleteMunicipio = new DeleteMunicipioService();
    const listMunicipios = new ListMunicipiotService();
    await deleteMunicipio.execute({ codigoMunicipio });
    const municipio = await listMunicipios.execute();
    return response.json(municipio);
  }
}

export default MunicipiosController;
