import { Request, Response } from 'express';
import {
    createCardService,
    getCardByIdService,
    getCardsByDeckIdService,
    updateCardService,
    deleteCardService,
    getCardsDueForReviewService,
    getNewCardsService,
    getCardsInLearningService,
    getDeckStatsService,
    getDecksWithStatsService,
} from '../services/cardService';

export const createCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const { deckId, front, back } = req.body;
        const card = await createCardService(userId, deckId, front, back);
        return res.status(201).json(card);
    } catch (error: any) {
        console.error('Erro ao criar card:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getCardById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cardId = req.params.id;
        const card = await getCardByIdService(cardId, userId);
        return res.status(200).json(card);
    } catch (error: any) {
        console.error('Erro ao obter card:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getCardsByDeckId = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const deckId = req.params.deckId;
        const cards = await getCardsByDeckIdService(deckId, userId);
        return res.status(200).json(cards);
    } catch (error: any) {
        console.error('Erro ao obter cards do deck:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const updateCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cardId = req.params.id;
        const cardData = req.body;
        const updatedCard = await updateCardService(cardId, userId, cardData);
        return res.status(200).json(updatedCard);
    } catch (error: any) {
        console.error('Erro ao atualizar card:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cardId = req.params.id;
        const deletedCard = await deleteCardService(cardId, userId);
        return res.status(200).json(deletedCard);
    } catch (error: any) {
        console.error('Erro ao deletar card:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getCardsDueForReview = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cards = await getCardsDueForReviewService(userId);
        return res.status(200).json(cards);
    } catch (error: any) {
        console.error('Erro ao obter cards para revisão:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getNewCards = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cards = await getNewCardsService(userId);
        return res.status(200).json(cards);
    } catch (error: any) {
        console.error('Erro ao obter cards novos:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getCardsInLearning = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const cards = await getCardsInLearningService(userId);
        return res.status(200).json(cards);
    } catch (error: any) {
        console.error('Erro ao obter cards em aprendizado:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getDeckStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const deckId = req.params.deckId;
        const stats = await getDeckStatsService(deckId, userId);
        return res.status(200).json(stats);
    } catch (error: any) {
        console.error('Erro ao obter estatísticas do deck:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};

export const getDecksWithStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const decksWithStats = await getDecksWithStatsService(userId);
        return res.status(200).json(decksWithStats);
    } catch (error: any) {
        console.error('Erro ao obter decks com estatísticas:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return res.status(statusCode).json({ message: message });
    }
};
