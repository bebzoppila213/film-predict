import axios from "axios";
import { useEffect, useState } from "react";
import useFilter from "../hooks/useFilter";

type CustomSelectType = {
    url: string,
    updateSelectValue: (text: string) => void,
    plaseholder: string
}

export default function CustomSelect({url, updateSelectValue, plaseholder}:CustomSelectType) {
  const { setdata, updateFilterState, filterData, filterState } = useFilter<string>([]);

  const [listIsOpen, setListIsOpen] = useState(false);

  useEffect(() => {
    axios.get(url).then(function (response) {
      setdata(response.data.sort());
    });
  }, []);


  useEffect(() => {
    updateSelectValue(filterState)
  }, [filterState])

  return (

      <div
        onClick={() => setListIsOpen(!listIsOpen)}
        className="form__item custom-select mt-2"
      >
        <input
          onInput={(event) => updateFilterState(event.currentTarget.value)}
          value={filterState}
          className="form__item-input form-control"
          placeholder={plaseholder}
          type="text"
        />
        <ul
          className={
            "custom-select__list list-group" +
            (listIsOpen ? " custom-select__list--open" : " ")
          }
        >
          {filterData().map((genr) => (
            <li
              onClick={() => updateFilterState(String(genr))}
              className="custom-select__item list-group-item"
            >
              {genr}
            </li>
          ))}
        </ul>
      </div>
  );
}
