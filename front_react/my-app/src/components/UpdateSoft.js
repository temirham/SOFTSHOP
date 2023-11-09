import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {useSofts} from "../slices/dataSlice";
import Header from "./Header";
import BasicExample from "./Navig";
import axios from "axios";
import {useNavigate, useParams} from "react-router";




export default function UpdateSoft(){
    const {id} = useParams();
    const soft = useSofts()[id - 1]
    const number = id
    const navigate = useNavigate()
    console.log(soft)
    const [formData, setFormData] = useState({
        name:'',
        address:'',
        img:'',
        price:'',
    });
    const {name, address, img, price} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();


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
        const body = JSON.stringify({name, address, img, price, number})
        axios.put(`http://localhost:8000/softs/${soft.id}/`, body, config).then((data) => {
            console.log(data)
            navigate('/catalog'); 
        })
        
    }

    return (
        <div className='wrapper clear'>
            <Header/>
            <BasicExample/>
            <h1 className='content p-50'>Форма редактирования софта</h1>
            <form onSubmit={e => onSubmit(e)}>
                {/*<CSRFToken/>*/}
                <div className='form-group'>
                    <label className='form-label'>Название:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='название софта'
                        name='name'
                        onChange={e => onChange(e)}
                        value={name}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Описание:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='описание софта'
                        name='address'
                        onChange={e => onChange(e)}
                        value={address}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Цена:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='цена софта'
                        name='price'
                        onChange={e => onChange(e)}
                        value={price}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Изображение:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='*вставьте в это поле ссылку на изображение'
                        name='img'
                        onChange={e => onChange(e)}
                        value={img}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Добавить</button>
            </form>
        </div>
    )
};
