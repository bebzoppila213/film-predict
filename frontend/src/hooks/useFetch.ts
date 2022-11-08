import { useEffect, useState } from "react";
import axios from "axios";



export default function useFetch<T, Y extends object>(defaultState: T, params: Y , url: string,token: string = '', first: boolean = true,) {
  
  const [allData, setAllData] = useState(defaultState);
  const [apiParams, setApiParams] = useState(params)
  const [isFirst, setIsFits] = useState(first)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    
    
    if(isFirst){
      setIsFits(false)
      return
    }
    setIsLoading(true)
    axios.get(url, { params: apiParams, headers: {"authorization": token} })
      .then(function (response) {
        setIsLoading(false)
        setAllData(response.data)
      });
  }, [apiParams]);

  const updateParams = (paramsField: keyof Y, value: string) => {
    console.log(value);
    
    setApiParams({...apiParams, [paramsField]: value})
  }

  const updateAllParams = (params: Y) => {
    setApiParams({...params})
  }

  return{
    isLoading,
    apiParams,
    allData,
    updateParams,
    updateAllParams
  }
}
