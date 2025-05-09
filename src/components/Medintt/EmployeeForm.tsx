import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { createBorrowerEmployee } from 'queries/Medintt/users'
import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { getUserSession } from 'utils/Medintt/session'
import { type CreateBorrowerEmployee } from 'utils/Medintt/types'

export default function EmployeeForm(): ReactElement {
  const query = useQueryClient()

  const { register, handleSubmit, setValue } = useForm()

  const { mutate: createEmployee, isPending } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const newEmployee = {
        ...data,
        Id_Prestataria: getUserSession().Id_Prestataria as number
      }
      const response = await createBorrowerEmployee(
        newEmployee as CreateBorrowerEmployee
      )
      return response.data
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['patients'] })
    }
  })

  return (
    <form
      action=''
      className='flex flex-column pt-4 gap-4'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        createEmployee(data)
      })}
    >
      <FloatLabel>
        <InputText
          required
          {...register('Apellido')}
        />
        <label htmlFor=''>Apellido</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Nombre')}
        />
        <label htmlFor=''>Nombre</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('NroDocumento')}
        />
        <label htmlFor=''>Numero de Documento</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar
          required
          {...register('FechaNacimiento')}
        />
        <label htmlFor=''>Fecha de Nacimiento</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Direccion')}
        />
        <label htmlFor=''>Direccion</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Barrio')}
        />
        <label htmlFor=''>Barrio</label>
      </FloatLabel>
      <FloatLabel>
        <InputNumber
          required
          {...register('Id_Localidad')}
          max={99999}
          min={0}
          onBlur={(e) => {}}
          onChange={(e) => {
            setValue('Id_Localidad', e.value)
          }}
        />
        <label htmlFor=''>Id de localidad</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Telefono')}
        />
        <label htmlFor=''>Teléfono</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Celular1')}
        />
        <label htmlFor=''>Celular</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Email')}
        />
        <label htmlFor=''>Email</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Genero')}
        />
        <label htmlFor=''>Género</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Cargo')}
        />
        <label htmlFor=''>Cargo</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Puesto')}
        />
        <label htmlFor=''>Puesto</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          {...register('Funcion')}
        />
        <label htmlFor=''>Funcion</label>
      </FloatLabel>
      <FloatLabel>
        <InputText {...register('FamRespo_Nombre')} />
        <label htmlFor=''>Nombre de familiar responsable</label>
      </FloatLabel>
      <FloatLabel>
        <InputText {...register('FamRespo_Relacion')} />
        <label htmlFor=''>Relacion de familiar responsable</label>
      </FloatLabel>
      <FloatLabel>
        <InputText {...register('FamRespo_Telefono')} />
        <label htmlFor=''>Teléfono de familiar responsable</label>
      </FloatLabel>
      <FloatLabel>
        <InputText {...register('FamRespo_Celular')} />
        <label htmlFor=''>Celular de familiar responsable</label>
      </FloatLabel>
      <FloatLabel>
        <InputText {...register('FamRespo_Email')} />
        <label htmlFor=''>Email de familiar responsable</label>
      </FloatLabel>
      <Button
        label='Guardar'
        icon='pi pi-save'
        outlined
        iconPos='right'
        type='submit'
        loading={isPending}
      />
    </form>
  )
}
