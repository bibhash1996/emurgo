/**
 * 
 * All initialisation related tasks happend here
 * For eg: DB Connection, Redis connection, Singleton object creation etc etc
 * 
 */
import NodeCache from 'node-cache';

let cache: NodeCache;

/**
 * Using in memory Cache
 */

async function initialise() {
    cache = new NodeCache();
}

export { initialise, cache };
