import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {GetSofts} from "../hooks/getSofts";
import {
    setDrawAction,
    setSoft_idAction,
    setSumAction, useIsAuthenticated, useIsStaff,
    useSofts} from "../slices/dataSlice";
import Button from "react-bootstrap/Button";
import React from "react";
import {useDispatch} from "react-redux";
import BasicExample from "./Navig";
import Header from "./Header";
import {DeleteSoft} from "../hooks/DeleteSoft";
import {useWindowSize} from "../hooks/useWindowSize";


function  Product(){
    const {id} = useParams();
    const size = useWindowSize()
    console.log(size)
    const dispatch = useDispatch()
    const isStaff = useIsStaff()
    GetSofts()  // вызов хука
    const isAuthenticated= useIsAuthenticated()
    console.log(isAuthenticated)
    const softs = useSofts()
            return (
                <div className="wrapper clear">
                    <Header />
                    <BasicExample />
                    <div className="BC">
                        <p className="br_c"><Link className="BC_link" to="/catalog">Каталог</Link>
                            /<Link className="BC_link" to="/">{softs[id - 1].name}</Link></p>
                    </div>
                    <h1 className="ml-20">{softs[id - 1].name}</h1><br/>
                    <ul className="clear">
                        <li className="ml-20">Название: {softs[id - 1].name}</li>
                        <li className="ml-20">Адрес: {softs[id - 1].address}</li>
                        {!isAuthenticated ? <li className="ml-20">Чтобы записаться, пожалуйста, авторизуйтесь</li>: <li className="ml-20">
                                {!isStaff ?
                            <Button href={"/drawer"} onClick={ () => {
                                dispatch(setSumAction(softs[id - 1].price))
                                dispatch(setDrawAction(softs[id - 1]))
                                dispatch(setSoft_idAction(softs[id - 1].id))
                            }}>Забронировать</Button> :
                                    <Button href={`/updatesoft/${id}`} onClick={ () => {
                                    }}>Обновить</Button>
                                }
                            {!isStaff ? <div></div>:
                                <Button className="ml-10" onClick={ () => {
                                    DeleteSoft(softs[id - 1].id)
                                }}>Удалить</Button>
                            }
                            </li>
                        }
                        <img className="wrapper align-center mb-40" width={size.width / 1.2} height={size.height / 2} src={softs[id - 1].img} alt = "search"/>

                    </ul>

                </div>
            );
}

export default Product;
