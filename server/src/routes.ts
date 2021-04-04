import { Router } from 'express';
import {
    getDevelopers,
    saveDeveloper,
    getDeveloper,
    updateDeveloper,
    removeDeveloper
} from './controller/developerController';

const routes = Router();

routes.get('/developers', getDevelopers);
routes.post('/developers', saveDeveloper);
routes.get('/developers/:id', getDeveloper);
routes.put('/developers/:id', updateDeveloper);
routes.delete('/developers/:id', removeDeveloper);

export default routes;
