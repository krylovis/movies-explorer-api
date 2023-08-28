require('dotenv').config();

const { MONGO_URL, BD_NAME, NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
const MONGOOSE_URL = isProduction ? MONGO_URL : 'mongodb://127.0.0.1:27017';
const MONGOOSE_BD = isProduction ? BD_NAME : 'bitfilmsdb';

module.exports.MONGOOSE_FULL_URL = `${MONGOOSE_URL}/${MONGOOSE_BD}`;
