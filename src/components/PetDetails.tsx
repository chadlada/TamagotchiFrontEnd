import React, { useState } from 'react'
import { PetType } from '../App'

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

  return (
    <div>
      <p>Pet Details Page</p>
    </div>
  )
}
