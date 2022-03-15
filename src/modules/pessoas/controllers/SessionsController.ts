import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';
class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const createSession = new CreateSessionService();
    const pessoa = await createSession.execute({ login, senha });
    return response.json(pessoa);
  }
}

export default SessionsController;
