// import auth repository, findUserByEmail, createUser
import { findUserByEmail, createUser, generateToken } from '../repository/authRepository'
import bcrypt from 'bcryptjs'

export const registerService = async (email: string, password: string, name: string) => {
    const user = await findUserByEmail(email)
    if (user) {
        const error: any = new Error('Usuário já existe')
        error.statusCode = 409
        throw error
    }

    //validate password length
    if (password.length < 8) {
        const error: any = new Error('Senha deve ter pelo menos 8 caracteres')
        error.statusCode = 400
        throw error
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user and return without password
    const newUser = await createUser(email, hashedPassword, name)
    const { password: _, ...userWithoutPassword } = newUser
    return { status: 201, data: userWithoutPassword}
}

export const loginService = async (email: string, password: string) => {

    //find user by email and validate if user exists
    const user = await findUserByEmail(email)
    if (!user) {
        const error: any = new Error('Email ou senha incorretos')
        error.statusCode = 401
        throw error
    }
    // compare password and validate if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        const error: any = new Error('Email ou senha incorretos')
        error.statusCode = 401
        throw error
    }

    //generate token jwt with user id
    const token = generateToken(user.id)
    const { password: _, ...userWithoutPassword } = user
    return { status: 200, data: { ...userWithoutPassword, token } }


}