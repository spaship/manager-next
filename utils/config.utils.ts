interface Config {
  host: string;
  token: string;
}

const configs: Config = {
  host: process.env.HOST || '',
  token: process.env.AUTHENTICATION_TOKEN || '',
}

export function getHost() {
  return configs.host;
}

export function getToken() {
  return configs.token;
}