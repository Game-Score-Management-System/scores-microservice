import { Metadata } from './metadaba.interface';
import { User } from './user.interface';

export interface Score {
  id: string;
  userId: string;
  game: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GetAllScoresRequest {
  limit: number;
  page: number;
  game?: string;
  userId?: string;
  showDeleted?: string;
}

export interface GetAllScoresResponse {
  scores: Score[];
  metadata?: Metadata;
}

export interface GetLeaderboardRequest {
  limit: number;
  page: number;
  game: string;
}

export interface GetLeaderboardResponse {
  scores: Score[];
  metadata?: Metadata;
}

export interface GetScoreByIdRequest {
  id: string;
}

export interface GetScoreByIdResponse {
  score: Score;
}

export interface CreateScoreRequest {
  userId: string;
  game: string;
  score: number;
}

export interface CreateScoreResponse {
  score: Score;
}

export interface UpdateScoreRequest {
  userId: string;
  game: string;
  score: number;
}

export interface UpdateScoreResponse {
  score: Score;
}

export interface RemoveScoreByIdRequest {
  id: string;
}

export interface RemoveScoreByIdResponse {}
