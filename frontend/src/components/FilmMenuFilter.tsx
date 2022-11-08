import axios from "axios";
import { useEffect, useState } from "react";
import useFilter from "../hooks/useFilter";
import CustomSelect from "./CostomSelect";
import { IFilmParams } from "../pages/Films";

type FilmMenuFilterProps = {
  updateAllParams: (params: IFilmParams) => void
}

export default function FilmMenuFilter({updateAllParams}:FilmMenuFilterProps) {
  const [formValues, setFormValues] = useState<IFilmParams>({
    name: "",
    genres: "",
    year: "",
    pagination: "",
  });

  const updateFormValue = (key: keyof IFilmParams, value: string) => {
    setFormValues({...formValues, [key]: value})
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateAllParams(formValues)
  }
  

  return (
    <form onSubmit={event => submitForm(event)} className="form mt-2">
      <input onInput={(event) => updateFormValue('name', event.currentTarget.value)} className="form-control" type="text" />
      <CustomSelect plaseholder="Выберите жанр" updateSelectValue={(text) => updateFormValue('genres', text)} url={"http://localhost:8000/films/genres"} />
      <CustomSelect plaseholder="Выберите год" updateSelectValue={(text) => updateFormValue('year', text)} url={"http://localhost:8000/films/years"} />
      <button className="btn btn-primary mt-2">Поиск</button>
    </form>
  );
}
