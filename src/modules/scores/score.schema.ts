// export interface Score {
//     id: string;
//     userId: string;
//     game: string;
//     score: number;
//     createdAt: string;
//     updatedAt: string;
//   }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'node:crypto';
import { Document } from 'mongoose';

@Schema()
export class Score extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: randomUUID(),
  })
  id: string;

  @Prop({ type: String })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  game: string;

  @Prop({
    type: Number,
    required: true,
  })
  score: number;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: string;

  @Prop({
    type: Date,
  })
  deletedAt: string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
