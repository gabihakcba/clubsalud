import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import moment from 'moment'

const db: PrismaClient = prisma

const obtenerCicloActual = (
  fechaHoy = moment()
): { inicioCiclo: Date; finCiclo: Date } => {
  const hoy = fechaHoy.clone() // Clonar para no modificar la fecha original
  let inicioCiclo: Date, finCiclo: Date

  // Si hoy es 20 o después: ciclo actual es del 20 de este mes al 20 del siguiente
  if (hoy.date() >= 20) {
    inicioCiclo = hoy.clone().date(20).startOf('day').toDate() // 20 del mes actual, 00:00:00
    finCiclo = hoy.clone().add(1, 'month').date(20).endOf('day').toDate() // 20 del sig mes, 23:59:59
  } else {
    inicioCiclo = hoy
      .clone()
      .subtract(1, 'month')
      .date(20)
      .startOf('day')
      .toDate() // 20 del mes pasado, 00:00:00
    finCiclo = hoy.clone().date(20).endOf('day').toDate() // 20 de este mes, 23:59:59
  }

  return { inicioCiclo, finCiclo }
}

export async function GET(): Promise<Response> {
  const { inicioCiclo, finCiclo } = obtenerCicloActual()

  try {
    // Suscripciones que son por consulta
    const totalSubscriptions = await db.subscription.findMany({
      where: {
        isByOS: true
      },
      include: { plan: true, billedConsultation: true, member: true }
    })

    // Suscripciones por consultas que no han sido pagadas
    const notPaidSubscriptions = totalSubscriptions.filter(
      (subscription) =>
        subscription.billedConsultation.length <
        (subscription?.plan?.durationMonth ?? 0) * 2
    )

    // Ids de las suscripciones que no han sido pagadas
    const ids = notPaidSubscriptions.map((subscription) => subscription.id)

    /**
     * Suscripciones:
     * - Que son por OS
     * - Que no han sido pagadas
     * - Que tienen fecha de consulta menor a hoy
     * - Que tienen fecha de consulta entre el inicio y fin del ciclo actual
     */
    const subscriptions = await db.subscription.findMany({
      where: {
        id: {
          in: ids
        },
        isByOS: true,
        billedConsultation: {
          every: {
            date: {
              lt: moment().startOf('day').toDate()
            }
          }
        }
      },
      include: {
        member: {
          include: {
            memberSubscription: {
              include: {
                plan: true,
                promotion: true,
                billedConsultation: true,
                payment: true
              }
            }
          }
        },
        promotion: true,
        plan: true,
        billedConsultation: {
          where: {
            date: {
              gte: inicioCiclo,
              lte: finCiclo
            }
          }
        },
        payment: true
      } as const
    })

    // Suscripciones con menos de 2 consultas facturadas en el ciclo actual
    const subscriptionsAble = subscriptions.filter(
      (subscription) => subscription.billedConsultation.length < 2
    )

    return new Response(JSONbig.stringify(subscriptionsAble), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
