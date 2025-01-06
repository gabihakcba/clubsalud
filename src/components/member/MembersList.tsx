import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import {
  VirtualScroller,
  type VirtualScrollerTemplateOptions
} from 'primereact/virtualscroller'
import { getMembers } from 'queries/members'
import { useState, type ReactElement } from 'react'
import { type Member } from 'utils/types'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useModal } from 'utils/useModal'
import { Dialog } from 'primereact/dialog'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

function generatePdf(members: Member[], setPdf): void {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF()

  const columns = [
    { header: 'Apellido', dataKey: 'lastName' },
    { header: 'Nombre', dataKey: 'name' },
    { header: 'DNI', dataKey: 'dni' }
  ]

  const maxPerPage = 30 // Número máximo de alumnos por página

  // Iterar sobre los datos de alumnos
  for (let i = 0; i < members.length; i++) {
    // Si estamos en una nueva página y no es la primera, añade una nueva página
    if (i > 0 && i % maxPerPage === 0) {
      doc.addPage() // Agrega una nueva página
    }

    // Genera la tabla en la primera página
    if (i % maxPerPage === 0) {
      doc.autoTable({
        columns,
        body: members.slice(i, i + maxPerPage), // Toma solo los alumnos de esta página
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [0, 57, 107] }
      })
    }
  }

  // Convertir el PDF a Blob
  const pdfBlob = doc.output('blob')
  // Crear una URL para el Blob
  const pdfUrl = URL.createObjectURL(pdfBlob)
  setPdf(pdfUrl)
  // Descargar el PDF
  // doc.save('Lista_de_usuarios.pdf')
}

export default function MembersList(): ReactElement {
  const [showPdf, openPdf, closePdf] = useModal(false)
  const [pdf, setPdf] = useState(null)

  const { data: members, isPending } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const itemTemplate = (
    item: Member,
    options: VirtualScrollerTemplateOptions
  ): ReactElement => {
    const className = classNames('flex align-items-center p-2', {
      'surface-hover': options.odd
    })

    return (
      <div
        className={className}
        style={{ height: options.props.itemSize?.toString() + 'px' }}
      >
        {item.lastName.toUpperCase() + ' '}
        {item.name.toUpperCase() + ' '}
        {item.dni.toString()}
      </div>
    )
  }

  return (
    <div className='flex flex-column gap-4'>
      <Dialog
        visible={showPdf}
        onHide={closePdf}
        header={() => `Total: ${members?.length}`}
      >
        {pdf && (
          <>
            <iframe
              src={pdf}
              title='Vista previa de PDF'
              width='100%'
              height='600px'
              style={{ border: '1px solid #000', marginTop: '20px' }}
            />
          </>
        )}
      </Dialog>
      <VirtualScroller
        itemSize={50}
        items={members}
        itemTemplate={itemTemplate}
        loading={isPending}
        className='border-1 surface-border border-round'
        style={{ width: '15rem', height: '20rem' }}
      />
      <Button
        type='button'
        label='Obtener PDF'
        size='small'
        severity='success'
        outlined
        icon='pi pi-download'
        iconPos='right'
        loading={isPending}
        onClick={() => {
          generatePdf(members ?? [], setPdf)
          openPdf()
        }}
      />
    </div>
  )
}
