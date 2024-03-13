'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { signInAccount } from "queries/login"
import { LogIn } from 'utils/types'
import { FieldValues, useForm } from "react-hook-form"

const logIn = async (data: FieldValues, router, setLogginFailed): Promise<void> => {
  const user: LogIn = data as LogIn
  const response = await signInAccount(user)
  if (response.status === 200) {
    router.push('/admin')
  }
  else {
    setLogginFailed(true)
  }
}

export default function Home() {

  const router = useRouter()
  const [logginFailed, setLogginFailed] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        id='loginForm'
        onSubmit={handleSubmit((data) => logIn(data, router, setLogginFailed))}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="username">
            Username
          </label>
          <input
            {
            ...register('username', {
              required: {
                value: true,
                message: 'El nombre es requerido'
              }
            })
            }
            name="username"
            className="inputForm"
            form="loginForm"
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            autoComplete="off"
          >
          </input>
          {
            errors?.username &&
            <span className="inputError">{errors.username.message as string}</span>
          }
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            {
            ...register('password', {
              required: {
                value: true,
                message: 'La contraseña es requerida'
              }
            })
            }
            name="password"
            className="inputForm"
            form="loginForm"
            id="password"
            type="password"
            placeholder="******************">
          </input>
          {
            errors?.password &&
            <span className="inputError">{errors.password.message as string}</span>
          }
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <button
              className="blueButtonForm"
              type="submit"
              form="loginForm">
              Sign In
            </button>
            <a
              className="linkBlueForm"
              href="#">
              Forgot Password?
            </a>
          </div>
          {
            logginFailed &&
            <span className="inputError">Contraseña y/o usuario incorrecto</span>
          }
        </div>
      </form>
    </div>
  );
}
