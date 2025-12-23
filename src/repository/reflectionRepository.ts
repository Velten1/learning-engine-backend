// Repository de Reflexões

import prisma from "../config/prisma";

//find reflection by pomodoroId
export const findReflectionByPomodoroId = async (pomodoroId: string) => {
  return await prisma.reflection.findUnique({
    where: { pomodoroId: pomodoroId },
  });
}

//create reflection
export const createReflection = async (reflectionData: {
  pomodoroId: string;
  userId: string;
  topic: string;
  whatIThought: string;
  whatItActuallyIs: string;
  summary: string;
  mandatoryQuestion: string;
  optionalQuestion?: string | null;
}) => {
  return await prisma.reflection.create({
    data: reflectionData,
  });
}