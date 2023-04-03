import { randomUUID } from "node:crypto";
import { FunkoGenre } from "./genre";
import { FunkoData } from "./data";
import { FunkoType } from "./type";

/**
 * Funko class represents a funko.
 */
export default class Funko {
  public id: string
  public marketValue: number
  
  /**
   * Creates a new Funko object with the data provided.
   * @param id ID of the funko.
   * @param name Name of the funko.
   * @param description Description of the funko.
   * @param type Type of the funko.
   * @param genre Genre of the funko.
   * @param franchise Franchise of the funko.
   * @param franchiseNumber Number of the funko in the franchise.
   * @param exclusive Whether the funko is exclusive or not.
   * @param specialFeatures Optional special features of the funko.
   * @param marketValue Market value of the funko.
   */
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

  /**
   * parse parses a new Funko from the FunkoData provided.
   * @param id Funko's ID.
   * @param data Raw JSON data.
   * @returns A new Funko created from the raw JSON data provided.
   */
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

  /**
   * toJSON creates JSON data from this funko.
   * @returns This Funko JSON's data.
   */
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
