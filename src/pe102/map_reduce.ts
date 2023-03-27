export default abstract class MapReduce {
  abstract reduce(list: number[], initialValue: number): number

  mapFn(n: number): number {
    return n
  }

  map(list: number[]): number[] {
    const result = new Array<number>()
    list = this.mapPreProcessListHook(list)
    list.forEach((n) => result.push(this.mapFn(n)))
    return this.mapPostProcessListHook(result)
  }

  mapPreProcessListHook(list: number[]): number[] {
    return list
  }

  mapPostProcessListHook(list: number[]): number[] {
    return list
  }
}
