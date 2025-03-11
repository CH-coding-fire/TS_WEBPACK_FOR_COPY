import dotenv from 'dotenv';
import { bootstrap } from 'global-agent';
import { checkProxyConfiguration } from '../service/checkProxyConfiguration';
dotenv.config();
export const configureProxy = async () => {
    console.log('Configuring proxy...');
    const proxyUsername = process.env.SMARTPROXY_USERNAME;
    const proxyPassword = encodeURIComponent(process.env.SMARTPROXY_PASSWORD || ''); // Properly encodes special characters
    console.log("proxyPassword", proxyPassword);
    const proxyHost = process.env.SMARTPROXY_HOST;
    if (!proxyUsername || !proxyPassword || !proxyHost) {
        console.log(proxyUsername, proxyPassword, proxyHost);
        throw new Error('Proxy configuration is not set');
    }
    process.env.GLOBAL_AGENT_HTTP_PROXY = `http://${proxyUsername}:${proxyPassword}@${proxyHost}`;
    process.env.GLOBAL_AGENT_HTTPS_PROXY = `http://${proxyUsername}:${proxyPassword}@${proxyHost}`;
    process.env.GLOBAL_AGENT_NO_PROXY = '*.mongodb.net,mongodb.net';
    bootstrap();
    await checkProxyConfiguration();

};