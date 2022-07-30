import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CounterPage from '../../Pages/Counter'
import Home from '../../Pages/Home'
import ROUTES from '../../routes'

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
          </Routes>
        </main>
    )
}
