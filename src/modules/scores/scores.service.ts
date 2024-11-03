import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { CreateScoreRequest } from '../common/interfaces/score.interface';

@Injectable()
export class ScoresService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async getAllScores(data: PaginationQueryDto) {
    const { page, limit } = data;
    const scores = await this.scoreModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.scoreModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);

    return {
      scores,
      metadata: {
        page,
        limit,
        totalItems: total,
        totalPages: totalPages
      }
    };
  }

  async createScore(data: CreateScoreRequest) {
    const { score, userId, game } = data;
    const newScore = new this.scoreModel({
      score,
      userId,
      game
    });

    const createdScore = await newScore.save();

    console.log(createdScore);

    return createdScore;
  }
}
