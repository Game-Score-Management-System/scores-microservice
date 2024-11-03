import { Controller } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateScoreRequest,
  CreateScoreResponse,
  GetAllScoresRequest,
  GetAllScoresResponse
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
  getScoreById() {}

  @GrpcMethod('ScoresService', 'GetLeaderboard')
  getLeaderboard() {}

  @GrpcMethod('ScoresService', 'CreateScore')
  async createScore(requestData: CreateScoreRequest): Promise<CreateScoreResponse> {
    const score = await this.scoresService.createScore(requestData);

    return {
      score
    };
  }

  @GrpcMethod('ScoresService', 'UpdateScore')
  updateScore() {}

  @GrpcMethod('ScoresService', 'RemoveScoreById')
  removeScoreById() {}
}
