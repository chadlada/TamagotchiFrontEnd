import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { PetDetails } from './components/PetDetails'

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
        <h1>Tamagotchi Rises Again!</h1>
      </header>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/petdetails" element={<PetDetails />}></Route>
      </Routes>
    </>
  )
}
