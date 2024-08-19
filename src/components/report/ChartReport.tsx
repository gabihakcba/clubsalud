import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/members'
import { Attendance, Member } from 'utils/types'
import moment from 'moment'

const totalMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      moment(mem.inscriptionDate).year() <= moment(date).year() &&
      moment(mem.inscriptionDate).month() <= moment(date).month()
  )
  return current.length
}

const activeMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      moment(mem.inscriptionDate).year() <= moment(date).year() &&
      moment(mem.inscriptionDate).month() <= moment(date).month() &&
      mem.state
  )
  return current.length
}

const attendaceMembers = (members: Member[], date: Date): number => {
  const current = members.filter(
    (mem: Member) =>
      moment(mem.inscriptionDate).year() <= moment(date).year() &&
      moment(mem.inscriptionDate).month() <= moment(date).month()
      &&
      mem.memberAttendance?.some(
        (att: Attendance) =>
          moment(att.date).year() === moment(date).year() &&
          moment(att.date).month() === moment(date).month()
      )
  )
  return current.length
}

export default function StackedBarDemo() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [total, setTotal] = useState<number[]>([0])
  const [active, setActive] = useState<number[]>([0])
  const [attendance, setAttendance] = useState<number[]>([0])

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getMembers()
      console.log(data)
      return data
    }
  })

  useEffect(() => {
    setTotal([totalMembers(members ?? [], new Date())])
    setActive([activeMembers(members ?? [], new Date())])
    setAttendance([attendaceMembers(members ?? [], new Date())])
  }, [members])

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: total
        },
        {
          type: 'bar',
          label: 'Activos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: active
        },
        {
          type: 'bar',
          label: 'Con asistencia',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: attendance
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [total, active, attendance])

  return (
    <div className='card'>
      <Chart
        type='bar'
        data={chartData}
        options={chartOptions}
        width='60dvw'
        height='60dvh'
      />
    </div>
  )
}
