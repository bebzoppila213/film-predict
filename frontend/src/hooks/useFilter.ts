import { useState } from "react";


type StateType = string | object

export default function useFilter<T>(defaultState: T[], fields?: string[]){
    const [data, setdata] = useState<T[]>(defaultState);
    const [filterState, setFilterState] = useState('')

    const updateFilterState = (text: string) => {
        setFilterState(text)
    }

    const filterData = () => {
        return data.filter(dataItem => {
            if(typeof dataItem !== 'object'){
                return String(dataItem).toLowerCase().includes(filterState.toLowerCase())
            }

        })
    }

    return{
        data,
        filterState,
        setdata,
        updateFilterState,
        filterData
    }
}