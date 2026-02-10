'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { Field, FieldSet, FieldGroup } from '@/components/ui/field'
import { Button } from '@/components/features/Button/DefaultButton'
import { setToken, setSessionToken } from '@/services/token'
import type { LoginRequest } from '@/services/auth/types'
import { useUserContext } from '@/context/userContext'
import { LoginSchema } from '../schema/login-schema'
import LoginImage from '@/assets/images/boy-img.png'
import { Input } from '@/components/features/Input'
import { Toast } from '@/components/features/Toast'

export function LoginForm() {
  const router = useRouter()
  const { handleLogin } = useUserContext()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isValid = LoginSchema.safeParse({ email, password }).success

  const onSubmit = useCallback(
    async (data: LoginRequest) => {
      setIsLoading(true)

      await axios
        .post('/api/auth/login', data)
        .then((res) => {
          handleLogin({
            user: res?.data.user,
            token: res?.data.token,
          })

          setToken(res?.data.jwt)
          setSessionToken(res?.data.token)

          Toast({
            type: 'success',
            message: 'Login realizado com sucesso!',
            description: 'Você será redirecionado para a dashboard.',
          })

          router.replace('/dashboard/home')

          return res
        })
        .catch(() =>
          Toast({
            type: 'error',
            message: 'Erro ao fazer login. Tente novamente.',
          }),
        )
        .finally(() => setIsLoading(false))
    },
    [router, handleLogin],
  )

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) return

    await onSubmit({ email, password })
  }

  return (
    <main className="relative h-screen w-screen flex items-center justify-between overflow-hidden">
      <div className="w-full flex justify-center">
        <div className="w-[29rem] bg-bg-primary/50 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/5">
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={handleSubmitForm}
          >
            <FieldSet>
              <div className="w-full flex justify-center mt-6">
                <h1 className="font-poppins font-semibold text-4xl text-center">
                  Bem vindo de volta!
                </h1>
              </div>
              <FieldGroup className="mt-6 gap-2">
                <Field>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    value={email}
                    type="text"
                    placeholder="Email"
                    iconType="email"
                  />
                </Field>
                <Field>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Senha"
                    iconType="password"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="mt-2 flex flex-col gap-2">
              <Button
                type="default"
                text="ENTRAR"
                htmlType="submit"
                isLoading={isLoading}
                disabled={!isValid || isLoading}
              />

              <div className="flex w-full justify-center my-7">
                <p className="text-xs font-inter font-normal text-text-tertiary">
                  Não tem uma conta?
                  <Link href="/register">
                    <span className="ml-1 text-text-secondary hover:underline">
                      Clique aqui
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden custom:flex bg-accent w-full h-full rounded-s-3xl justify-center items-center flex-col gap-10">
        <h1 className="text-text-quaternary text-center text-3xl font-bold font-poppins">
          Suas notas fiscais em um só lugar.
        </h1>
        <Image
          alt="Login Background"
          src={LoginImage}
          quality={100}
          height={350}
        />
      </div>
    </main>
  )
}
