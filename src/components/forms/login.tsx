import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, useNavigate } from '@tanstack/react-router'
import { useLogin } from '@/hooks/useAuth'

export function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate: login, isPending, isError, error } = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login(
            { email, password },
            {
                onSuccess: () => {
                    navigate({ to: '/dashboard' })
                },
            }
        )
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {isError && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {error?.response?.data?.message || 'Login failed. Please try again.'}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
