import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import FilmService from "./films/FilmService";
import { FilmController } from "./films/FilmController";
import cors from "cors";
import { UserController } from "./users/UserController";
import { PythonShell, Options } from "python-shell";
import UserService from "./users/UserService";
import { Film } from "@prisma/client";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const filmController = new FilmController();
const userController = new UserController();

app.use("/films", filmController.getRouter());
app.use("/user", userController.getRouter());

const pythonRun = (filmId: string) => {
  let options: Options = {
    mode: "json",
    encoding: "utf-8",
    pythonOptions: ["-u"], // get print results in real-time
    // scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
    args: [filmId], //An argument which can be accessed in the script using sys.argv[1]
  };

  return new Promise((resolve, reject) => {
    PythonShell.run(
      __dirname + "/scripts/index.py",
      options,
      function (err, result: any) {
        if (err) reject();
        if (result !== undefined) {
          resolve(result[0]);
        } else {
          reject(result);
        }
      }
    );
  })
};


app.get("/", async (req: Request, res: Response) => {
  
  // const predictFilms = await getPredictFilms(String(allFilmId[0]))
  res.send(JSON.stringify('predictFilms'));

  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
