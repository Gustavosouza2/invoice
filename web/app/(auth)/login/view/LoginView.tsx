'use client'

import { useFormStatus, useFormState } from 'react-dom'
import { useCallback, useEffect } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Field, FieldSet, FieldGroup } from '@/components/ui/field'
import { loginAction } from '@/server-actions/server-login'
import { Button } from '@/components/features/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/(auth)/login-schema'
import { Input } from '@/components/features/Input'
import { useToast } from '@/hooks/ui/use-toast'

const initialState = {
  error: '',
  success: false,
}

export function LoginForm() {
  const { pending: isPending } = useFormStatus()
  const [state, formAction] = useFormState(loginAction, initialState)

  const { toast } = useToast()

  const stateActionValidate = useCallback(
    (state: typeof initialState) => {
      if (state?.error) {
        toast({
          title: 'O Login falhou!',
          description: 'O Email ou a senha estão incorretos, tente novamente!',
          variant: 'default',
        })
      }
      if (state.success) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Você está sendo redirecionado para a dashboard!',
          variant: 'default',
        })
        redirect('/dashboard/home')
      }
    },
    [toast],
  )

  useEffect(() => {
    stateActionValidate(state as typeof initialState)
  }, [state?.error, state?.success, stateActionValidate, state])

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    shouldUnregister: true,
  })

  const {
    register,
    formState: { isValid },
  } = form

  return (
    <main className="relative h-screen w-screen flex items-center justify-between overflow-hidden">
      <div className="w-full flex justify-center">
        <div className="w-[29rem] bg-bg-primary/50 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/5">
          <form action={formAction} className="flex flex-col gap-4" noValidate>
            <FieldSet>
              <div className="w-full flex justify-center mt-6">
                <h1 className="font-poppins font-semibold text-4xl text-center">
                  Bem vindo de volta!
                </h1>
              </div>
              <FieldGroup className="mt-6 gap-2">
                <Field>
                  <Input register={register} type="text" placeholder="Email" />
                </Field>
                <Field>
                  <Input
                    type="password"
                    register={register}
                    placeholder="Senha"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="text-end">
              <Link href="/auth/forgot-password">
                <span className="text-xs font-inter font-normal text-text-secondary hover:underline">
                  Esqueceu a senha?
                </span>
              </Link>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <Button
                type="submit"
                isLoading={isPending}
                disabled
                className="
                w-full h-11 rounded bg-bg-secondary
                font-inter font-medium disabled:opacity-60
                hover:bg-hover-yellow
                text-text-quaternary"
              >
                Entrar
              </Button>

              <Button
                type="button"
                disabled
                className="
                w-full h-11 rounded bg-button-gray
                text-text-tertiary hover:bg-hover-gray
                font-inter font-medium"
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <FaGoogle className="w-4 h-4" />
                  Continuar com o Google
                </span>
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
      <div className="block custom:hidden bg-bg-secondary w-full h-full rounded-s-3xl" />
    </main>
  )
}
