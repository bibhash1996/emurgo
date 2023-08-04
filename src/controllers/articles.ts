import Cache from '../cache';
import { getTopHeadLinesByCountry, fetchArticles } from './helper';
import Logger from '../logger';


export async function fetchTopHeadlines(category: 'general' | 'world' | 'nation',
    countryCode: string) {
    let articles = Cache.get(`${category}_${countryCode}`);
    if (articles) {
        Logger.info(`Fetched top headlines from cache`)
        return JSON.parse(articles as any);
    }
    articles = await getTopHeadLinesByCountry({ category, countryCode });
    Cache.set(`${category}_${countryCode}`, JSON.stringify(articles), 10 * 60);
    return articles
}

export async function searchArticles(search: string, searchIn: 'title' | 'description') {
    let articles = Cache.get(`${search}_${searchIn}`);
    if (articles) {
        Logger.info(`Fetched articles from cache`)
        return JSON.parse(articles as any);
    }
    articles = await fetchArticles({ searchIn, searchString: search });
    Cache.set(`${search}_${searchIn}`, JSON.stringify(articles), 10 * 60);
    return articles
}