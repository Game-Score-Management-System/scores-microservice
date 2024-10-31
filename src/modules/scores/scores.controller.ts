import { Controller } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @GrpcMethod('ScoresService', 'GetAllScores')
  getAllScores() {
    return {
      scores: [
        {
          id: 1,
          score: 100,
        },
        {
          id: 2,
          score: 200,
        },
      ],
    };
  }
  @GrpcMethod('ScoresService', 'GetScoreById')
  getScoreById() {}

  @GrpcMethod('ScoresService', 'GetLeaderboard')
  getLeaderboard() {}

  @GrpcMethod('ScoresService', 'CreateScore')
  createScore() {}

  @GrpcMethod('ScoresService', 'UpdateScore')
  updateScore() {}

  @GrpcMethod('ScoresService', 'RemoveScoreById')
  removeScoreById() {}
}
