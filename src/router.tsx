import React from 'react';
import { Route, Routes } from 'react-router';
import App from './App';
import TodoLayout from './layouts/TodoLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import AllTaskPage from './pages/AllTask/AllTaskPage';
import TodoItem from './pages/[id]/TodoItem';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import NotFoundPage from './pages/NotFoundPage';


const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoLayout />} >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/todo" element={<AllTaskPage />} />
            <Route path="/todo/:id" element={<TodoItem />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;