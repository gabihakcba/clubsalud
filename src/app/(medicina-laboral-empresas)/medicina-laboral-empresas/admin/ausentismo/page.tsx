'use client'

import { useQuery } from '@tanstack/react-query'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getAusentismos } from 'queries/Medintt/users'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { DateUtils } from 'utils/ClubSalud/dates'
import { getDataSessionMedintt } from 'utils/Medintt/session'

export default function Ausentimos(): ReactElement {
  const [user, setUser] = useState<any>(undefined)
  const [desde, setDesde] = useState<Date | null>(null)
  const [hasta, setHasta] = useState<Date | null>(null)
  const [mesReferencia, setMesReferencia] = useState<Date | null>(null)

  useEffect(() => {
    const userData = getDataSessionMedintt()
    setDesde(DateUtils.startOfMonth(DateUtils.getCurrentDate()))
    setHasta(DateUtils.endOfMonth(DateUtils.getCurrentDate()))
    setMesReferencia(DateUtils.getCurrentDate())
    setUser(userData.user)
  }, [])

  const { register } = useForm()

  const { data: ausentimos } = useQuery({
    queryKey: ['ausentimos', user?.Id_Prestataria, desde, hasta, mesReferencia],
    queryFn: async () => {
      const data = {
        idPrestataria: Number(user?.Id_Prestataria),
        desde,
        hasta,
        mesReferencia
      }
      console.log(data)
      const response = await getAusentismos(data)
      if (response.ok) {
        return response.data
      }
      return []
    },
    enabled: user !== undefined && desde !== null && hasta !== null
  })

  return (
    <div className='flex flex-column'>
      <form className='flex flex-row'>
        <div className='flex flex-row gap-2'>
          <p>Desde</p>
          <Calendar
            required
            value={desde}
            {...register('desde')}
            onChange={(e) => {
              if (e.value !== undefined) {
                setDesde(e.value)
              }
            }}
          />
        </div>
        <div className='flex flex-row gap-2'>
          <p>Hasta</p>
          <Calendar
            required
            value={hasta}
            {...register('hasta')}
            onChange={(e) => {
              if (e.value !== undefined) {
                setHasta(e.value)
              }
            }}
          />
        </div>
        <div className='flex flex-row gap-2'>
          <p>Mes de Referencia</p>
          <Calendar
            required
            value={mesReferencia}
            {...register('mesReferencia')}
            onChange={(e) => {
              if (e.value !== undefined) {
                setMesReferencia(e.value)
              }
            }}
          />
        </div>
      </form>
      <DataTable
        value={ausentimos}
        size='small'
        scrollHeight='87dvh'
        scrollable
      >
        <Column
          field='Paciente'
          header='Empleado'
        />
        <Column
          field='DNI'
          header='DNI'
        />
        <Column
          field='Cargo'
          header='Cargo'
        />
        <Column
          field='Funcion'
          header='Funcion'
        />
        <Column
          field='Del'
          header='Del'
          body={(rowData) => (
            <p>{DateUtils.formatToDDMMYYutc(rowData.Del as Date)}</p>
          )}
        />
        <Column
          field='Al'
          header='Al'
          body={(rowData) => (
            <p>{DateUtils.formatToDDMMYYutc(rowData.Al as Date)}</p>
          )}
        />
        <Column
          field='Notificacion'
          header='Notificacion'
          body={(rowData) => (
            <p>{DateUtils.formatToDDMMYYutc(rowData.Notificacion as Date)}</p>
          )}
        />
        <Column
          field='Dias'
          header='Dias'
        />
        <Column
          field='Categoria'
          header='Categoria'
        />
        <Column
          field='Diagnostico'
          header='Diagnostico'
        />
        <Column
          field='Evolucion'
          header='Evolucion'
        />
      </DataTable>
    </div>
  )
}
