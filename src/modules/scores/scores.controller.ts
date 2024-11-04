import { Controller } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateScoreRequest,
  CreateScoreResponse,
  GetAllScoresRequest,
  GetAllScoresResponse,
  GetLeaderboardRequest,
  GetLeaderboardResponse,
  GetScoreByIdRequest,
  GetScoreByIdResponse,
  RemoveScoreByIdRequest,
  RemoveScoreByIdResponse,
  UpdateScoreRequest,
  UpdateScoreResponse
} from '../common/interfaces/score.interface';

@Controller()
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @GrpcMethod('ScoresService', 'GetAllScores')
  async getAllScores(requestData: GetAllScoresRequest): Promise<GetAllScoresResponse> {
    const { scores, metadata } = await this.scoresService.getAllScores(requestData);
    return { scores, metadata };
  }

  @GrpcMethod('ScoresService', 'GetScoreById')
  async getScoreById(requestData: GetScoreByIdRequest): Promise<GetScoreByIdResponse> {
    const score = await this.scoresService.getScoreById(requestData);
    return { score };
  }

  @GrpcMethod('ScoresService', 'GetLeaderboard')
  async getLeaderboard(requestData: GetLeaderboardRequest): Promise<GetLeaderboardResponse> {
    const { scores, metadata } = await this.scoresService.getLeaderboard(requestData);

    return {
      scores,
      metadata
    };
  }

  @GrpcMethod('ScoresService', 'CreateScore')
  async createScore(requestData: CreateScoreRequest): Promise<CreateScoreResponse> {
    const score = await this.scoresService.createScore(requestData);

    return {
      score
    };
  }

  @GrpcMethod('ScoresService', 'UpdateScore')
  async updateScore(requestData: UpdateScoreRequest): Promise<UpdateScoreResponse> {
    const score = await this.scoresService.updateScore(requestData);
    return { score };
  }

  @GrpcMethod('ScoresService', 'RemoveScore')
  async removeScore(requestData: RemoveScoreByIdRequest): Promise<RemoveScoreByIdResponse> {
    await this.scoresService.removeScore(requestData);
    return {};
  }
}
