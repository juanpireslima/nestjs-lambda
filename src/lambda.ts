import { NestFactory } from "@nestjs/core";
import { configure } from '@vendia/serverless-express';
import { AppModule } from "./app.module";

let server;

export const handler = async(
  event,
  context,
  callback,
) => {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();

    server = configure({
      app: expressApp,
    });
  };

  return server(event, context, callback);
};