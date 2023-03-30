import { FunkoGenre } from "./genre";
import { FunkoType } from "./type";

export interface FunkoData {
  name: string,
  description: string,
  type: FunkoType,
  genre: FunkoGenre,
  franchise: string,
  franchiseNumber: number,
  exclusive: boolean,
  specialFeatures: string,
  marketValue: number,
}
