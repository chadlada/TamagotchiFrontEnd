import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PetType } from '../App'
// import image from './images/playwithme.png'

export function PetDetails() {
  const [petDetails, setPetDetails] = useState<PetType>({
    id: undefined!,
    name: '',
    birthday: '',
    hungerLevel: 0,
    happinessLevel: 0,
    lastInteractedWithDate: '',
    isDead: false,
  })
  const params = useParams<{
    id: string
    actions: 'Playtimes' | 'Feedings' | 'Scoldings'
  }>()

  const [petPlay, setPetPlay] = useState<number>()
  const [petHunger, setPetHunger] = useState<number>()

  useEffect(() => {
    async function fetchPetDetails() {
      const response = await axios.get(
        `https://chadladatamagotchi.herokuapp.com/api/pets/${params.id}`
      )
      if (response.status === 200) {
        setPetDetails(response.data)
        // console.log(response.data)
      }
    }
    fetchPetDetails()
  }, [params.id])

  async function feedPet() {
    const response = await axios.post(
      `https://chadladatamagotchi.herokuapp.com/api/pets/${params.id}/Feedings`
    )
    if (response.status === 200) {
      setPetHunger(response.data)
    }
  }

  return (
    <>
      <p className="detailsp">Interact with your pet!</p>
      <div className="interact">
        <button>Play</button>
        <button>Pet</button>
        <button onClick={feedPet}>Feed {petHunger}</button>
        <button>Scold</button>
        <br></br>
        <br />
        <button>Delete </button>
      </div>
      <h2>~Pet Details~</h2>
      <div className="pet-details">
        <p>Pet ID: {params.id}</p>
        <p>Name: {petDetails.name}</p>
        <p>Birthday: {petDetails.birthday}</p>
        <p>Hunger: {petDetails.hungerLevel}</p>
        <p>Happiness: {petDetails.happinessLevel}</p>
      </div>
    </>
  )
}
