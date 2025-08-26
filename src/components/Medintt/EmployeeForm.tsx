import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Fieldset } from 'primereact/fieldset'
import { InputText } from 'primereact/inputtext'
import {
  createBorrowerEmployee,
  updateBorrowerEmployee
} from 'queries/Medintt/users'
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { getDataSessionMedintt } from 'utils/Medintt/session'
import {
  type UpdateBorrowerEmployee,
  type CreateBorrowerEmployee
} from 'utils/Medintt/types'
import { Toast } from 'primereact/toast'
import getLocalidades from 'queries/Medintt/localidades'
import { Dropdown } from 'primereact/dropdown'
import moment from 'moment'

const Genero = [
  { label: 'MASCULINO', value: 'MASCULINO' },
  { label: 'FEMENINO', value: 'FEMENINO' }
]

export default function EmployeeForm({
  employee
}: {
  employee: CreateBorrowerEmployee | null
}): ReactElement {
  const query = useQueryClient()

  const toast = useRef<any>(null)

  const [selectedGenero, setSelectedGenero] = useState<any>(null)
  const [selectedLocalidad, setSelectedLocalidad] = useState<any>(null)
  const [CP, setCP] = useState<string>('')
  const [localidades, setLocalidades] = useState<any>(null)

  const { register, handleSubmit, setValue, reset } = useForm()

  const showSuccessUpdate = (): void => {
    toast.current.show({
      severity: 'success',
      summary: 'Actualización exitosa',
      detail: 'Empleado actualizado exitosamente'
    })
  }

  const showErrorUpdate = (): void => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al actualizar el empleado'
    })
  }

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

  const { data: provincias, isLoading: isLoadingProvincia } = useQuery({
    queryKey: ['provincias'],
    queryFn: async () => {
      const response = await getLocalidades()
      const localidades = response.data.flatMap(
        (provincia) => provincia.Localidades
      )
      setLocalidades(localidades)
      return response.data
    }
  })

  const { mutate: updateEmployee, isPending: isPendingUpdate } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const { id, ...empleado } = data
      const newEmployee = {
        ...empleado,
        Id_Localidad: selectedLocalidad
      }
      const response = await updateBorrowerEmployee(
        id as number,
        newEmployee as UpdateBorrowerEmployee
      )
      return response.data
    },
    onSuccess: async (e) => {
      showSuccessUpdate()
      await query.refetchQueries({ queryKey: ['patients'] })
      reset()
    },
    onError: () => {
      showErrorUpdate()
    }
  })

  const { mutate: createEmployee, isPending } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const { ...empleado } = data
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

  useEffect(() => {
    if (employee) {
      setValue('Genero', employee?.Genero)
      setSelectedGenero(employee?.Genero)

      setValue('Id_Localidad', employee?.Id_Localidad)
      setSelectedLocalidad(employee?.Id_Localidad)
      const cp = localidades?.find(
        (localidad) => localidad?.Id === employee?.Id_Localidad
      )?.CP
      setCP(cp as string)
    }
  }, [employee, provincias, localidades])

  return (
    <form
      action=''
      id='employee-form'
      className='flex flex-column gap-3 w-full'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        if (employee) {
          updateEmployee({ id: employee.Id, ...data })
        } else {
          createEmployee(data)
        }
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
            value={
              employee
                ? moment.utc(employee?.FechaNacimiento).toDate()
                : undefined
            }
            dateFormat='dd/mm/yy'
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
            options={Genero}
            value={selectedGenero}
            placeholder='Seleccione un género'
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
            Localidad
          </label>
          <Dropdown
            {...register('Id_Localidad')}
            required
            filter
            loading={localidades === null || isLoadingProvincia}
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
        loading={isPending || isPendingUpdate}
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
