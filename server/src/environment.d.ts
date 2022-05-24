declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      TOKEN_SECRET: string;
      EMAIL_HOST: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      EMAIL_PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
