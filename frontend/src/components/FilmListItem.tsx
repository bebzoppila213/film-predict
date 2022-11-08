import { useAppDispatch } from "../hooks/redux";
import { IFilm } from "../pages/Films";
import { addUserFilm } from "../state/userSlice"
type FilmListItemProps = {
  film: IFilm;
};

export default function FilmListItem({ film }: FilmListItemProps) {
  const dispatcher = useAppDispatch()

  const onBtnClick = () => {
    dispatcher(addUserFilm({filmId: String(film.id)}))
  }

  return (
    <div className="films-item flex-row mt-5" style={{ width: "18rem;" }}>
      <img src={(film.small_poster || film.big_poster)} className="card-img-top card__img" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{film.name_russian}</h5>
        <p className="card-text">{film.description}</p>
        <p className="card-text text-primary">Рейтинг кинопоиска {film.rating_kp}</p>
        <p className="card-text text-primary">{film.genres}</p>
        <button onClick={() => onBtnClick()} className="btn btn-primary">Отметить как нравится</button>
      </div>
    </div>
  );
}
