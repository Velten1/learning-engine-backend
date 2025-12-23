// Controller de reflexões
import { Request, Response } from "express";
import {
  createReflectionService,
  getReflectionService,
  getReflectionsByPomodoroSessionIdService,
  getReflectionsByUserIdService,
  updateReflectionByIdService,
  deleteReflectionByIdService,
} from "../services/reflectionService";

//extract userid from request
//extract from body the reflection data
//validade if obrigatory fields are filled
//call the service to create the reflection
//return the reflection created
export const createReflection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;

    // extract the reflection data from the body
    const {
      pomodoroId,
      topic,
      whatIThought,
      whatItActuallyIs,
      summary,
      mandatoryQuestion,
      optionalQuestion,
    } = req.body;

    // validate if all mandatory fields are filled
    if (
      !pomodoroId ||
      !topic ||
      !whatIThought ||
      !whatItActuallyIs ||
      !summary ||
      !mandatoryQuestion
    ) {
      return res
        .status(400)
        .json({
          message: "Todos os campos obrigatórios devem ser preenchidos",
        });
    }

    // prepare the reflection data to be sent to the service
    const reflectionData = {
      pomodoroId,
      topic,
      whatIThought,
      whatItActuallyIs,
      summary,
      mandatoryQuestion,
      optionalQuestion: optionalQuestion || null,
    };

    // call the service to create the reflection
    const reflection = await createReflectionService(userId, reflectionData);
    return res.status(201).json(reflection);
  } catch (error: any) {
    console.error("Erro ao criar reflexão:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};

//extract userId from request
//extract id from route params
//validate if id is provided
//call the service to get the reflection
//return the reflection
export const getReflection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const reflectionId = req.params.id;

    // validate if id is provided
    if (!reflectionId) {
      return res.status(400).json({ message: "ID da reflexão é obrigatório" });
    }

    const reflection = await getReflectionService(userId, reflectionId);
    return res.status(200).json(reflection);
  } catch (error: any) {
    console.error("Erro ao obter reflexão:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};

//extract userId from token
//extract pomodoroId from route params
//call the service to get the reflections by pomodoro id
//return the reflections
export const getReflectionsByPomodoroSessionId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).userId as string;
    const pomodoroId = req.params.id;
    // validate if pomodoroId is provided
    if (!pomodoroId) {
      return res
        .status(400)
        .json({ message: "ID da sessão de Pomodoro é obrigatório" });
    }

    const reflections = await getReflectionsByPomodoroSessionIdService(
      userId,
      pomodoroId
    );
    return res.status(200).json(reflections);
  } catch (error: any) {
    console.error("Erro ao obter reflexões:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};

//extract userId from token
//call the service to get the reflections by user id
//return the reflections
export const getReflectionsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    // userId came from token dont need params in the route
    const reflections = await getReflectionsByUserIdService(userId);
    return res.status(200).json(reflections);
  } catch (error: any) {
    console.error("Erro ao obter reflexões:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};

//extract userId from token
//extract id from route params
//extract from body the reflection data
//verify if at least one field is provided for update
//if validations are ok, call the service to update the reflection
//return the reflection updated
export const updateReflectionById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const reflectionId = req.params.id;
    const reflectionData = req.body;

    // verify if at least one field is provided for update
    if (Object.keys(reflectionData).length === 0) {
      return res
        .status(400)
        .json({ message: "Nenhum campo foi preenchido para ser atualizado" });
    }
    // call the service to update the reflection
    const reflection = await updateReflectionByIdService(
      userId,
      reflectionId,
      reflectionData
    );
    return res.status(200).json(reflection);
  } catch (error: any) {
    console.error("Erro ao atualizar reflexão:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};

//extract userId from token
//extract id from route params
//call the service to delete the reflection
//return the reflection deleted
export const deleteReflectionById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const reflectionId = req.params.id;
    const reflection = await deleteReflectionByIdService(userId, reflectionId);
    return res.status(200).json(reflection);
  }
  catch (error: any) {
    console.error("Erro ao deletar reflexão:", error.message);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    return res.status(statusCode).json({ message: message });
  }
};