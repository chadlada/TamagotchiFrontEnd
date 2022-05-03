import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PetType } from '../App'
import { PetDetails } from './PetDetails'

export function Homepage() {
  const [petList, setPetList] = useState<PetType[]>([])

  async function loadPets() {
    const response = await axios.get(
      'https://chadladatamagotchi.herokuapp.com/api/pets'
    )

    if (response.status === 200) {
      console.log(response.data)
      setPetList(response.data)
    }
  }

  useEffect(function () {
    loadPets()
  }, [])

  return (
    <ul>
      {petList.map(function (pet) {
        return (
          <li>
            <div>
              <p>Name: {pet.name}</p>
              <p>Birthday: {pet.birthday}</p>
              <p>Hunger Level: {pet.hungerlevel}</p>
              <p>Name: {pet.happinesslevel}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
