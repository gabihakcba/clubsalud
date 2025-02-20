import { useState, useEffect, type ReactElement } from 'react'
import { Chart } from 'primereact/chart'
import { useQuery } from '@tanstack/react-query'
import { updateMembersState } from 'queries/ClubSalud/members'
import { type Member } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import MemberList from './MemberList'

export default function ChartMemberReport(): ReactElement {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [active, setActive] = useState<Member[]>([])
  const [inactive, setInactive] = useState<Member[]>([])

  const [list, setList] = useState<Member[]>([])
  const [memberList, openMemberList, closeMemberList] = useModal(false)

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const members: { actives: Member[]; inactives: Member[] } =
        await updateMembersState()
      setActive(members.actives)
      setInactive(members.inactives)
      return [...members.actives, ...members.inactives]
    }
  })

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: [''],
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: [members?.length]
        },
        {
          type: 'bar',
          label: 'Activos',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [active?.length]
        },
        {
          type: 'bar',
          label: 'Inactivos',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [inactive?.length]
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
      },
      onClick: (event, elements) => {
        if (elements[0]?.datasetIndex !== undefined) {
          const { datasetIndex } = elements[0]
          if (datasetIndex === 0) {
            setList(members ?? [])
          } else if (datasetIndex === 1) {
            setList(active)
          } else if (datasetIndex === 2) {
            setList(inactive)
          }
          openMemberList()
        }
      }
    }
    setChartData(data)
    setChartOptions(options)
  }, [members])

  return (
    <div className='card'>
      <Dialog
        onHide={closeMemberList}
        visible={memberList}
      >
        <MemberList members={list} />
      </Dialog>
      <div className='flex flex-row gap-4 align-items-center'>
        <h2>Alumnos</h2>
      </div>
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
