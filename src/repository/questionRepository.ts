// Repository de Question

import prisma from '../config/prisma'

//find random question that is active
//return random question or null if no active questions exist
export const getRandomQuestion = async () => {
  // Use raw query for MySQL RAND() function
  const questions = await prisma.$queryRaw<Array<{
    id: string
    text: string
    category: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }>>`
    SELECT * FROM Question 
    WHERE isActive = true 
    ORDER BY RAND() 
    LIMIT 1
  `
  
  return questions.length > 0 ? questions[0] : null
}

//find all questions, optionally filter by isActive
//return array of questions
export const getAllQuestions = async (isActive?: boolean) => {
  const where = isActive !== undefined ? { isActive } : {}
  
  return await prisma.question.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
}

//find question by id
//return question or null if not found
export const getQuestionById = async (id: string) => {
  return await prisma.question.findUnique({
    where: { id },
  })
}

