import FilmListItem from "./FilmListItem";
import { IFilm } from "../pages/Films"

type FilmListProps = {
    films: IFilm[]
}

export default function FilmList({ films }:FilmListProps) {
  return (
    <div className="films-list">
        {
            films.map(film => <FilmListItem film={film}></FilmListItem>)
        }
      
    </div>
  );
}
