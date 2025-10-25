import path from "path";
import {configDotenv} from "dotenv";

const rootPath = __dirname;
configDotenv();

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: 'mongodb://localhost/my-project',
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
};

export default config;