import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import {
  CreateScoreRequest,
  GetAllScoresRequest,
  GetLeaderboardRequest,
  GetScoreByIdRequest,
  RemoveScoreByIdRequest,
  UpdateScoreRequest
} from '../common/interfaces/score.interface';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class ScoresService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async getAllScores(data: GetAllScoresRequest) {
    const { page, limit, filter } = data;
    const { orderBy = 'score', order = 'desc', ...filters } = filter;

    if (filters.showDeleted) {
      delete filters.showDeleted;
    } else {
      filters.deletedAt = null;
    }

    const scores = await this.scoreModel
      .find(filters)
      .sort({ [orderBy]: order === 'asc' ? 1 : -1 })
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

  async getLeaderboard(data: GetLeaderboardRequest) {
    const { page, limit, game } = data;
    const scores = await this.scoreModel
      .aggregate([
        { $match: { game } }, // Filtra los documentos para que coincidan con el juego especificado.
        { $sort: { score: -1 } }, // Ordena los documentos por la puntuación en orden descendente.
        {
          $group: {
            // Agrupa los documentos por `userId`, tomando la primera puntuación y el primer documento completo.
            _id: '$userId', // _id es el campo por el cual se agrupan los documentos.
            score: { $first: '$score' }, // $first toma el primer valor no nulo en el grupo.
            doc: { $first: '$$ROOT' } // $$ROOT es una variable que contiene el documento actual.
          }
        },
        {
          $replaceRoot: { newRoot: '$doc' } // Reemplaza el documento raíz con el documento completo agrupado.
        },
        { $sort: { score: -1 } }, // Vuelve a ordenar los documentos por la puntuación en orden descendente.
        { $skip: (page - 1) * limit }, // Salta los documentos según la página y el límite especificados.
        { $limit: limit } // Limita el número de documentos devueltos al límite especificado.
      ])
      .exec();

    const total = await this.scoreModel
      .aggregate([{ $match: { game } }, { $group: { _id: '$userId' } }])
      .exec();

    const totalPages = Math.ceil(total.length / limit);

    return {
      scores,
      metadata: {
        page,
        limit,
        totalItems: total.length,
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

  async getScoreById(data: GetScoreByIdRequest) {
    const { id } = data;
    const score = await this.scoreModel.findById(id).exec();

    return score;
  }

  async updateScore(data: UpdateScoreRequest) {
    const { scoreId, score, game } = data;
    const result = await this.scoreModel.findOneAndUpdate({ id: scoreId }, { score, game }).exec();
    if (!result) {
      throw new RpcException({ code: status.NOT_FOUND, message: 'Score not found' });
    }
    return result;
  }

  async removeScore(data: RemoveScoreByIdRequest) {
    const { id } = data;
    const result = await this.scoreModel.findOneAndUpdate({ id }, { deletedAt: new Date() }).exec();
    if (!result) {
      throw new RpcException({ code: status.NOT_FOUND, message: 'Score not found' });
    }
  }
}
