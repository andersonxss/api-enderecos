import { Request, Response } from 'express';

import CreateUfService from '../services/CreateUfService';
import DeleteUfService from '../services/DeleteUfService';
import ListUftService from '../services/ListUftService';
import ShowUfService from '../services/ShowUfService';
import ShowUfSiglaService from '../services/ShowUfSiglaService';
import UpdateUfService from '../services/UpdateUfService';
import UpdateUfStatusService from '../services/UpdateUfStatusService';

class UfsController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const listUfs = new ListUftService();
    const showUfs = new ShowUfService();
    const showUfSiglas = new ShowUfSiglaService();
    const { codigoUF, sigla } = request.query as never;
    let uf;

    if (codigoUF !== undefined && sigla !== undefined) {
      //Se codigoUF ou  sigla for diferente de undefined, deve-se buscar pelo id
      uf = await showUfs.execute({ codigoUF });
    } else if (codigoUF !== undefined) {
      //Se codigoUF  for diferente de undefined, deve-se pelo por id
      uf = await showUfs.execute({ codigoUF });
    } else if (sigla !== undefined) {
      //Se sigla for diferente de undefined, deve-se buscar pela sigla
      uf = await showUfSiglas.execute({ sigla });
    } else {
      //Se não existir parâmetro, deve-se buscar todas Ufs
      uf = await listUfs.execute();
    }

    return response.json(uf);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;
    const createuf = new CreateUfService();
    await createuf.execute({ sigla, nome, status });
    const listUfs = new ListUftService();
    const uf = await listUfs.execute();
    return response.json(uf);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status, codigoUF } = request.body;
    const updateUf = new UpdateUfService();
    await updateUf.execute({ codigoUF, sigla, nome, status });
    const listUfs = new ListUftService();
    const uf = await listUfs.execute();
    return response.json(uf);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF } = request.params;
    const updateUfStatus = new UpdateUfStatusService();
    const uf = await updateUfStatus.execute({ codigoUF });
    return response.json(uf);
  }

  public async delete(request: Request, response: Response) {
    const { codigoUF } = request.params;
    const deleteUf = new DeleteUfService();
    await deleteUf.execute({ codigoUF });
    const listUfs = new ListUftService();
    const uf = await listUfs.execute();
    return response.json(uf);
  }
}

export default UfsController;
