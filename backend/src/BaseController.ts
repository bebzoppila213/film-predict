import { Router, Request, Response, NextFunction } from "express";
import http from "node:http"
export type RouterMidlwareType = (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => void;

export type RouterConfigItemType = {
  method: "get" | "post" | "delete";
  url: string;
  handler: (req: Request<any, any, any, any, any>, res: Response) => void;
  middleware: RouterMidlwareType[]
};

export abstract class BaseController {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const routerConfig = this.getRouterConfig();
    routerConfig.forEach((routerItem) => {
      this.router[routerItem.method](routerItem.url, [...routerItem.middleware,routerItem.handler]);
    });
  }

  public getRouter() {
    return this.router;
  }

  protected send(res: Response, status: number, ok: boolean, message: string, data?: any, ){
    res.status(status).send({ok: ok, message: message, data: data})
  }

  protected abstract getRouterConfig(): RouterConfigItemType[];
}
