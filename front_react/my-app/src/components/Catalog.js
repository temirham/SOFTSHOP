import Card from './Card.js';
import Header from "./Header";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import BasicExample from "./Navig";
import {GetSofts} from "../hooks/getSofts";
import {useSofts} from "../slices/dataSlice";
import InputField from "./InputField";
import axios from "axios";
import { Col, Row} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

const getSoftByName = async (name = "") =>{
    const res = await axios.get(`http://127.0.0.1:8000/search?search=${name}`)
    return res
}

const getSoftFilter = async (direction = "") =>{
    const res = await axios.get(`http://127.0.0.1:8000/filter?direction=${direction}`)
    return res
}


function Catalog() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false)
    GetSofts()  // вызов хука
    const [softs, setSofts] = useState(useSofts())
    const handleSearch = async () => {
        await setLoading(true);
        const results  = (await getSoftByName(searchValue)).data;
        await setSofts(results);
        await setLoading(false)
    }

    const handleFilter = async (direction) => {
        const results  = (await getSoftFilter(direction)).data;
        await setSofts(results);
    }

    return (
        <div className="wrapper clear">
            <Header />
            <BasicExample />
            <div className="BC mb-0">
                <p className="br_c"><Link className="BC_link" to="/">Главная</Link>
                    /<Link className="BC_link" to="/catalog">Каталог</Link></p>
            </div>
            <div className= "content p-30">
                <div className= "d-flex align-center justify-between mb-40">
                    <h1>Все услуги</h1>
                    <div className="d-flex align-center justify-between content">
                    <NavDropdown title="Сортировать:" id="basic-nav-dropdown" className="mr-20">
                        <NavDropdown.Item onClick={() => {
                            handleFilter("down")
                        }
                        }>
                            Сначала дорогие
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {
                            handleFilter("up")
                        }
                        }>Сначала дешевые</NavDropdown.Item>
                    </NavDropdown>
                    <InputField value={searchValue} setValue={setSearchValue} loading={loading} onSubmit={handleSearch} buttonTitle="Искать"/>
                    </div>
                </div>
                <div className= "d-flex">
                    {!softs.length ? <h1>К сожалению, пока ничего не найдено :(</h1>:
                        <Row md={40} className="g-4">
                            {softs.map((soft, index) => {
                                return(
                                    <Col key={index}>
                                        <Card {...soft}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </div>
            </div>
        </div>
    );
}

export default Catalog;
