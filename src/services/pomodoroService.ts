// Service de Pomodoro
import {
  createPomodoro,
  findActivePomodoroByUserId,
  updatePomodoro,
  completePomodoro,
} from "../repository/pomodoroRepository";

//verify if already exists pomodoro session for the user
//if exists, return error because cant exists two pomodoro sessions for the same user
//if not exists, create a new pomodoro session, it will return with userid, startedat (now), status active and rest null
//prisma client will be used in the repository

export const startPomodoroService = async (userId: string) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (existingPomodoro) {
    const error: any = new Error("Sessão de Pomodoro já existe");
    error.statusCode = 400;
    throw error;
  }
  const newPomodoro = await createPomodoro(userId);
  return newPomodoro;
};

//verify if pomodoro session is active
//if not exists, return error because cant abandon a pomodoro session that not exists
//if exists, validate that abandon reason is send on request body
//update pomodoro session with status abandoned and abandonment reason
//return pomodoro session updated

export const abandonmentPomodoroService = async (
  userId: string,
  abandonmentReason: string
) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (!existingPomodoro) {
    const error: any = new Error("Sessão de Pomodoro não existe");
    error.statusCode = 400;
    throw error;
  }
  //update updatePomodoro with endedAt and duration abandoned
  const updatedPomodoro = await updatePomodoro(existingPomodoro.id, {
    status: "ABANDONED",
    abandonmentReason: abandonmentReason as string,
    endedAt: new Date(),
    duration: new Date().getTime() - existingPomodoro.startedAt.getTime(),
  });
  return updatedPomodoro;
};

//fetch pomodoro status = active and userid token
//if not exists return null (its information not error)
//calculate duration of pomodoro session (endedAt - startedAt)
//return sucess with pomodoro session active and duration calculated

export const getCurrentPomodoroService = async (userId: string) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (!existingPomodoro) {
    return null;
  }

  //verify if pomodoro session is expired
  const now = new Date();
  if (now > existingPomodoro.expiresAt) {

    //pomodoro expired, mark as completed
    const endedAt = existingPomodoro?.expiresAt;
    const duration = 20;
    const completedPomodoro = await completePomodoro(
      existingPomodoro.id,
      endedAt,
      duration
    );
    return { ...completedPomodoro, duration, isExpired: true };
  }
//pomodoro session is not expired, return pomodoro session active and duration calculated
  const elapsedMinutes = Math.floor(
    (now.getTime() - existingPomodoro.startedAt.getTime()) / 1000 / 60
  );

  return {
    ...existingPomodoro,
    duration: elapsedMinutes,
    remainingMinutes: 20 - elapsedMinutes,
    expiresAt: existingPomodoro.expiresAt,
  };
};
