import axios from 'axios';
import Logger from '../logger';
import { CustomError } from '../utils/response/custom-error/CustomError';


export async function fetchArticles(payload: {
    searchString: string,
    searchIn: 'title' | 'description'
}) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://gnews.io/api/v4/search?q=${payload.searchString}&apikey=${process.env.GNEWS_API_KEY}&in=${payload.searchIn}`,
        headers: {
        }
    };

    const response = await axios.request(config)
    return response.data.articles;
}


export async function getTopHeadLinesByCountry(payload: {
    category: 'general' | 'world' | 'nation',
    countryCode: string,
}) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://gnews.io/api/v4/top-headlines?category=${payload.category}&apikey=${process.env.GNEWS_API_KEY}&country=${payload.countryCode}`,
        headers: {

        }
    };

    const response = await axios.request(config)
    return response.data.articles

}