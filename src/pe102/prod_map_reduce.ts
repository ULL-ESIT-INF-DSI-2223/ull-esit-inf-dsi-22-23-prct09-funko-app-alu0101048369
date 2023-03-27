import MapReduce from "./map_reduce"

/**
 * ProdMapReduce is a class that implements a map*2 method, and a reduce(*) method.
 */
export default class ProdMapReduce extends MapReduce {
  /**
   * mapFn overloads the MapReduce function to times 2 to each number.
   * @param n Input number.
   * @returns Number * 2
   */
  mapFn(n: number): number {
    return n*2
  }

  /**
   * reduce overloads the MapReduce function to multiply all the numbers of the list.
   * @param list List to process.
   * @param initialValue Start value.
   * @returns The result of multiplying all the numbers in the list.
   */
  reduce(list: number[], initialValue: number): number {
    list.forEach(n => initialValue *= n)
    return initialValue
  }
}
