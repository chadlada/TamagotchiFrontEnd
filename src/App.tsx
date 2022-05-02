import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { PetList } from './components/PetList'

export function App() {
  return (
    <>
      <header>
        <h1>Tamagotchi Rises Again!</h1>
        <p>
          <Link to="/">Home</Link>
        </p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PetList />}></Route>
        </Routes>
      </main>
    </>
  )
}
