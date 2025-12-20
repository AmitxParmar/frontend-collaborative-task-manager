// Auth DTOs
export interface RegisterDto {
    email: string
    name: string
    password: string
}

export interface LoginDto {
    email: string
    password: string
}

// User type
export interface User {
    id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
}

// Auth response
export interface AuthResponse {
    user: User
}
