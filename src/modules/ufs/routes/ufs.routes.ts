import { Router } from 'express';
import UfsController from '../controllers/UfsController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const ufsRouter = Router();
const ufsController = new UfsController();

ufsRouter.get('/', isAuthenticated, ufsController.index);

ufsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      sigla: Joi.string().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ufsController.create,
);

ufsRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoUF: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      sigla: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ufsController.update,
);

ufsRouter.put(
  '/status',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoUF: Joi.string().uuid().required(),
    },
  }),
  ufsController.updateStatus,
);

ufsRouter.delete(
  '/:codigoUF',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoUF: Joi.string().uuid().required(),
    },
  }),
  ufsController.delete,
);

export default ufsRouter;
