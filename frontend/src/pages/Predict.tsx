import FilmList from "../components/FilmList";
import { useAppSelector } from "../hooks/redux";
import useFetch from "../hooks/useFetch";
import { IFilm } from "./Films";

type FilmPredictParams = {
    filmId: string
}

export default function Predict() {
  const user = useAppSelector(state => state.user)
  const { allData, updateParams, apiParams, isLoading } = useFetch<IFilm[], FilmPredictParams>(
    [],
    {filmId: ''},
    "http://localhost:8000/user/predict",
    user.token
  );
    

  const selectedFilms = useFetch<IFilm[], any>(
    [],
    {},
    "http://localhost:8000/user/selected-films",
    user.token,
    false
  );
    console.log(selectedFilms);
    
  return (
    <section className="predict">
      <div className="container">
        <div className="predict__inner">
            <div className="list mt-2">
            <ul className="list-group predict-list">
            {
                selectedFilms.allData.map((film) => <li onClick={() => updateParams('filmId', String(film.id))} className="list-group-item predict-list-item">{film.name_russian}</li>)
            }
          </ul>
            </div>
            
            {
              isLoading ? <div className="lds-hourglass"></div> : ' '
            }
          <FilmList films={allData}></FilmList>
        </div>
      </div>
    </section>
  );
}
