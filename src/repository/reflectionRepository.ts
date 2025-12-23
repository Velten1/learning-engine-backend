// Repository de Reflexões

import prisma from "../config/prisma";

//find reflection by pomodoroId
export const findReflectionByPomodoroId = async (pomodoroId: string) => {
  return await prisma.reflection.findUnique({
    where: { pomodoroId: pomodoroId },
  });
};

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
};

//find reflection by id
export const findReflectionById = async (id: string) => {
  return await prisma.reflection.findUnique({
    where: { id: id },
  });
};

//find array of reflections by userId
export const findReflectionsByUserId = async (userId: string) => {
  return await prisma.reflection.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });
};

//update reflection by id
export const updateReflectionById = async (
  id: string,
  reflectionData: {
    topic?: string | null;
    whatIThought?: string | null;
    whatItActuallyIs?: string | null;
    summary?: string | null;
    mandatoryQuestion?: string | null;
    optionalQuestion?: string | null;
  }
) => {
  // Build data object only with provided fields
  const updateData: any = {};
  if (reflectionData.topic !== undefined)
    updateData.topic = reflectionData.topic;
  if (reflectionData.whatIThought !== undefined)
    updateData.whatIThought = reflectionData.whatIThought;
  if (reflectionData.whatItActuallyIs !== undefined)
    updateData.whatItActuallyIs = reflectionData.whatItActuallyIs;
  if (reflectionData.summary !== undefined)
    updateData.summary = reflectionData.summary;
  if (reflectionData.mandatoryQuestion !== undefined)
    updateData.mandatoryQuestion = reflectionData.mandatoryQuestion;
  if (reflectionData.optionalQuestion !== undefined)
    updateData.optionalQuestion = reflectionData.optionalQuestion;

  return await prisma.reflection.update({
    where: { id: id },
    data: updateData,
  });
};

//delete reflection by id
export const deleteReflectionById = async (id: string) => {
  return await prisma.reflection.delete({
    where: { id: id },
  });
};
