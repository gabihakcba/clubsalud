'use client'

import { type ReactElement, useState } from 'react'
import { deleteAccount, getAccounts } from 'queries/accounts'
import { APP } from 'utils/const'
import AccountTopbar from 'components/account/AccountTopbar'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type Account, type Permissions } from 'utils/types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Card } from 'primereact/card'

interface getAccountsType {
  pages: Account[]
  totalPages: number
  perPage: number
  nextPage: number
  currentPage: number
}
const getAccountsElems = async (info): Promise<getAccountsType> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, currentPage, elems, filterName, filterPermissions]: [
    string,
    number,
    number,
    string,
    Permissions
  ] = info.queryKey
  return await getAccounts(0, elems, filterName, filterPermissions)
}

export default function Accounts(): ReactElement {
  const [selected, setSelected] = useState<any>(null)
  const filters = {
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    permissions: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  const query = useQueryClient()

  const key = ['acc', 1, APP, '', '']

  const { data: accounts } = useQuery({
    queryKey: key,
    queryFn: async (info) => {
      const response = await getAccountsElems(info)
      return response.pages
    }
  })

  const { mutate: deleteF, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteAccount(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
    }
  })

  return (
    <Card className='h-screen'>
      <ConfirmDialog />
      <DataTable
        value={accounts}
        tableStyle={{ minWidth: '5rem' }}
        header={() => <AccountTopbar></AccountTopbar>}
        scrollable
        scrollHeight='85dvh'
        showGridlines
        stripedRows
        sortMode='multiple'
        removableSort
        filters={filters}
        filterDisplay='row'
        selectionMode='single'
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value.rowData)
        }}
      >
        <Column
          field='id'
          header='ID'
          sortable
          filter
          filterPlaceholder='Buscar por ID'
        ></Column>
        <Column
          field='username'
          header='Nombre de usuario'
          sortable
          filter
          filterPlaceholder='Buscar por nombre de usuario'
        ></Column>
        <Column
          field='permissions'
          header='Permisos'
          filter
          filterPlaceholder='Buscar por permissos'
        ></Column>
        <Column
          body={(account) => (
            <>
              <Button
                label='Eliminar'
                severity='danger'
                outlined
                icon='pi pi-trash'
                iconPos='right'
                size='small'
                loading={isPending && selected?.id === account.id}
                onClick={() => {
                  setSelected({ id: Number(account.id) })
                  confirmDialog({
                    message: 'Confirmación de acción',
                    header: 'Eliminar cuenta',
                    icon: 'pi pi-info-circle',
                    defaultFocus: 'reject',
                    acceptClassName: 'p-button-danger',
                    accept: () => {
                      deleteF(Number(account.id))
                    }
                  })
                }}
              ></Button>
            </>
          )}
        ></Column>
        <Column
          body={(account) => (
            <Button
              label='Información'
              severity='info'
              link
              icon='pi pi-info-circle'
              iconPos='right'
              size='small'
              onClick={() => {
                console.log(account)
              }}
            ></Button>
          )}
        ></Column>
      </DataTable>
    </Card>
  )
}
