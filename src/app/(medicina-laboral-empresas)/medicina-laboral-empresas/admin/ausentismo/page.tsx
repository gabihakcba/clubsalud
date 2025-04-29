import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { type ReactElement } from 'react'

export default function Ausentimos(): ReactElement {
  return (
    <form className='flex flex-column gap-4 m-6'>
      <FloatLabel>
        <InputText />
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
