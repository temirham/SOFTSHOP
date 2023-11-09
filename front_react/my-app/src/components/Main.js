import {Link} from "react-router-dom";
import BasicExample from "./Navig";
import Header from "./Header";


function Main() {
    return (
       <div className="wrapper clear">
           <Header />
           <BasicExample />
           <h1 className="display-4 m-20">Магазин софта</h1>
           <p className='lead ml-10'>Проект Павлова Сергея</p>
           <p className='lead ml-10'>Есть чем удивить</p>
           <hr className='my-4'/>
           <p className="ml-10">Нажмите, чтобы войти в аккаунт</p>
           <Link className='btn btn-primary btn-lg ml-10' to='/login'>Авторизоваться</Link>
       </div>
    );
}

export default Main;
