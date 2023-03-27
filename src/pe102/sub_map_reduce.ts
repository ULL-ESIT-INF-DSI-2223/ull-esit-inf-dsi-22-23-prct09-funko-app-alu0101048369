import MapReduce from "./map_reduce"

export default class SubMapReduce extends MapReduce {
  mapFn(n: number): number {
    return n-1
  }

  reduce(list: number[], initialValue: number): number {
    list.forEach(n => initialValue -= n)
    return initialValue
  }
}
