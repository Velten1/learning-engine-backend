// import auth repository, findUserByEmail, createUser
import { findUserByEmail, createUser, generateToken, findUserById, updateUser } from '../repository/authRepository'
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
    
    // Generate token for automatic login
    const token = generateToken(newUser.id)
    
    return { status: 201, data: { ...userWithoutPassword, token } }
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

//get user profile service
//return user profile without password
export const getUserProfileService = async (userId: string) => {
    const user = await findUserById(userId)
    if (!user) {
        const error: any = new Error('Usuário não encontrado')
        error.statusCode = 404
        throw error
    }
    const { password: _, ...userWithoutPassword } = user
    return { status: 200, data: userWithoutPassword }
}

//create userDataToUpdate object to receive all fields 
//verify if has name 
//verify if has email
//verify if email is already in use for another user on database
//verify if we have a field filled, if not return error
//update user send userDataToUpdate to repository
//remove password before return to controller
//returns to controller the user profile without password
export const editUserProfileService = async (userId: string, userData: any) => {
    //create userDataToUpdate object to receive all fields
    const userDataToUpdate: any = {}
    //verify if has name
    if (userData.name !== undefined) {
        if (!userData.name) {
            const error: any = new Error('Nome é obrigatório')
            error.statusCode = 400
            throw error
        }
        userDataToUpdate.name = userData.name
    }
    //verify if has email
    if (userData.email !== undefined) {
        if (!userData.email) {
            const error: any = new Error('Email é obrigatório')
            error.statusCode = 400
            throw error
        }
        userDataToUpdate.email = userData.email
        //verify if email is already in use for another user on database
        const existingUserByEmail = await findUserByEmail(userData.email)
        if (existingUserByEmail && existingUserByEmail.id !== userId) {
            const error: any = new Error('Email já está em uso')
            error.statusCode = 400
            throw error
        }
    }
        
    //verify if we have a field filled, if not return error
        if (Object.keys(userDataToUpdate).length === 0) {
            const error: any = new Error('Nenhum campo foi fornecido para atualização')
            error.statusCode = 400
            throw error
        }
    //update user send userDataToUpdate to repository
    const user = await updateUser(userId, userDataToUpdate)
    //remove password before return to controller
    const { password: _, ...userWithoutPassword } = user
    //return user profile without password to controller
    return { status: 200, data: userWithoutPassword }
}