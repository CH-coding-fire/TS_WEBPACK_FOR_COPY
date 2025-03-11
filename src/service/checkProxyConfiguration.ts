import axios from "axios";

export const checkProxyConfiguration = async () => {
    console.log('Current env settings:', {
        HTTP_PROXY: process.env.GLOBAL_AGENT_HTTP_PROXY,
        HTTPS_PROXY: process.env.GLOBAL_AGENT_HTTPS_PROXY,
        NO_PROXY: process.env.GLOBAL_AGENT_NO_PROXY,
    });

    try {
        const directIp = await axios.get('https://httpbin.org/ip', {
            proxy: false
        });        
        const proxiedIp = await axios.get('https://httpbin.org/ip');
        console.log('Direct IP1:', directIp.data);
        console.log('Proxied IP1:', proxiedIp.data);
        const directIp2 = await axios.get('https://httpbin.org/ip');
        const proxiedIp2 = await axios.get('https://httpbin.org/ip');

        console.log('Direct IP2:', directIp2.data);
        //programatically get local ip
        
        const localIp = '59.148.82.151';
        if (directIp.data.origin === localIp || directIp2.data.ip === localIp || proxiedIp.data.origin === localIp || proxiedIp2.data.ip === localIp) {
            throw new Error(`MY PUBLIC IP (${localIp}) IS EXPOSED...`);
        }

        //check if directIp and directIp2 are the same
        if (directIp.data.origin === directIp2.data.origin) {
            throw new Error('Direct IP1 and Direct IP2 are the same, there are some problem occurred...');
        }
        if (proxiedIp2.data.origin === proxiedIp.data.origin) {
            throw new Error('Proxied IP1 and Proxied IP2 are the same, there are some problem occurred...');
        }
        console.log('All IP checks passed, ok...');
    } catch (error) {
        //issue with proxy configuration
        throw error;
    }
}


