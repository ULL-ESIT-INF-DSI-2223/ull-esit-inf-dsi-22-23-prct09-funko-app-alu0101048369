import { randomUUID } from "node:crypto";
import { FunkoGenre } from "./genre";
import { FunkoData } from "./json_data";
import { FunkoType } from "./type";

export default class Funko {
  public id: string
  public marketValue: number
  
  constructor(
    id: string,
    public name: string,
    public description: string,
    public type: FunkoType,
    public genre: FunkoGenre,
    public franchise: string,
    public franchiseNumber: number,
    public exclusive: boolean,
    public specialFeatures: string,
    marketValue: number,
  ) {
    if (id === "") {
      id = randomUUID();
    }
    this.id = id;

    if (!isFinite(marketValue) || marketValue < 0) {
      throw new Error("market value must be zero or a positive finite number");
    }
    this.marketValue = marketValue;
  }

  static parse(id: string, data: FunkoData): Funko {
    return new Funko(
      id,
      data.name,
      data.description,
      data.type,
      data.genre,
      data.franchise,
      data.franchiseNumber,
      data.exclusive,
      data.specialFeatures,
      data.marketValue,
    )
  }

  toJSON(): FunkoData {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      genre: this.genre,
      franchise: this.franchise,
      franchiseNumber: this.franchiseNumber,
      exclusive: this.exclusive,
      specialFeatures: this.specialFeatures,
      marketValue: this.marketValue,
    }
  }
}
