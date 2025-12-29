// Service de Reflexões

import {
  findReflectionByPomodoroId,
  createReflection,
  findReflectionById,
  findReflectionsByUserId,
  updateReflectionById,
  deleteReflectionById,
} from "../repository/reflectionRepository";
import { findPomodoroByIdAndUserId } from "../repository/pomodoroRepository";

//verify if pomodoroSessionId exists and it is from userId
//verify if exists a reflection for this pomodoroSessionId
//if validations are ok, call the repository to make all db things
//returns reflection created
export const createReflectionService = async (
  userId: string,
  reflectionData: {
    pomodoroId: string;
    topic: string;
    whatIThought: string;
    whatItActuallyIs: string;
    summary: string;
    mandatoryQuestion: string;
    optionalQuestion?: string | null;
  }
) => {
  // verify if pomodoro session exists and it is from userId
  const pomodoroSession = await findPomodoroByIdAndUserId(
    reflectionData.pomodoroId,
    userId
  ); // here use the pomodoro repository to find the pomodoro session by id and userId
  if (!pomodoroSession) {
    const error: any = new Error(
      "Sessão de Pomodoro não existe ou não pertence ao usuário"
    );
    error.statusCode = 404;
    throw error;
  }

  // verify if exists a reflection for this pomodoroId
  const existingReflection = await findReflectionByPomodoroId(
    reflectionData.pomodoroId
  );
  if (existingReflection) {
    const error: any = new Error(
      "Reflexão já existe para esta sessão de Pomodoro"
    );
    error.statusCode = 409;
    throw error;
  }

  // create reflection with userId included
  const createdReflection = await createReflection({
    ...reflectionData,
    userId: userId,
  });
  return createdReflection;
};

//verify if reflection exists
//verify if reflection is from userId
//if validations are ok, call the repository to get the reflection
//returns reflection
export const getReflectionService = async (
  userId: string,
  reflectionId: string
) => {
  // verify if reflection exists
  const reflection = await findReflectionById(reflectionId);
  if (!reflection) {
    const error: any = new Error("Reflexão não existe");
    error.statusCode = 404;
    throw error;
  }
  // verify if reflection is from userId
  if (reflection.userId !== userId) {
    const error: any = new Error("Reflexão não pertence ao usuário");
    error.statusCode = 403;
    throw error;
  }
  // if validations are ok, call the repository to get the reflection
  return reflection;
};

//verify if reflection exists
//verify if reflection is from userId
//if validations are ok, call the repository to get the reflections by pomodoro id
//returns reflections
export const getReflectionsByPomodoroSessionIdService = async (
  userId: string,
  pomodoroId: string
) => {
  // verify if reflection exists
  const reflection = await findReflectionByPomodoroId(pomodoroId);
  if (!reflection) {
    const error: any = new Error("Reflexão não existe");
    error.statusCode = 404;
    throw error;
  }
  // verify if reflection is from userId
  if (reflection.userId !== userId) {
    const error: any = new Error("Reflexão não pertence ao usuário");
    error.statusCode = 403;
    throw error;
  }
  // if validations are ok, return const reflection to controller
  return reflection;
};

//receive userId and call the repository to get the reflections by user id
//returns array of reflections (can be empty array)
export const getReflectionsByUserIdService = async (userId: string) => {
  // call the repository to get the reflections by user id
  const reflections = await findReflectionsByUserId(userId);
  // findMany always returns an array (can be empty), no need to verify null
  return reflections;
};

//verify if reflection exists
//verify if reflection is from userId
//if validations are ok, call the repository to update the reflection
//returns reflection updated
export const updateReflectionByIdService = async (
  userId: string,
  reflectionId: string,
  reflectionData: {
    topic?: string | null;
    whatIThought?: string | null;
    whatItActuallyIs?: string | null;
    summary?: string | null;
    mandatoryQuestion?: string | null;
    optionalQuestion?: string | null;
  }
) => {
  // verify if reflection exists
  const reflection = await findReflectionById(reflectionId);
  if (!reflection) {
    const error: any = new Error("Reflexão não existe");
    error.statusCode = 404;
    throw error;
  }
  // verify if reflection is from userId
  if (reflection.userId !== userId) {
    const error: any = new Error("Reflexão não pertence ao usuário");
    error.statusCode = 403;
    throw error;
  }
  // Build update data only with provided fields
  const updateData: {
    topic?: string | null;
    whatIThought?: string | null;
    whatItActuallyIs?: string | null;
    summary?: string | null;
    mandatoryQuestion?: string | null;
    optionalQuestion?: string | null;
  } = {};

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

  // if validations are ok, call the repository to update the reflection
  const updatedReflection = await updateReflectionById(
    reflectionId,
    updateData
  );
  return updatedReflection;
};

//verify if reflection exists
//verify if reflection is from userId
//if validations are ok, call the repository to delete the reflection
//returns reflection deleted
export const deleteReflectionByIdService = async (
  userId: string,
  reflectionId: string
) => {
  // verify if reflection exists
  const reflection = await findReflectionById(reflectionId);
  if (!reflection) {
    const error: any = new Error("Reflexão não existe");
    error.statusCode = 404;
    throw error;
  }
  // verify if reflection is from userId
  if (reflection.userId !== userId) {
    const error: any = new Error("Reflexão não pertence ao usuário");
    error.statusCode = 403;
    throw error;
  }
  // if validations are ok, call the repository to delete the reflection
  const deletedReflection = await deleteReflectionById(reflectionId);
  return deletedReflection;
};
