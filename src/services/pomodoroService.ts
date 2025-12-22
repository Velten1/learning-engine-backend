// Service de Pomodoro
import {
  createPomodoro,
  findActivePomodoroByUserId,
  updatePomodoro,
  completePomodoro,
  resetPomodoro,
} from "../repository/pomodoroRepository";

//verify if already exists pomodoro session for the user
//if exists, return error because cant exists two pomodoro sessions for the same user
//if not exists, create a new pomodoro session, it will return with userid, startedat (now), status active and rest null
//prisma client will be used in the repository

export const startPomodoroService = async (userId: string) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (existingPomodoro) {
    const error: any = new Error("Sessão de Pomodoro já existe");
    error.statusCode = 409; //status code 409 (Conflict) because pomodoro session already exists for this user
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
    error.statusCode = 404; //status code 404 (Not Found) because pomodoro session not exists for this user
    throw error;
  }
  //update updatePomodoro with endedAt and duration abandoned
  //calculate endedAt as current time when user abandons pomodoro session
  const endedAt = new Date();
  //calculate duration in minutes: convert milliseconds to minutes by dividing by 1000 (ms to seconds) and 60 (seconds to minutes)
  const duration = Math.floor(
    (endedAt.getTime() - existingPomodoro.startedAt.getTime()) / 1000 / 60
  );
  const updatedPomodoro = await updatePomodoro(existingPomodoro.id, {
    status: "ABANDONED",
    abandonmentReason: abandonmentReason as string,
    endedAt,
    duration,
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
    //use current time as endedAt instead of expiresAt to reflect when pomodoro was actually marked as completed
    const endedAt = now;
    //calculate duration in minutes based on expiresAt - startedAt (20 minutes default pomodoro duration)
    const duration = Math.floor(
      (existingPomodoro.expiresAt.getTime() -
        existingPomodoro.startedAt.getTime()) /
        1000 /
        60
    );
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

//fetch pomodoro session actually active
//if not exists, return error because cant complete a pomodoro session that not exists
//update status = 'COMPLETED', endedAt = now(), duration = 20 minutes (20 minutes is default pomodoro session duration)
//return pomodoro session completed

export const completePomodoroService = async (userId: string) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (!existingPomodoro) {
    const error: any = new Error("Sessão de Pomodoro não existe");
    error.statusCode = 404; //status code 404 (Not Found) because pomodoro session not exists for this user
    throw error;
  }
  const now = new Date();
  //allow completing pomodoro when now >= expiresAt - 10 seconds (users usually want to complete with 20 minutes)
  //this gives a 10 second margin to account for frontend timer precision and network delays
  const tenSecondsInMs = 10 * 1000;
  const expiresAtMinusTenSeconds = new Date(
    existingPomodoro.expiresAt.getTime() - tenSecondsInMs
  );

  if (now < expiresAtMinusTenSeconds) {
    const error: any = new Error("Pomodoro ainda não pode ser completado");
    error.statusCode = 400;
    throw error;
  }

  //use current time as endedAt when user completes pomodoro session
  const endedAt = now;
  //calculate duration in minutes: convert milliseconds to minutes by dividing by 1000 (ms to seconds) and 60 (seconds to minutes)
  const duration = Math.floor(
    (endedAt.getTime() - existingPomodoro.startedAt.getTime()) / 1000 / 60
  );
  const completedPomodoro = await completePomodoro(
    existingPomodoro.id,
    endedAt,
    duration
  );
  return {
    ...completedPomodoro,
    duration,
    isCompleted: true,
  };
};

//fetch active pomodoro session of userID
//if not exists, return error because cant reset a pomodoro session that not exists
//if exists, calculate new expiresAt (now() + 20 minutes) (repo)
//update startedAt to now() (repo)
//maintain status as active (repo)
//maintain endedAt = null, duration = null, abandonmentReason = null (repo)
//return pomodoro session resetted 
export const resetPomodoroService = async (userId: string) => {
  const existingPomodoro = await findActivePomodoroByUserId(userId);
  if (!existingPomodoro) {
    const error: any = new Error("Sessão de Pomodoro não existe");
    error.statusCode = 404; //status code 404 (Not Found) because pomodoro session not exists for this user
    throw error;
  }
  const resettedPomodoro = await resetPomodoro(existingPomodoro.id);
  return resettedPomodoro;
};
