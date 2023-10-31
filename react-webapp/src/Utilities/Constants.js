const API_BASE_URL_DEV = 'https://localhost:7139';
const API_BASE_URL_PROD = 'https://team777.azurewebsites.net';

const ENDPOINTS = {

    PERSON_GET_ALL: '/api/Person',
    PERSON_GET_BY_ID: '/api/Person',
    PERSON_GET_BY_EMAIL: '/api/Person/Email',
    PERSON_UPDATE: '/api/Person',
    PERSON_ADD: '/api/Person',
    PERSON_DELETE: '/api/Person',
    PERSON_LOGIN: '/api/Person/Login',

    ABSENCE_GET_ALL: '/api/Absence',
    ABSENCE_GET_BY_ID: '/api/Absence',
    ABSENCE_GET_BY_PERSON_ID: '/api/Absence/PersonID',
    ABSENCE_UPDATE: '/api/Absence',
    ABSENCE_ADD: '/api/Absence',
    ABSENCE_DELETE: '/api/Absence',

    ABSENCETYPE_GET_ALL: '/api/AbsenceType',
    ABSENCETYPE_GET_BY_ID: '/api/AbsenceType',
    ABSENCETYPE_UPDATE: '/api/AbsenceType',
    ABSENCETYPE_ADD: '/api/AbsenceType',
    ABSENCETYPE_DELETE: '/api/AbsenceType',
}

const developement = {

    API_URL_GET_PERSON_ALL: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_GET_ALL}`,
    API_URL_GET_PERSON_ID: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_GET_BY_ID}`,
    API_URL_GET_PERSON_EMAIL: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_GET_BY_EMAIL}`,
    API_URL_ADD_PERSON: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_ADD}`,
    API_URL_UPDATE_PERSON: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_UPDATE}`,
    API_URL_DELETE_PERSON: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_DELETE}`,
    API_URL_LOGIN_PERSON: `${API_BASE_URL_DEV}${ENDPOINTS.PERSON_LOGIN}`,

    API_URL_GET_ABSENCE_ALL: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_GET_ALL}`,
    API_URL_GET_ABSENCE_ID: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_GET_BY_ID}`,
    API_URL_GET_ABSENCE_PERSONID: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_GET_BY_PERSON_ID}`,
    API_URL_ADD_ABSENCE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_ADD}`,
    API_URL_UPDATED_ABSENCE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_UPDATE}`,
    API_URL_DELETE_ABSENCE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCE_DELETE}`,

    API_URL_GET_ABSENCETYPE_ALL: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_GET_ABSENCETYPE_ID: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_ADD_ABSENCETYPE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_UPDATE_ABSENCETYPE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_DELETE_ABSENCETYPE: `${API_BASE_URL_DEV}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
}

const production = {

    API_URL_GET_PERSON_ALL: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_GET_ALL}`,
    API_URL_GET_PERSON_ID: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_GET_BY_ID}`,
    API_URL_GET_PERSON_EMAIL: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_GET_BY_EMAIL}`,
    API_URL_ADD_PERSON: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_ADD}`,
    API_URL_UPDATE_PERSON: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_UPDATE}`,
    API_URL_DELETE_PERSON: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_DELETE}`,
    API_URL_LOGIN_PERSON: `${API_BASE_URL_PROD}${ENDPOINTS.PERSON_LOGIN}`,

    API_URL_GET_ABSENCE_ALL: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_GET_ALL}`,
    API_URL_GET_ABSENCE_ID: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_GET_BY_ID}`,
    API_URL_GET_ABSENCE_PERSONID: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_GET_BY_PERSON_ID}`,
    API_URL_ADD_ABSENCE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_ADD}`,
    API_URL_UPDATED_ABSENCE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_UPDATE}`,
    API_URL_DELETE_ABSENCE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCE_DELETE}`,

    API_URL_GET_ABSENCETYPE_ALL: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_GET_ABSENCETYPE_ID: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_ADD_ABSENCETYPE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_UPDATE_ABSENCETYPE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
    API_URL_DELETE_ABSENCETYPE: `${API_BASE_URL_PROD}${ENDPOINTS.ABSENCETYPE_GET_ALL}`,
}

const Constants = process.env.NODE_ENV === 'developement' ? developement : production;

export default Constants;