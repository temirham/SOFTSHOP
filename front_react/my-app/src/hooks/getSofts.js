import {useEffect} from "react";
import axios from "axios"
import {setSoftsAction} from "../slices/dataSlice";
import {useDispatch} from "react-redux";


export function GetSofts() {
    const dispatch = useDispatch()
    async function fetchData() {
        const response = await axios.get('http://localhost:8000/softs/') // получение данных с API
        dispatch(setSoftsAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])
}

