import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils/response/custom-error/CustomError';


const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateTopHeadlines = (req: Request, res: Response, next: NextFunction) => {
    const category = req.query.category as string;
    const countryCode = req.query.countryCode as string;
    if (!category || typeof category !== 'string' || !['general', 'world', 'nation'].includes(category)) {
        const customError = new CustomError(400, 'Validation', 'Please provide a valid category. Category supported are general,world and nation');
        return next(customError);
    }
    if (!countryCode || typeof countryCode !== 'string' || !['in', 'us', 'uk'].includes(countryCode)) {
        const customError = new CustomError(400, 'Validation', 'Please provide a valid country. Currently supportes on in,us and uk');
        return next(customError);
    }
    return next();
};

export const validateFetchArticles = (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search as string;
    const searchIn = req.query.searchIn as string;
    if (!search || typeof search !== 'string') {
        const customError = new CustomError(400, 'Validation', 'Please provide a valid search string');
        return next(customError);
    }
    if (!searchIn || typeof searchIn !== 'string' || !['title', 'description'].includes(searchIn)) {
        const customError = new CustomError(400, 'Validation', 'Please provide a valid search category. Currently supportes only title and description');
        return next(customError);
    }
    return next();
};