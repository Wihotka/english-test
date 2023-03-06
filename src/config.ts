const config:any = {};

const domainsWithInsideMode = ['amakids.ru'];
const insideMode = domainsWithInsideMode.includes(window.location.hostname);

config.prodMode = process.env.NODE_ENV === 'production';
config.appPath = config.prodMode ? (insideMode ? '/platform' : '') + '/apps/mentalArithmetic/' : '/';
config.root = 'https://' + window.location.hostname;
config.host = config.prodMode ? 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/apps/mentalArithmetic/' : 'https://' + window.location.host + '/';
config.apiHost = 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/api/';
config.soundsPath = config.root + (insideMode ? '/platform' : '') + '/views/smartum/sounds/';
config.personalCabinet = config.root + (insideMode ? '/platform' : '') + '/apps/student/';

config.path = {
    main: config.appPath,
};

export default config;