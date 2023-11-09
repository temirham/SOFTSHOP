import Header from "./Header";
import BasicExample from "./Navig";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {usePayment} from "../slices/dataSlice";
import {ListPayment} from "../hooks/listPayment";
import NavDropdown from "react-bootstrap/NavDropdown";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";


const getPayment = async () =>{
    const options = {
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
    const res = await axios.get(`http://localhost:8000/payments/`, options)
    return res
}

const getPaymentFilter = async (status = "") =>{
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
    const res = await axios.get(`http://localhost:8000/paymentfilter?status=${status}`, config)
    return res
}

const getPaymentDateFilter = async (start, end) =>{
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
    const res = await axios.get(`http://localhost:8000/paymentdatefilter?start=${start}&end=${end}`, config)
    return res
    // fetch(`http://localhost:8000/paymentdatefilter`, config)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // const res = await axios.post(`http://localhost:8000/paymentdatefilter`, config)
    // return res
}

const putPayment = async (payment, date, status) =>{
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: JSON.stringify({
            id: payment.id_field,
            soft: payment.soft,
            user: payment.user,
            status: status,
            date_open: payment.date_open,
            date_pay: date,
            // date_close: "2023-06-21",
        })
    }
    fetch(`http://localhost:8000/payments/${payment.id_field}/`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function ManagerPage(){
    ListPayment()  // вызов хука
    const [payment, setPayment] = useState(usePayment())
    const date = (new Date()).toISOString().slice(0,10);
    console.log(date)
    const handleSave = async (status, date, payment) => {
        await putPayment(payment, date, status)
        const results  = (await getPayment()).data;
        await setPayment(results);

    }
    const handleFilter = async (status) => {
        const results  = (await getPaymentFilter(status)).data;
        await setPayment(results);
    }
    const getDates = async (start, end) => {
        start=document.getElementById("start_date").value;
        end=document.getElementById("end_date").value;
        // setStartDate(start.toString())
        // setEndDate(end.toString())
        const results = (await getPaymentDateFilter(start.toString(),  end.toString())).data;
        console.log('start >',start, 'end >',end)
        await setPayment(results);
    }
    return(
        <div className="wrapper clear">
            <Header />
            <BasicExample />
            <CSRFToken/>
            <div className="BC mb-0 d-flex justify-between align-center">
                <p className="br_c"><Link className="BC_link" to="/">Главная </Link>
                    /<Link className="BC_link" to="/manage"> Страница Менеджера</Link></p>
                <div className="flex-column">
                    <NavDropdown title={"Сортировать по статусу"} id="basic-nav-dropdown" className="d-flex justify-between align-center">
                        <NavDropdown.Item onClick={() => handleFilter("в работе")}>
                            в работе
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("введен")}>
                            введен
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("оплачен")}>
                            оплачен
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleFilter("закрыт")}>
                            закрыт
                        </NavDropdown.Item>
                    </NavDropdown>
                    <div>Фильтр даты:</div>
                    <input className='mr-10' type='date' id='start_date'/>
                    <input className='mr-10' type='date' id='end_date'/>
                    <button className='mr-15' onClick={getDates}>Show</button>
                </div>
            </div>
            <div className= "d-flex ml-20 mb-20">
                {!payment.length ? <h1>К сожалению, пока ничего не найдено :(</h1>:
                    <Row xs={40} md={40} className="g-4">
                        {payment.map((payment, index) => {
                            return(
                                <Col key={index}>
                                    <div className= "d-flex flex-column">
                                        <span>Номер заказа:</span>
                                        <b>{payment.id_field}</b>
                                        <span>Статус:</span>
                                        <NavDropdown title={payment.status} id="basic-nav-dropdown">
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("в работе", date, payment)*/}
                                            {/*}} >в работе</NavDropdown.Item>*/}
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("оплачен", date, payment)*/}
                                            {/*}} >оплачен</NavDropdown.Item>*/}
                                            {/*<NavDropdown.Item onClick={() => {*/}
                                            {/*    handleSave("закрыт", date, payment)*/}
                                            {/*}} >закрыт</NavDropdown.Item>*/}
                                            {(payment.status === "оплачен                       ") ? <NavDropdown.Item onClick={() => {
                                            handleSave("в работе", date, payment)
                                            }} >в работе</NavDropdown.Item> : <div></div>}
                                            {(payment.status === "оплачен                       ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("закрыт", date, payment)
                                            }} >закрыт</NavDropdown.Item> : <div></div>}
                                            {(payment.status === "закрыт                        ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("оплачен", date, payment)
                                            }} >оплачен</NavDropdown.Item> : <div></div>}
                                            {(payment.status === "в работе                      ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("оплачен", date, payment)
                                            }} >оплачен</NavDropdown.Item> : <div></div>}
                                            {(payment.status === "в работе                      ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("введен", date, payment)
                                            }} >введен</NavDropdown.Item> : <div></div>}
                                            {(payment.status === "введен                        ") ? <NavDropdown.Item onClick={() => {
                                                handleSave("в работе", date, payment)
                                            }} >в работе</NavDropdown.Item> : <div></div>}
                                        </NavDropdown>
                                        <span>Дата открытия:</span>
                                        <b>{payment.date_open}</b>
                                        <span>Дата оплаты:</span>
                                        <b>{payment.date_pay}</b>
                                        <span>Номер пользователя:</span>
                                        <b>{payment.user}</b>
                                        <span>Номер услуги:</span>
                                        <b>{payment.soft}</b>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    }
                </div>
        </div>
    );
}

export default ManagerPage