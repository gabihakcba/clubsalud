import { Button } from 'primereact/button'
import { useState, type ReactElement } from 'react'
import { type Member } from 'utils/ClubSalud/types'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

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
    { header: 'DNI', dataKey: 'dni' },
    { header: 'Numero', dataKey: 'phoneNumber' }
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

export default function MembersList({
  members
}: {
  members: Member[]
}): ReactElement {
  const [showPdf, openPdf, closePdf] = useModal(false)
  const [pdf, setPdf] = useState(null)

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
      <DataTable
        value={members}
        scrollable
        scrollHeight='30rem'
      >
        <Column
          header='Apellido'
          field='lastName'
        />
        <Column
          header='Nombre'
          field='name'
        />
        <Column
          header='DNI'
          field='dni'
        />
        <Column
          header='Número'
          field='phoneNumber'
        />
      </DataTable>
      <Button
        type='button'
        label='Obtener PDF'
        size='small'
        severity='success'
        outlined
        icon='pi pi-download'
        iconPos='right'
        onClick={() => {
          generatePdf(members, setPdf)
          openPdf()
        }}
      />
    </div>
  )
}
