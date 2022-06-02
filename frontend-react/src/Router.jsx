import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Important páginas y componentes
import Redireccion from './Components/Redireccion/Redireccion';
import Auth from './Pages/Auth/Auth';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Inicio from './Pages/Home/Inicio';
import Admin from './Pages/Admin/Admin';
import Add from './Components/Admin/add';
import Delete from './Components/Admin/delete';
import Global from './Pages/Global/Global';

export default function Router() {
    return (

        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Redireccion />}></Route>
                    <Route path='/auth' element={<Auth />}>
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/auth/register' element={<Register />} />
                    </Route>
                    <Route path='/app' element={<Global />}>
                        <Route path='/app/inicio' element={<Inicio />}></Route>
                        <Route path='/app/admin' element={<Admin />}>
                            <Route path='/app/admin/add' element={<Add />} />
                            <Route path='/app/admin/delete' element={<Delete />} />
                        </Route>
                    </Route>
                </Routes>

            </BrowserRouter>
        </>

    );
}
