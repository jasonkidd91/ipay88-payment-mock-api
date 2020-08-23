import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

/**
 * Init dotenv configuration
 */
dotenvExpand(dotenv.config());

export const config = {
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT || 3000,
    MERCHANT_CODE: process.env.MERCHANT_CODE,
    MERCHANT_KEY: process.env.MERCHANT_KEY,
}
