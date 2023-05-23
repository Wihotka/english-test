const config:any = {};

const domainsWithInsideMode = ['amakids.ru', 'amakids.com'];
const insideMode = domainsWithInsideMode.includes(window.location.hostname);
config.prodMode = process.env.NODE_ENV === 'production';
config.appPath = config.prodMode ? (insideMode ? '/platform' : '') + '/apps/introTests/' : '/';
config.root = 'https://' + window.location.hostname;
config.host = config.prodMode ? 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/apps/introTests/' : 'https://' + window.location.host + '/';
config.apiHost = 'https://' + window.location.hostname + (insideMode ? '/platform' : '') +  '/api/';
config.favicon = config.prodMode ? (insideMode ? '/platform' : '') : '/';
config.personalCabinet = config.root + (insideMode ? '/platform' : '') + '/apps/student/';
config.personalTests = config.personalCabinet + ''; // TODO вставить нужный путь к разделу с тестами
config.website = 'https://amakids.ru/';
config.isIsolated = process.env.ISOLATED === 'true';

config.path = {
    main: config.appPath,
    subject: config.appPath + ':subject/:source'
};

config.options = {
    english: ['sixToTen', 'elevenToFourteen']
};

export default config;