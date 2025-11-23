'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'

import { Field, FieldSet, FieldGroup } from '@/components/ui/field'
import type { RegisterRequest } from '@/services/auth/types'
import { RegisterSchema } from '@/(auth)/register/schema/register-schema'
import { Button } from '@/components/features/Button'
import LoginImage from '@/assets/images/boy-img.png'
import { Input } from '@/components/features/Input'
import { Toast } from '@/components/features/Toast'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
    },
    mode: 'onChange',
  })

  const {
    formState: { isValid },
    handleSubmit,
    control,
  } = form

  const isTrueValid = isValid && !isLoading

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/auth/register', data)
      if (response.status < 200 || response.status >= 300) {
        Toast({
          type: 'error',
          message: 'Erro ao fazer registro. Tente novamente.',
        })
        return
      }

      Toast({
        type: 'success',
        message: 'Registro realizado com sucesso!',
        description: 'Você será redirecionado para a dashboard.',
      })

      router.replace('/dashboard/home')
    } catch {
      Toast({
        type: 'error',
        message: 'Erro ao fazer registro. Tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    router.prefetch('/dashboard/home')
  }, [router])

  return (
    <main className="relative h-screen w-screen flex items-center justify-between overflow-hidden">
      <div className="hidden custom:flex bg-bg-secondary w-full h-full rounded-e-3xl justify-center items-center flex-col gap-10">
        <h1 className="text-text-quaternary text-center text-3xl font-bold font-poppins">
          Aqui é onde tudo começa.
        </h1>
        <Image
          alt="Register Background"
          src={LoginImage}
          quality={100}
          height={350}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[29rem] h-[30rem] bg-bg-primary/50 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/5">
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldSet>
              <div className="w-full flex justify-center mt-6">
                <h1 className="font-poppins font-semibold text-4xl text-center">
                  Crie sua conta!
                </h1>
              </div>
              <FieldGroup className="mt-6 gap-2">
                <Field>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu nome"
                        iconType="name"
                        type="text"
                      />
                    )}
                  />
                </Field>
                <Field>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu telefone"
                        iconType="phone"
                        type="text"
                      />
                    )}
                  />
                </Field>
                <Field>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu email"
                        iconType="email"
                        type="text"
                      />
                    )}
                  />
                </Field>
                <Field>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Crie sua senha"
                        iconType="password"
                        type="password"
                      />
                    )}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <div className="mt-2 flex flex-col gap-2">
              <Button
                type="submit"
                disabled={!isTrueValid}
                isLoading={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
