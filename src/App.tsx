import React from 'react'
import { Link } from 'react-router-dom'

export function App() {
  return (
    <>
      <h1>Tamagotchi Rises Again!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Go Home</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
