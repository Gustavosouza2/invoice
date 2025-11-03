'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

import { Field, FieldSet, FieldGroup } from '@/components/ui/field'
import type { LoginRequest } from '@/services/auth/types'
import { Button } from '@/components/features/Button'
import LoginImage from '@/assets/images/boy-img.png'
import { Input } from '@/components/features/Input'
import { LoginSchema } from '@/(auth)/login-schema'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isValid = LoginSchema.safeParse({ email, password }).success

  const handleSubmit = async (data: LoginRequest) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.message || 'Erro ao fazer login')
        return
      }

      toast.success('Login realizado com sucesso!')
      router.replace('/dashboard/home')
      return result
    } catch (err) {
      toast.error('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative h-screen w-screen flex items-center justify-between overflow-hidden">
      <div className="w-full flex justify-center">
        <div className="w-[29rem] bg-bg-primary/50 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/5">
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              if (!isValid) return
              await handleSubmit({ email, password })
            }}
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
                    type="text"
                    placeholder="Email"
                  />
                </Field>
                <Field>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Senha"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="mt-2 flex flex-col gap-2">
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                className="
                w-full h-11 rounded bg-bg-secondary
                font-inter font-medium disabled:opacity-60
                hover:bg-hover-yellow
                text-text-quaternary"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="flex w-full justify-center my-7">
                <p className="text-xs font-inter font-normal text-text-tertiary">
                  Não tem uma conta?
                  <Link href="/auth/register">
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
      <div className="hidden custom:flex bg-bg-secondary w-full h-full rounded-s-3xl justify-center items-center flex-col gap-10">
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
