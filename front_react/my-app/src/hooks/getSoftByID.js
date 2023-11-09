import {useDispatch} from "react-redux";
import axios, {options} from "axios";
import {setBookingSoftAction, setSoftsAction} from "../slices/dataSlice";
import {useEffect} from "react";
import Cookies from "js-cookie";

export async function GetSoftByID(id){
    const dispatch = useDispatch()
    async function fetchData() {
        const response = await axios.get(`http://127.0.0.1:8000/paymentbyuser?user=${id}`)
        dispatch(setBookingSoftAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])

}