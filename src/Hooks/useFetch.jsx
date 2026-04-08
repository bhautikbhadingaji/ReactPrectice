import axios from "axios";
import { useEffect, useState } from "react"

export const useFetch = (url) => {

    const [data, setData] = useState();


    useEffect(() => {
      const useFetchData = async() =>{
        const res = await axios.get(url)
        setData(res.data)
      }
      useFetchData()
  }, [url]);

  return [data];
}