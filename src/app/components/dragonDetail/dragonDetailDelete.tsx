import api from '@/utils/axios'
import { redirect } from 'next/navigation'
import React from 'react'

interface DragonDetailDeleteProps {
  dragonId: string
}

const DragonDetailDelete = ({dragonId}:DragonDetailDeleteProps) => {
  const deleteDragon = async (dragonId: string) => {
    const response = await api.delete(`/${dragonId}`);

    if(response.status == 200){
      console.log(response);
      redirect('/');
    }
    
  }

  return (
    <button data-testid="dragonDeleteButton"  onClick={() => deleteDragon(dragonId)}>delete</button>
  )
}

export default DragonDetailDelete