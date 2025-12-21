// Repository de Pomodoro

import prisma from "../config/prisma";

//find pomodoro by user id and filter by status active
export const findActivePomodoroByUserId = async (userId: string) => {
  return await prisma.pomodoro.findFirst({
    where: { userId, status: "ACTIVE" },
  });
};

//create pomodoro using enum ACTIVE
export const createPomodoro = async (userId: string) => {
  return await prisma.pomodoro.create({
    data: {
      userId, // pomodoro owner session
      startedAt: new Date(), // pomodoro session started now
      expiresAt: new Date(Date.now() + 20 * 60 * 1000), // pomodoro session will be expired in 20 minutes
      status: "ACTIVE", // pomodoro session status active
    },
  });
};

//update pomodoro session with status abandoned and abandonment reason
export const updatePomodoro = async (
  id: string,
  data: {
    status: "ABANDONED";
    abandonmentReason: string;
    endedAt: Date;
    duration: number;
  }
) => {
  return await prisma.pomodoro.update({
    where: { id },
    data: {
      status: data.status,
      abandonmentReason: data.abandonmentReason,
      endedAt: data.endedAt,
      duration: data.duration,
    },
  });
};

//mark pomodoro session as completed
export const completePomodoro = async (id: string, endedAt: Date, duration: number) => {
    return await prisma.pomodoro.update({
        where: { id },
        data: {
            status: "COMPLETED",
            endedAt,
            duration,
        },
    });
};