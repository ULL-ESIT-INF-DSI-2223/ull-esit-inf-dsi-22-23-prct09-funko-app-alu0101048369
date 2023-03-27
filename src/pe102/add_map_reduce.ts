import MapReduce from "./map_reduce"

export default class AddMapReduce extends MapReduce {
  mapFn(n: number): number {
    return n+1
  }

  reduce(list: number[], initialValue: number): number {
    list.forEach(n => initialValue += n)
    return initialValue
  }
}
