import { fetchTopHeadlines, searchArticles } from '../controllers/articles';
import { NextFunction, Request, Response, Router } from 'express';
import { validateFetchArticles, validateTopHeadlines } from '../middleWare/validation/articles';
import Logger from '../logger';
import { CustomError } from '../utils/response/custom-error/CustomError';

const articlesRouter = Router();

articlesRouter.get(`/search`,
    validateFetchArticles,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const articles = await searchArticles(req.query.search as string, req.query.searchIn as 'title' | 'description');
            res.customSuccess(200, 'Search articles succesfully', {
                articles
            })
        } catch (error) {
            Logger.error({
                error,
                message: `Error fetching articles`
            })
            return next(new CustomError(500, 'General', 'Something went wrong'))
        }
    });

articlesRouter.get(`/top-headlines`,
    validateTopHeadlines,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const articles = await fetchTopHeadlines(req.query.category as any, req.query.countryCode as string);
            res.customSuccess(200, 'Fetch top headlines succesfully', {
                articles
            })
        } catch (error) {
            Logger.error({
                error,
                message: `Error fetching top headlines`
            })
            return next(new CustomError(500, 'General', 'Something went wrong'))
        }
    });


export default articlesRouter;
