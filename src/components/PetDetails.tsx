import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PetType } from '../App'
import image from '../images/playwithme.png'
import image2 from '../images/sadtam.png'
import image3 from '../images/badtam.png'

export function PetDetails() {
  const history = useNavigate()
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
  const [petScold, setPetScold] = useState<number>()

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

  async function updatePetLevels() {
    const response = await axios.get(
      `https://chadladatamagotchi.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 200) {
      setPetDetails(response.data)
      setPetHunger(response.data.hungerLevel)
      setPetPlay(response.data.happinessLevel)
      setPetScold(response.data.happinessLevel)
    }
  }

  async function feedPet() {
    const response = await axios.post(
      `https://chadladatamagotchi.herokuapp.com/api/pets/${params.id}/Feedings`,
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      }
    )
    if (response.status === 200) {
      setPetHunger(response.data.hungerLevel)
      updatePetLevels()
    }
  }

  async function scoldPet() {
    const response = await axios.post(
      `https://chadladatamagotchi.herokuapp.com/api/Pets/${params.id}/Scoldings`,
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      }
    )
    if (response.status === 200) {
      setPetScold(response.data.happinessLevel)
      updatePetLevels()
    }
  }

  async function playWithPet() {
    const response = await axios.post(
      `https://chadladatamagotchi.herokuapp.com/api/Pets/${params.id}/Playtimes`,
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      }
    )

    if (response.status === 200) {
      setPetPlay(response.data.happinessLevel)
      updatePetLevels()
    }
  }
  async function deletePet() {
    const response = await axios.delete(
      `https://chadladatamagotchi.herokuapp.com/api/Pets/${params.id}`
    )

    if (response.status === 200) {
      history('/')
    }
  }
  console.log({ petPlay })
  console.log({ petScold })
  return (
    <>
      <p className="detailsp">Interact with your pet!</p>
      <div className="interact">
        <button onClick={playWithPet}>Play</button>
        <button onClick={feedPet}>Feed </button>
        <button onClick={scoldPet}>Scold</button>
        <br></br>
        <br />
        <button onClick={deletePet}>Delete </button>
      </div>
      <h2>~Pet Details~</h2>
      <div className="pet-details">
        <p>Name: {petDetails.name}</p>
        <p>Pet ID: {params.id}</p>
        <p>Birthday: ({new Date(petDetails.birthday).toLocaleDateString()})</p>
        <p>Hunger: {petHunger}</p>
        <p>Happiness: {petDetails.happinessLevel}</p>
      </div>
      <div className="interact">
        <img src={image} alt="tamagotchi1" />
        <img src={image2} alt="tamagotchi2" />
        <img src={image3} alt="tamagotchi3"/>
      </div>
    </>
  )
}
