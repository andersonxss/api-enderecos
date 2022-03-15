import { Router } from 'express';
import ufsRouter from '@modules/ufs/routes/ufs.routes';
import municipiosRouter from '@modules/municipios/routes/municipios.routes';
import bairrosRouter from '@modules/bairros/routes/bairros.routes';
import pessoasRouter from '@modules/pessoas/routes/pessoas.routes';
import enderecosRouter from '@modules/endereco/routes/enderecos.routes';
import sessionsRouter from '@modules/pessoas/routes/sessions.routes';

const routes = Router();

routes.use('/uf', ufsRouter);
routes.use('/municipio', municipiosRouter);
routes.use('/bairro', bairrosRouter);
routes.use('/pessoa', pessoasRouter);
routes.use('/endereco', enderecosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
