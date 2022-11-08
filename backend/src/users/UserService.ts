import { User } from "@prisma/client";
import BaseService from "../BaseService";
import CurrentUser from "./User";
import { verify } from "password-hash";


export default class UserService extends BaseService {
  public async create(
    email: string,
    name: string,
    password: string
  ): Promise<User | null> {
    const user = new CurrentUser(email, name);
    user.generateToken();
    user.hashPassword(password);

    try {
      return await this.prisma.user.create({ data: user.getAllFields() });
    } catch (error) {
      return null;
    }
  }

  public async auth(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    
    if (user !== null && verify(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }

  public async checkedToken(token: string){
    const user = await this.prisma.user.findFirst({ where: { token } });
    return user
  }

  public async addFilmFromUser(userId: number, filmId: number){
    try{
      await this.prisma.usersOnFilms.create({data: {userId, filmId, like: true}})
      return true
    }catch{
      return false
    }
  }

  public async getAllFilmsFromUser(userId: number){
    return await this.prisma.film.findMany({where: {users: {some: {userId: userId}}}})
    // return await this.prisma.usersOnFilms.findMany({where: {user: {id: userId}}})
  }
}
