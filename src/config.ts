const config:any = {};

const domainsWithInsideMode = ['amakids.ru'];
const insideMode = domainsWithInsideMode.includes(window.location.hostname);

config.prodMode = process.env.NODE_ENV === 'production';
config.appPath = config.prodMode ? (insideMode ? '/platform' : '') + '/apps/intro-tests/' : '/';
config.root = 'https://' + window.location.hostname;
config.host = config.prodMode ? 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/apps/intro-tests/' : 'https://' + window.location.host + '/';
config.apiHost = 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/api/';
config.personalCabinet = config.root + (insideMode ? '/platform' : '') + '/apps/student/';
config.isIsolated = process.env.ISOLATED === 'true';

config.path = {
    main: config.appPath,
    subject: config.appPath + ':subject/:source'
};

config.options = {
    english: ['sixToTen', 'elevenToFourteen']
};

export default config;