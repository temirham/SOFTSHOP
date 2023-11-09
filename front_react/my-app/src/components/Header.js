import {Link, useNavigate} from "react-router-dom";
import {
    delPaymentSoftAction,
    delDrawAction,
    delSumAction,
    setIsAuthenticatedAction,
    setIsStaffAction,
    useIsAuthenticated
} from "../slices/dataSlice";
import {useDispatch} from "react-redux";
import {logout} from "../hooks/logaut";

function Header(){
    const dispatch = useDispatch()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    return(
        <header className="d-flex justify-between align-center p-35 clear">
            <div className="d-flex align-center">
                <img width={100} height={100} src="/img/logo.png" />
                <div>
                    <h3 className="text-uppercase">Магазин софта</h3>
                    <p>Есть чем удивить</p>
                </div>
            </div>
                <div className="d-flex justify-between align-center register" onClick={() => {
                    dispatch(delSumAction())
                }
                }>
                    <img width={20} height={20} src="/img/icons8-пользователь-30.png" />
                    {!isAuthenticated ? <Link to="/login"><span>Войти</span></Link> : <span onClick={() =>{
                        logout().then(r => console.log(r))
                        dispatch(setIsAuthenticatedAction(false))
                        dispatch(setIsStaffAction(false))
                        dispatch(delSumAction())
                        dispatch(delDrawAction())
                        dispatch(delPaymentSoftAction())
                        localStorage.clear()
                        navigate('/')
                    }}>Выйти</span>}
                </div>
        </header>
    );
}

export default Header;