// import auth repository, findUserByEmail, createUser
import { findUserByEmail, createUser } from '../repository/authRepository'

export const registerService = async (email: string, password: string, name: string) => {
    const user = await findUserByEmail(email)
    if (user) {
        throw new Error('Usuário já existe')
    }
    const newUser = await createUser(email, password, name)
    return newUser
}

export const loginService = async (email: string, password: string) => {
    const user = await findUserByEmail(email)
    if (!user) {
        throw new Error('Usuário não encontrado')
    }
    if (user.password !== password) {
        throw new Error('Senha incorreta')
    }
    return user
}