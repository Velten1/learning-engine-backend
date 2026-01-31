import prisma from "../config/prisma"

//find pause by pomodoro id and filter by status active
export const findPauseByPomodoroId = async (pomodoroId: string) => {
    return await prisma.pause.findFirst({
        where: { pomodoroId, status: "ACTIVE" },
        orderBy: { createdAt: 'desc' }, // get the most recent
    })
}

//create pomodoro using enum ACTIVE
export const createPause = async (pomodoroId: string) => {
    return await prisma.pause.create({
        data: {
            pomodoroId, // pauser owner session (pomodoro session)
            startedAt: new Date(), // pause session started now
            endedAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutos
            status: "ACTIVE", // pause session status active
        }
    })
}