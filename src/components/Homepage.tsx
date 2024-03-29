import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PetType } from '../App'
// import { PetDetails } from './PetDetails'
import { Link } from 'react-router-dom'

export function Homepage() {
  const [petList, setPetList] = useState<PetType[]>([])
  const [newPetName, setNewPetName] = useState('')

  function loadPets() {
    async function fetchPets() {
      const response = await axios.get(
        'https://chadladatamagotchi.herokuapp.com/api/pets'
      )

      if (response.status === 200) {
        console.log(response.data)
        setPetList(response.data)
      }
    }
    fetchPets()
  }

  useEffect(loadPets, [])

  async function _createNewPet() {
    const body = {
      Name: newPetName,
    }
    const response = await axios.post(
      'https://chadladatamagotchi.herokuapp.com/api/Pets',
      body
    )
    if (response.status === 201) {
      loadPets()
      // Clears input ('') field after submit
      setNewPetName('')
    }
  }

  return (
    <>
      <div className="create-pet">
        <p>Create New Pet:</p>
        <form
          onSubmit={function (event) {
            event.preventDefault()
            _createNewPet()
          }}
        >
          <input
            type="text"
            placeholder="Enter new pet name"
            value={newPetName}
            onChange={function (event) {
              setNewPetName(event.target.value)
            }}
          />
        </form>
      </div>
      <ul>
        {petList
          .sort((a, b) => (a.birthday < b.birthday ? 1 : 0))
          .map((pet) =>
             (
              <li key={pet.id}>
                <Link to={`./petdetails/${pet.id}`}>
                  Click for details on {[pet.name]}
                </Link>
                <div>
                  <p>Name: {pet.name}</p>
                  <p>
                    Birthday: ({new Date(pet.birthday).toLocaleDateString()})
                  </p>
                  <p>Hunger Levels: {pet.hungerLevel}</p>
                  <p>Happiness Level: {pet.happinessLevel}</p>
                </div>
              </li>
            )
          )}
      </ul>
    </>
  )
}
