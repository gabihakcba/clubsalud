import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Fieldset } from 'primereact/fieldset'
import { InputText } from 'primereact/inputtext'
import { createBorrowerEmployee } from 'queries/Medintt/users'
import { useRef, useState, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { getDataSessionMedintt } from 'utils/Medintt/session'
import { type CreateBorrowerEmployee } from 'utils/Medintt/types'
import { Toast } from 'primereact/toast'
import getLocalidades from 'queries/Medintt/localidades'
import { Dropdown } from 'primereact/dropdown'

export default function EmployeeForm({
  employee
}: {
  employee: CreateBorrowerEmployee | null
}): ReactElement {
  const query = useQueryClient()

  const toast = useRef<any>(null)

  const [selectedGenero, setSelectedGenero] = useState<any>(null)
  const [selectedProvincia, setSelectedProvincia] = useState<any>(null)
  const [selectedLocalidad, setSelectedLocalidad] = useState<any>(null)
  const [CP, setCP] = useState<string>('')
  const [localidades, setLocalidades] = useState<any>(null)

  const { register, handleSubmit, setValue, reset } = useForm()

  const showSuccess = (): void => {
    toast.current.show({
      severity: 'success',
      summary: 'Creación exitosa',
      detail: 'Empleado creado exitosamente'
    })
  }

  const showError = (): void => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al crear el empleado'
    })
  }

  const { data: provincias, isLoading } = useQuery({
    queryKey: ['provincias'],
    queryFn: async () => {
      const response = await getLocalidades()
      return response.data
    }
  })

  const { mutate: createEmployee, isPending } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const { Id_Provincia: idP, ...empleado } = data
      const newEmployee = {
        ...empleado,
        Id_Localidad: selectedLocalidad,
        Id_Prestataria: getDataSessionMedintt().user.Id_Prestataria
      }
      const response = await createBorrowerEmployee(
        newEmployee as CreateBorrowerEmployee
      )
      return response.data
    },
    onSuccess: async (e) => {
      showSuccess()
      await query.refetchQueries({ queryKey: ['patients'] })
      reset()
    },
    onError: () => {
      showError()
    }
  })

  return (
    <form
      action=''
      id='employee-form'
      className='flex flex-column gap-3 w-full'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        createEmployee(data)
      })}
      key={employee ? employee?.Id : undefined}
    >
      <Toast ref={toast} />
      <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
        <i
          className='pi pi-circle-fill'
          style={{ color: 'red', fontSize: '0.4rem' }}
        />
        <label
          htmlFor=''
          className='text-md font-bold'
        >
          Apellidos
        </label>
        <InputText
          defaultValue={employee ? employee?.Apellido : undefined}
          className='w-full'
          required
          {...register('Apellido')}
        />
      </div>
      <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
        <i
          className='pi pi-circle-fill'
          style={{ color: 'red', fontSize: '0.4rem' }}
        />
        <label
          htmlFor=''
          className='text-md font-bold'
        >
          Nombres
        </label>
        <InputText
          className='w-full'
          required
          defaultValue={employee ? employee?.Nombre : undefined}
          {...register('Nombre')}
        />
      </div>
      <div className='flex flex-row'>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Numero de Documento
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.NroDocumento : undefined}
            {...register('NroDocumento')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Fecha de Nacimiento
          </label>
          <Calendar
            required
            value={employee ? employee?.FechaNacimiento : undefined}
            {...register('FechaNacimiento')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Género
          </label>
          <Dropdown
            required
            options={[
              { label: 'MASCULINO', value: 'MASCULINO' },
              { label: 'FEMENINO', value: 'FEMENINO' }
            ]}
            value={selectedGenero}
            placeholder='Seleccione un género'
            defaultValue={employee ? employee?.Genero : undefined}
            {...register('Genero')}
            onChange={(e) => {
              setSelectedGenero(e.value)
              setValue('Genero', e.value)
            }}
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Direccion
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Direccion : undefined}
            {...register('Direccion')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Barrio
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Barrio : undefined}
            {...register('Barrio')}
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Provincia
          </label>
          <Dropdown
            {...register('Id_Provincia')}
            required
            loading={isLoading}
            options={provincias?.filter(
              (provincia) => provincia.Localidades.length > 0
            )}
            value={selectedProvincia}
            optionLabel='Provincia'
            optionValue='Id'
            placeholder='Seleccione una provincia'
            onChange={(e) => {
              setSelectedProvincia(e.value)
              setLocalidades(
                provincias?.filter((provincia) => provincia.Id === e.value)[0]
                  .Localidades
              )
              setValue('Id_Provincia', e.target.value)
            }}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Localidad
          </label>
          <Dropdown
            {...register('Id_Localidad')}
            required
            loading={selectedProvincia === null}
            options={localidades}
            value={selectedLocalidad}
            optionLabel='Localidad'
            optionValue='Id'
            placeholder='Seleccione una localidad'
            onChange={(e) => {
              setSelectedLocalidad(e.value)
              setCP(
                localidades?.filter((localidad) => localidad.Id === e.value)[0]
                  .CP as string
              )
              setValue('Id_Localidad', e.value)
            }}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Código Postal
          </label>
          <InputText
            disabled
            value={CP}
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Teléfono
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Telefono : undefined}
            {...register('Telefono')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Celular
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Celular1 : undefined}
            {...register('Celular1')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Email
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Email : undefined}
            {...register('Email')}
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Cargo
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Cargo : undefined}
            {...register('Cargo')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Puesto
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Puesto : undefined}
            {...register('Puesto')}
          />
        </div>
        <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
          <i
            className='pi pi-circle-fill'
            style={{ color: 'red', fontSize: '0.4rem' }}
          />
          <label
            htmlFor=''
            className='text-md font-bold'
          >
            Funcion
          </label>
          <InputText
            required
            defaultValue={employee ? employee?.Funcion : undefined}
            {...register('Funcion')}
          />
        </div>
      </div>
      <Fieldset legend='Datos de familiar responsable'>
        <div className='flex flex-column gap-3'>
          <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
            <label
              htmlFor=''
              className='text-md font-bold'
            >
              Nombre de familiar responsable
            </label>
            <InputText
              defaultValue={
                employee?.FamRespo_Nombre
                  ? employee?.FamRespo_Nombre
                  : undefined
              }
              {...register('FamRespo_Nombre')}
              className='w-full'
            />
          </div>
          <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
            <label
              htmlFor=''
              className='text-md font-bold'
            >
              Relacion de familiar responsable
            </label>
            <InputText
              defaultValue={
                employee?.FamRespo_Relacion
                  ? employee?.FamRespo_Relacion
                  : undefined
              }
              {...register('FamRespo_Relacion')}
              className='w-full'
            />
          </div>
          <div className='flex flex-row'>
            <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
              <label
                htmlFor=''
                className='text-md font-bold'
              >
                Teléfono de familiar responsable
              </label>
              <InputText
                defaultValue={
                  employee?.FamRespo_Telefono
                    ? employee?.FamRespo_Telefono
                    : undefined
                }
                {...register('FamRespo_Telefono')}
                className='w-full'
              />
            </div>
            <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
              <label
                htmlFor=''
                className='text-md font-bold'
              >
                Celular de familiar responsable
              </label>
              <InputText
                defaultValue={
                  employee?.FamRespo_Celular
                    ? employee?.FamRespo_Celular
                    : undefined
                }
                {...register('FamRespo_Celular')}
              />
            </div>
            <div className='w-full px-4 flex flex-row gap-2 align-items-center'>
              <label
                htmlFor=''
                className='text-md font-bold'
              >
                Email de familiar responsable
              </label>
              <InputText
                defaultValue={
                  employee?.FamRespo_Email
                    ? employee?.FamRespo_Email
                    : undefined
                }
                {...register('FamRespo_Email')}
              />
            </div>
          </div>
        </div>
      </Fieldset>
      <Button
        label={employee ? 'Actualizar' : 'Guardar'}
        icon='pi pi-save'
        outlined
        iconPos='right'
        type='submit'
        loading={isPending}
      />
      <div className='flex flex-row align-items-center gap-2'>
        <i
          className='pi pi-circle-fill'
          style={{ color: 'red', fontSize: '0.4rem' }}
        />
        <span>Datos obligatorios</span>
      </div>
    </form>
  )
}
