'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { getPatientsByBorrower } from 'queries/Medintt/users'
import { useEffect, useState, type ReactElement } from 'react'
import { getUserSession } from 'utils/Medintt/session'

export default function Ausentimos(): ReactElement {
  const [user, setUser] = useState<any>(undefined)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  useEffect(() => {
    const userData = getUserSession()
    setUser(userData)
  }, [])

  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await getPatientsByBorrower(
        user?.Id_Prestataria as number
      )
      if (response.ok) {
        return response.data
      }
      return []
    },
    enabled: !!user?.Id_Prestataria
  })

  return (
    <form className='flex flex-column gap-4 m-6'>
      <FloatLabel>
        <Dropdown
          value={selectedPatient}
          options={patients ?? []}
          optionLabel='Nombre'
          optionValue='DNI'
          onChange={(e) => {
            setSelectedPatient(e.value)
          }}
        />
        <label htmlFor=''>Persona</label>
      </FloatLabel>
      <FloatLabel>
        <InputText />
        <label htmlFor=''>Fecha</label>
      </FloatLabel>
      <FloatLabel>
        <InputText />
        <label htmlFor=''>Documento</label>
      </FloatLabel>
      <Button
        label='Cargar'
        className='w-max'
        icon='pi pi-upload'
        iconPos='right'
        outlined
      />
    </form>
  )
}
