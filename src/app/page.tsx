'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { parse } from "cookie"
import { signInAccount } from "queries/login"
import { LogIn } from 'utils/types'

const signIn = async (router, data, setLogginFailed) => {
  const user: LogIn = {
    username: data.username,
    password: data.password
  }
  const response = await signInAccount(user)

  if (response.status === 200) {
    router.push('/admin')
  }
  else {
    setLogginFailed(true)
  }
}

const handleChange = (e, setData) => {
  setData(data => {
    return {
      ...data,
      [e.target.id]: e.target.value
    }
  })
}

export default function Home() {
  const router = useRouter()
  const [logginFailed, setLogginFailed] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  
  /**
   * Esta comprobacion esta en el middleware
   */
  // useEffect(() => {
  //   const cookie = parse(`${document.cookie}` || '')
  //   if (cookie.auth) {
  //     router.push('/admin')
  //   }
  // }, [router])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="username">
            Username
          </label>
          <input
            name="password"
            onChange={(e) => handleChange(e, setData)}
            className="inputForm"
            id="username"
            type="text"
            placeholder="Username"
            autoComplete="off">
          </input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            name="password"
            onChange={(e) => handleChange(e, setData)}
            className="inputForm"
            id="password"
            type="password"
            placeholder="******************">
          </input>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <button
              onClick={() => signIn(router, data, setLogginFailed)}
              className="blueButtonForm"
              type="button">
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
            <div className="flex justify-center">
              <p className="text-red-500 text-sm italic">
                Wrong password or user name. Try again
              </p>
            </div>
          }
        </div>
      </form>
    </div>
  );
}
