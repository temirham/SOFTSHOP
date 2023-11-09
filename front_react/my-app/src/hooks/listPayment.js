import {useEffect} from "react";
import axios from "axios"
import {useDispatch} from "react-redux";
import {setPaymentAction} from "../slices/dataSlice";


export function ListPayment() {
    const dispatch = useDispatch()
    async function fetchData(){
        const config = {
            withCredentials: true,
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': document.cookie
                    .split('; ')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            }
        }
        const response = await axios.get('http://localhost:8000/payments/', config) // получение данных с API
            dispatch(setPaymentAction(response.data))
    }
    useEffect(() => {
        fetchData()
    }, [])
}