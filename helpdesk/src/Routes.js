import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Listagem from './helDesk/listagem/pages/listagem';
import Cadastro from './helDesk/cadastro/pages/cadastro';
import Login from './helDesk/login/components/cadastro';

export const MainRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>               
                    <Route path="/Listagem" element={<Listagem/>} />
                    <Route path="/Cadastro" element={<Cadastro/>} />
                    <Route path="/" element={<Login/>} />
                </Routes>
            </BrowserRouter>

        )
};