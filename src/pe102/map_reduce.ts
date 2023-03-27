/**
 * MapReduce abstract class represents an object that can map and reduce numbers according to overloadable functions.
 */
export default abstract class MapReduce {
  /**
   * reduce implements a method similar to Array.prototype.reduce()
   * @param list List to reduce.
   * @param initialValue Initial value to apply reduction to.
   */
  abstract reduce(list: number[], initialValue: number): number

  /**
   * mapFn method is the function that will be called for each element in map()
   * @param n Input number.
   * @returns Output number.
   */
  mapFn(n: number): number {
    return n
  }

  /**
   * map does something similar to Array.prototype.map() using mapFn() for each element, and hooks for the entire list.
   * @param list List to map.
   * @returns Mapped list.
   */
  map(list: number[]): number[] {
    const result = new Array<number>()
    list = this.mapPreProcessListHook(list)
    list.forEach((n) => result.push(this.mapFn(n)))
    return this.mapPostProcessListHook(result)
  }

  /**
   * mapPreProcessListHook process the input list before doing the map operation.
   * @param list List to process.
   * @returns Processed list.
   */
  mapPreProcessListHook(list: number[]): number[] {
    return list
  }

  /**
   * mapPostProcessListHook process the output list after doing the map operation.
   * @param list List to process.
   * @returns Processed list.
   */
  mapPostProcessListHook(list: number[]): number[] {
    return list
  }
}
