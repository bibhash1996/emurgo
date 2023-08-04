import { cache } from "./init";


function set(key: string, value: string, expiryInSeconds?: number) {
    return cache.set(key, value, expiryInSeconds);
}

function get(key: string) {
    return cache.get(key);
}

export default {
    set, get
}