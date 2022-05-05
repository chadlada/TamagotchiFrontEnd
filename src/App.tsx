import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { PetDetails } from './components/PetDetails'
import image from './images/tam-image2.png'

export type PetType = {
  id: string
  name: string
  birthday: string
  hungerLevel: number
  happinessLevel: number
  lastInteractedWithDate: string | undefined
  isDead: boolean
}

export function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Tamagotchi Rises Again!</h1>
        </Link>
        <div className="tam-image">
          <img src={image}></img>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/petdetails/:id" element={<PetDetails />}></Route>
      </Routes>
    </>
  )
}
