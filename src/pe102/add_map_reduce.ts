import MapReduce from "./map_reduce"

/**
 * AddMapReduce is a class that implements a map+1 method, and a reduce(+) method.
 */
export default class AddMapReduce extends MapReduce {
  /**
   * mapFn overloads the MapReduce function to add 1 to each number.
   * @param n Input number.
   * @returns Number + 1
   */
  mapFn(n: number): number {
    return n+1
  }

  /**
   * reduce overloads the MapReduce function to add all the numbers of the list.
   * @param list List to process.
   * @param initialValue Start value.
   * @returns The result of adding all the numbers in the list.
   */
  reduce(list: number[], initialValue: number): number {
    list.forEach(n => initialValue += n)
    return initialValue
  }
}
