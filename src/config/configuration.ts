import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Logger } from '@nestjs/common';

const logger = new Logger('Configuration');

/**
 * Init dotenv configuration
 */
logger.log('Loading Nest configuration...')
dotenvExpand(dotenv.config());

/**
 * Environment Variables Assigning
 */
export const config = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL,
    MERCHANT_CODE: process.env.MERCHANT_CODE,
    MERCHANT_KEY: process.env.MERCHANT_KEY,
    PRODUCTION: process.env.PRODUCTION === 'true' ? true : false
}

/**
 * Required Key Validation
 */
Object.keys(config).forEach(key => {
    if(!config.PRODUCTION) {
        logger.debug(`${key}: ${config[key]}`);
    }
    
    const excluded = [];
    if (config[key] === undefined && !excluded.includes(key)) {
        logger.error(`"${key}" is not defined, please check the .env configuration file`);
        throw new Error('Configuration Not Found');
    }
});