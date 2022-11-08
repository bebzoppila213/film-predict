import { PrismaClient } from '@prisma/client'

export default class BaseService{
    protected prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

}