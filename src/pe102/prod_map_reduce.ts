import MapReduce from "./map_reduce"

export default class ProdMapReduce extends MapReduce {
  mapFn(n: number): number {
    return n*2
  }

  reduce(list: number[], initialValue: number): number {
    list.forEach(n => initialValue *= n)
    return initialValue
  }
}
