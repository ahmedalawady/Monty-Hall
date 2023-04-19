import express from 'express';
import { IRoute } from './IRoute';

export default class Routes {
  constructor(private app: express.Application, private apis: IRoute[]) {
    this.app = app;
    this.apis = apis;
    this.routes();
  }

  private routes() {
    for (const api of this.apis) {
      api.routes();
    }
  }
}
