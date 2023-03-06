import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import config from './config';

export default i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        // resources,
        lng: 'ru', // if you're using a language detector, do not define the lng option
        fallbackLng: 'ru',

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        backend: {
            loadPath: `${config.host}locales/{{lng}}/{{ns}}.json?v=` + process.env.npm_package_version
        }
    });