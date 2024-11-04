import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema, Score } from './score.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
  controllers: [ScoresController],
  providers: [ScoresService]
})
export class ScoresModule {}
