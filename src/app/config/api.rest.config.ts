interface IRestConfig {
  api_url_server: string;
  token_endpoint: string;
  api_url_resource: string;
  api_url_resource_base: string;
}

const apiVersion = 'v1.0';

const apiConfig: IRestConfig = {
  api_url_resource: `http://localhost:8202/api/${apiVersion}/`,
  api_url_resource_base: `http://localhost:8201/api/${apiVersion}/`,
  api_url_server: 'http://localhost:8200',
  token_endpoint: '/oauth/token',
};

const API_URL = {
  API_RESOURCE_URL: apiConfig.api_url_resource as string,
  API_BASE_URL: apiConfig.api_url_resource_base as string,
  OAUTH2_SERVER: apiConfig.api_url_server as string,
  TOKEN_ENDPOINT: apiConfig.token_endpoint as string,
};

enum OAUTH2_CREDENTIALS  {
  CLIENT_ID = 'oauth2',
  CLIENT_PASSWORD = 'oauth2secret',
}

enum OAUTH2_GRANT_TYPES {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials',
  IMPLICIT = 'implicit',
  AUTHORIZATION_CODE = 'authorization_code',
  DEVICE_CODE = 'device_code',
}

export {API_URL, OAUTH2_CREDENTIALS, OAUTH2_GRANT_TYPES};
