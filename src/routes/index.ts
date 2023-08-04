import { NextFunction, Request, Response, Router } from 'express';
import ArticlesRouter from './articles';
import page404 from './404'

const router = Router();

router.get(`/health`, async (req: Request, res: Response) => {
    res.customSuccess(200, 'Hello');
});

router.use('/articles', ArticlesRouter);

router.use(page404);

export default router;
