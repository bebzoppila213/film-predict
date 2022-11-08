import { BaseController, RouterConfigItemType } from "../BaseController";
import UserService from "./UserService";
import { NextFunction, Request, Response } from "express";
import Schema from 'validate'
import FilmService from "../films/FilmService";
import { Film } from "@prisma/client";
import { PythonShell, Options } from "python-shell";

const pythonRun = (filmId: string) => {
    
    let options: Options = {
      mode: "json",
      encoding: "utf-8",
      pythonOptions: ["-u"], // get print results in real-time
      // scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
      args: [filmId], //An argument which can be accessed in the script using sys.argv[1]
    };
  
    return new Promise((resolve, reject) => {
      PythonShell.run( "D:/film/backend/dist/scripts/index.py",
        options,
        function (err, result: any) {
          if (err) reject();
          if (result !== undefined) {
            console.log(result);
            
            resolve(result[0]);
          } else {
            reject(result);
          }
        }
      );
    })
  };

const requestBodyRegister = new Schema({
    email: {type: String, required: true, length: { min: 3, max: 32 }},
    password: {type: String, required: true, length: { min: 3, max: 32 }},
    name: {type: String, required: true, length: { min: 2, max: 32 }},
})


const requestBodyAuth = new Schema({
    email: {type: String, required: true, length: { min: 3, max: 32 }},
    password: {type: String, required: true, length: { min: 3, max: 32 }},
})

export interface IUserCreateBody{
    email: string,
    password: string,
    name: string
}

export interface IUserAuthBody{
    email: string,
    password: string,
}

export interface AddFilmBody{
    filmId: string
    userId: string
}

export interface IUserPredictBody{
    userId: string
}

export interface IUserPredictQuery{
    filmId: string
}

export class UserController extends BaseController {

    protected getRouterConfig(): RouterConfigItemType[] {
        return [
          { method: "post", url: "/create", handler: this.create.bind(this), middleware: [this.validateBodyRegister.bind(this)] },
          { method: "post", url: "/auth", handler: this.auth.bind(this), middleware: [this.validateBodyAuth.bind(this)] },
          { method: "post", url: "/add-film", handler: this.addFilm.bind(this), middleware: [this.checkedUserToken.bind(this)] },
          { method: "get", url: "/predict", handler: this.getUserPredictFilms.bind(this), middleware: [this.checkedUserToken.bind(this)] },
          { method: "get", url: "/selected-films", handler: this.getAllFilmFormUser.bind(this), middleware: [this.checkedUserToken.bind(this)] },
        ];
      }

    private async create(req: Request<any, any, IUserCreateBody>, res: Response){
        console.log('Создание пользователя');
        
        const service = new UserService()
        const user = await service.create(req.body.email, req.body.name, req.body.password)
        if(user){
            this.send(res, 201,true, 'Пользователь создан', {...user, password: ''})
        }else{
            this.send(res, 409, false, 'Не удалось создать пользователя',)
        }
    }

    private async auth(req: Request<any, any, IUserAuthBody>, res: Response){
        console.log('Авторизация');
        const service = new UserService()
        const user = await service.auth(req.body.email, req.body.password)
        if(user){
            this.send(res, 200,true, 'Пользователь авторизован', {...user, password: ''})
        }else{
            this.send(res, 403, false, 'Пользователь не авторизован',)
        }    
    }

    private async addFilm(req: Request<any, any, AddFilmBody>, res: Response){
        console.log('Добавление фильма');
        const service = new UserService()
        const result = await service.addFilmFromUser(Number(req.body.userId), Number(req.body.filmId))
        if(result){
            this.send(res, 200,true, 'Фильм добавлен', {})
        }else{
            this.send(res, 409,true, 'Фильм не добавлен', {})
        }
    }

    private async checkedUserToken(req: Request, res: Response, next: NextFunction){

        if(req.headers.authorization === undefined){
            this.send(res, 403, false, 'Пользователь не авторизован',)
            return null
        }

        const service = new UserService()
        const user = await service.checkedToken(req.headers.authorization )
        if(user !== null){
            req.body.userId = String(user.id)
            next()
        }
        // res.send(req.headers.authorization)
    }

    private async getUserPredictFilms(req: Request<any, any, IUserPredictBody, IUserPredictQuery>, res: Response,){
        console.log('Получение прогноза');
        const servie = new UserService();
        const result = await pythonRun(req.query.filmId) as number[]
        const filmService = new FilmService()
        const predictFilms:Film[] = []


        for (const iterator of result) {
            const res = await filmService.getFimById(iterator)
        
            if(res !== null){
              predictFilms.push(res)
            }
          }

        res.send(JSON.stringify(predictFilms))
        
    }

    private async getAllFilmFormUser(req: Request, res: Response,){
        console.log('Получение фильмов пользователя');
        const servie = new UserService();
        const allFilms = await servie.getAllFilmsFromUser(Number(req.body.userId));
        res.send(JSON.stringify(allFilms))
    }

    private validateBodyRegister(req: Request<any, any, IUserCreateBody>, res: Response, next: NextFunction){
        if(requestBodyRegister.validate(req.body).length === 0){
            next()
        }else{
            this.send(res, 400, false, 'Ошибка валидации',)
        }
        
    }   

    private validateBodyAuth(req: Request<any, any, IUserAuthBody>, res: Response, next: NextFunction){
        if(requestBodyAuth.validate(req.body).length === 0){
            next()
        }else{
            this.send(res, 400, false, 'Ошибка валидации',)
        }
    }
}