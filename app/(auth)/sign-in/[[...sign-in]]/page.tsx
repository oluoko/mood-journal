'use client'

import React, { FormEvent, useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ClerkAPIError } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Loader from '@/components/Loader'
import AuthLayout from '@/components/AuthLayout'
import Separator from '@/components/CustomSeparator'
import OauthSignIn from '@/components/OAuth'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ClerkAPIError[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authStage, setAuthStage] = useState<
    'initial' | 'authenticating' | 'redirecting'
  >('initial')
  const router = useRouter()

  const { userId } = useAuth()

  console.log('userId:: ', userId)
  if (userId) {
    router.push('/saving-info')
  }

  if (!isLoaded) {
    return <Loader text="Preparing the SignIn" />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors(undefined)
    setAuthStage('authenticating')
    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      if (signInAttempt.status === 'complete') {
        setAuthStage('redirecting')
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/saving-info')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setAuthStage('initial')
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error(JSON.stringify(err, null, 2))
      setAuthStage('initial')
    } finally {
      if (authStage !== 'redirecting') {
        setIsLoading(false)
      }
    }
  }

  if (authStage === 'redirecting') {
    return <Loader text="Sign In Successful" />
  }

  return (
    <AuthLayout mode="sign-in">
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[90vw] md:w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-bold text-center text-2xl">
              Welcome back to{' '}
              <span className="font-black text-3xl">
                <span className="text-primary text-4xl">R</span>
                eflectify
              </span>
              . Sign in to continue.
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-6">
            <SocialAuthButtons mode="sign-in" />
          </div> */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Enter password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-foreground" />
                    ) : (
                      <Eye className="size-5 text-foreground" />
                    )}
                  </button>
                </div>
              </div>
              {errors && (
                <Alert>
                  {errors.map((el, index) => (
                    <AlertDescription key={index}>
                      {el.longMessage}
                    </AlertDescription>
                  ))}
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 md:size-6 animate-spin" />
                    Logging you in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
              <Separator text="Sign In" />
              <OauthSignIn />
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Register a new one.
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  )
}
