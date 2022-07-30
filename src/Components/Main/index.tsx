import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CounterPage from '../../Pages/Counter'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Profile from '../../Pages/Profile'
import ROUTES from '../../routes'
import PrivateRouteWrapper from './PrivateRouteWrapper'

export default function Main() {
    return (
        <main>
          <Routes>
            <Route
              path={ROUTES.home()}
              element={
                <Home />
              }
            />
            <Route
              path={ROUTES.counter()}
              element={
                <CounterPage />
              }
            />
            <Route
              path={ROUTES.login()}
              element={
                <Login />
              }
            />
            <Route
              path={ROUTES.profile()}
              element={
                <PrivateRouteWrapper>
                    <Profile />
                </PrivateRouteWrapper>
              }
            />
          </Routes>
        </main>
    )
}
