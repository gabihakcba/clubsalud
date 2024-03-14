'use client'

import React, { useState } from "react"
import { updateMember, deleteMember } from "queries/members"
import { Button } from "components/Buttons"
import { CreateMember, Member, QueriesResponse } from "utils/types"
import { calculatePages, APP } from "utils/const"
import { FieldValues, useForm } from "react-hook-form"

const deleteMemberB = async (id: number, members: Array<Member>, setMembers: Function, setPages: Function, setIsOpen: Function): Promise<void> => {
  const response: QueriesResponse = await deleteMember(id)
  if (response.status === 200) {
    const newMembers: Array<Member> = [...members]
    const indexF: (e: Member) => boolean = (e: Member): boolean => Number(e.id) === Number(id)
    const index: number = newMembers.findIndex(indexF)
    const deletedMember: Array<Member> = newMembers.splice(index, 1)
    setIsOpen((prev: boolean) => !prev)
    setMembers((odlMembers: Array<Member>) => {
      setPages(calculatePages(odlMembers.length - 1, APP))
      return newMembers
    })
  }
  else {
    console.log('Client: error on deleteMember')
  }
}

const update = async (id: number, setIsOpen: Function, setMembers: Function, data: FieldValues, members: Array<Member>): Promise<void> => {
  const newMember: Member = {
    id: id,
    ...data as Member
  }

  const response: QueriesResponse = await updateMember(newMember)
  if (response.status === 200) {
    const newMembers: Array<Member> = members.map(obj => {
      if (obj.id === response.data.id) {
        return newMember;
      }
      return obj;
    });
    setMembers(newMembers)
    setIsOpen((prev: boolean) => !prev)
  }
  else {
    console.log('Client: error on updateMember: ')
  }
}

export function UpdateDropdown({ member, setMembers, members, setPages }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  return (
    <div className={'flex flex-col w-full'}>
      <Button onAction={() => setIsOpen(prev => !prev)} text='Actualizar' hover='hover:bg-yellow-500' bg=''></Button>
      {
        isOpen &&
        <form
          onSubmit={handleSubmit((data) => update(member.id, setIsOpen, setMembers, data, members))}
          id="updateForm"
          className="w-full sm:w-max bg-gray-500 shadow-md rounded px-2 pt-2 pb-2 h-max absolute left-0 right-0 bottom-0 top-0 ml-auto mr-auto mb-auto mt-auto">
          <div className="mb-2">
            <label className="block text-white text-base font-bold mb-2" htmlFor="name">
              Nombre de Usuario
            </label>
            <input
              {...register('name', {
                required: {
                  value: true,
                  message: 'Nombre requerido'
                }
              })}
              form="updateForm"
              defaultValue={member.name}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              autoComplete="off"
              placeholder={member.name}>
            </input>
            {
              errors?.name &&
              <span className="inputError">{errors.name.message as string}</span>
            }
          </div>
          <div className="flex flex-col">
            <div className="flex items-stretch sm:items-center justify-between flex-col sm:flex-row">
              <button
                form="updateForm"
                className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Enviar
              </button>
              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Cancelar
              </button>
            </div>
            <button
              onClick={() => deleteMemberB(member.id, members, setMembers, setPages, setIsOpen)}
              className='hover:bg-red-500 border border-red-500 flex flex-row rounded w-full p-2'
              type="button">
              Eliminar
            </button>
          </div>
        </form>
      }
    </div>
  )
}