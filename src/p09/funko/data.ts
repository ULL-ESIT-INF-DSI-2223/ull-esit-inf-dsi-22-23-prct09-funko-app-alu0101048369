import { FunkoGenre } from "./genre";
import { FunkoType } from "./type";

/**
 * FunkoData represents raw JSON funko data.
 */
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
