import { useEffect, useState } from "react";
import FilmList from "../components/FilmList";
import axios from "axios";
import FilmMenuFilter from "../components/FilmMenuFilter";
import useFetch from "../hooks/useFetch";
export interface IFilm {
  age_restriction: number;
  big_poster: string;
  countries: string;
  description: string;
  genres: string;
  id: number;
  name_russian: string;
  rating_imdb: number;
  rating_kp: number;
  slogan: string;
  small_poster: string;
  year: number;
}

export interface IFilmParams{
  name: string,
  genres:  string,
  year:  string,
  pagination: string,
}

export default function Films() {
  const fechFilmParams = {
    name: '',
    genres: '',
    year: '',
    pagination: '10',
  };

  const { allData, updateParams, updateAllParams, apiParams } = useFetch<IFilm[], IFilmParams>([], fechFilmParams, "http://localhost:8000/films/films");
  // const [allFilms, setAllFilms] = useState<IFilm[]>([]);
  // const [params, setparams] = useState();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/films/films", { params: params })
  //     .then(function (response) {
  //       console.log(setAllFilms(response.data));
  //     });
  // }, []);

  return (
    <section>
      <div className="container">
        <FilmMenuFilter updateAllParams={updateAllParams}></FilmMenuFilter>
        <FilmList films={allData}></FilmList>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={() => updateParams('pagination', String(Number(apiParams.pagination) + 5))} className="btn btn-success">Загрузить ещё</button>
        </div>
      </div>
    </section>
  );
}
