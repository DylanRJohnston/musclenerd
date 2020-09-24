import { modifyAt } from "./array"

export type Reducer<A> = (a: A) => A
export type Getter<S, A> = (s: S) => A
export type Setter<S, A> = (a: A) => (s: S) => S
export interface Lens<S, A> {
  get: Getter<S, A>
  set: Setter<S, A>
}

export const modify = <S, A>(lens: Lens<S, A>, f: (a: A) => A) => (s: S): S =>
  lens.set(f(lens.get(s)))(s)

export const fromProp = <A, K extends keyof A>(key: K): Lens<A, A[K]> => ({
  get: outer => outer[key],
  set: inner => outer => ({ ...outer, [key]: inner }),
})

export const fromIndex = <A>(index: number): Lens<A[], A> => ({
  get: as => as[index],
  set: a => modifyAt(index, () => a),
})

export const composeLens =  <A, B, C>(ab: Lens<A, B>, bc: Lens<B, C>): Lens<A, C> => ({
  get: a => bc.get(ab.get(a)),
  set: c => a => ab.set(bc.set(c)(ab.get(a)))(a),
})

export interface Compose {
  <A, B, C>(ab: Lens<A, B>, bc: Lens<B, C>): Lens<A, C>
  <A, B, C, D>(ab: Lens<A, B>, bc: Lens<B, C>, cd: Lens<C, D>): Lens<A, D>
  <A, B, C, D, E>(ab: Lens<A, B>, bc: Lens<B, C>, cd: Lens<C, D>, de: Lens<D, E>): Lens<A, E>
  <A, B, C, D, E, F>(
    ab: Lens<A, B>,
    bc: Lens<B, C>,
    cd: Lens<C, D>,
    de: Lens<D, E>,
    ef: Lens<E, F>,
  ): Lens<A, F>
  <A, B, C, D, E, F, G>(
    ab: Lens<A, B>,
    bc: Lens<B, C>,
    cd: Lens<C, D>,
    de: Lens<D, E>,
    ef: Lens<E, F>,
    fg: Lens<F, G>,
  ): Lens<A, G>
}

export const compose: Compose = (...lens: Lens<unknown, unknown>[]) =>
  lens.reduce(composeLens)
