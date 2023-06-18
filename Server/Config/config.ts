import path from "path";
import dotenv from "dotenv";


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ENV {
    LOCAL_DB: string | undefined;
    PRODUCTION_DB: string | undefined;
}

interface Config {
    LOCAL_DB: string;
    PRODUCTION_DB: string;
}


// Loading process.env as ENV interface
const getConfig = (): ENV => {
    return {
        LOCAL_DB: process.env.LOCAL_DB_URL,
        PRODUCTION_DB: process.env.PRODUCTION_DB_URL,
    };
};

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;