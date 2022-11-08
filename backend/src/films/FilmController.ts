import { BaseController, RouterConfigItemType } from "../BaseController";
import FilmService from "./FilmService";
import { NextFunction, Request, Response } from "express";


type FilmQueryParamsType = {name: string, genres: string, year: string, pagination: string} 

export class FilmController extends BaseController {
  protected getRouterConfig(): RouterConfigItemType[] {
    return [
      { method: "get", url: "/years", handler: this.getUniqueYears.bind(this), middleware: [] },
      {
        method: "get",
        url: "/genres",
        handler: this.getUniqueGenres.bind(this),
        middleware: []
      },
      {
        method: "get",
        url: "/films",
        handler: this.getFilmsByParams.bind(this),
        middleware: [this.chekedQueryParams.bind(this)]
      },
    ];
  }

  private async getUniqueYears(req: Request, res: Response) {
    console.log('Получить все года');
    const filmService = new FilmService();
    const allYears = await filmService.getUniqueYears();
    res.send(JSON.stringify(allYears));
  }

  private async getUniqueGenres(req: Request, res: Response) {
    console.log('Получить жанры кино');
    const filmService = new FilmService();
    const allGenress = await filmService.getUniqueGenres();
    res.send(JSON.stringify(allGenress));
  }

  private async getFilmsByParams(req: Request<any, any, any, FilmQueryParamsType>, res: Response) {
    console.log('Получить фильмы по параметрам');
    const filmService = new FilmService();
    
    const films = await filmService.getFilmsByParams(this.toNumberOrUndefainded2(req.query.name), this.toNumberOrUndefainded2(req.query.genres), this.toNumberOrUndefainded(req.query.year), this.toNumberOrUndefainded(req.query.pagination))
    res.send(JSON.stringify(films));
  }

  private async chekedQueryParams(req: Request<any, any, any, FilmQueryParamsType>, res: Response, next: NextFunction) {
    
    next()
  }

  private getParamsOrDefaultValue<T>(value: T, delault: T){
    return value ? value : delault
  }

  private toNumberOrUndefainded(str: string){
    return str.length !== 0 ? Number(str) : undefined 
  }

  private toNumberOrUndefainded2(str: string){
    return str.length !== 0 ? String(str) : undefined 
  }
}
