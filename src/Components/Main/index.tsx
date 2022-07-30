import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
          </Routes>
        </main>
    )
}
