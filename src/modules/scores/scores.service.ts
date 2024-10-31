import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateScoreDto } from './dto/create-score.dto';
// import { UpdateScoreDto } from './dto/update-score.dto';

export interface IScore {
  id: string;
  userId: string;
  game: string;
  score: number;
  createdAt: string;
  updatedAt: string | null;
}

@Injectable()
export class ScoresService {}
