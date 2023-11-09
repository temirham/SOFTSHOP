import Header from "./Header";
import BasicExample from "./Navig";
import {usePaymentSoft, useUser_id} from "../slices/dataSlice";
import {GetSoftByID} from "../hooks/getSoftByID";
import {Link} from "react-router-dom";
import CSRFToken from "./CSRFToken";
import {Card} from "react-bootstrap";

function MyPayment(){
    const id = useUser_id()
    GetSoftByID(id)
    const PaymentSoft = usePaymentSoft()
    console.log(PaymentSoft)
    return(
        <div className="wrapper clear ">
            <Header />
            <BasicExample />
            <CSRFToken/>
            <div className="BC clear">
                <p className="br_c"><Link className="BC_link" to="/catalog">Каталог</Link>
                    /<Link className="BC_link" to="/mypayment">Мои бронирования</Link></p>
            </div>
            {!Object.keys(PaymentSoft).length ? <h5 className="ml-10 m-20"> Вы ничего не бронировали </h5>:
                <div className="d-flex align-center m-5">
                        <Card>
                            <img className="skrug mb-2" width={170} height={100} src={PaymentSoft.soft.img}/>
                            <div className= "d-flex flex-column">
                            <span>Название:</span>
                            <b>{PaymentSoft.soft.name}</b>
                            <span>Адресс:</span>
                            <b>{PaymentSoft.soft.address}</b>
                            <span>Цена:</span>
                            <b>{PaymentSoft.soft.price}</b>
                            <span>Статус Бронирования:</span>
                            <b>{PaymentSoft.payment.status}</b>
                            <span>Дата бронирования:</span>
                            <b>{PaymentSoft.payment.date_open}</b>
                            </div>
                        </Card>
                </div>
            }
        </div>

    )
}

export default MyPayment