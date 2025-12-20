import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { useRegister } from '@/hooks/useAuth'

export function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationError, setValidationError] = useState('')

    const { mutate: register, isPending, isError, error } = useRegister()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setValidationError('')

        // Validate passwords match
        if (password !== confirmPassword) {
            setValidationError('Passwords do not match')
            return
        }

        // Validate password length (backend requires min 8 chars)
        if (password.length < 8) {
            setValidationError('Password must be at least 8 characters long')
            return
        }

        register(
            { name, email, password },
            {
                onSuccess: () => {
                    // TODO: Navigate to dashboard or login once route is created
                    console.log('Registration successful - redirect to dashboard or login')
                },
            }
        )
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                    Sign up to start managing your tasks
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {(validationError || isError) && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {validationError || error?.response?.data?.message || 'Registration failed. Please try again.'}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
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
                            required
                            minLength={8}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isPending}
                            required
                            minLength={8}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating account...' : 'Create Account'}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
