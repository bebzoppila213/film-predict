import { uid, suid } from 'rand-token';
import { generate, verify } from "password-hash"
// console.log(passwordHash.verify('password123', hashedPassword)); // true
export default class CurrentUser{
    private email: string
    private token: string
    private name: string
    private password: string

    constructor(email: string, name: string){
        this.email = email
        this.name = name
    }

    public hashPassword(password: string){
        this.password = generate(password)
    }

    public generateToken(){
        this.token = uid(30)
    }

    public getAllFields(){
        return{
            email: this.email,
            name: this.name,
            password: this.password,
            token: this.token,
        }
    }
    
}