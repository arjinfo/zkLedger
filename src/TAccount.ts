import { Group } from 'fp-ts/Group';
import { Monoid, struct } from 'fp-ts/Monoid';
import { Bool } from 'snarkyjs';

import { SnarkyMonoid, getSnarkyMonoid } from './lib/Monoid';
//import { SnarkyEq } from './lib/Eq';

export interface CartesianProduct<M> {
  readonly x: M;
  readonly y: M;
}

export const getCartesianMonoid = <A extends SnarkyMonoid>(
  M: Monoid<A>
): Monoid<CartesianProduct<A>> =>
  struct<CartesianProduct<A>>({
    x: getSnarkyMonoid(M),
    y: getSnarkyMonoid(M),
  });

export const getCartesianGroup = <A extends SnarkyMonoid>(
  M: Monoid<A>
): Group<CartesianProduct<A>> => ({
  ...getCartesianMonoid(M),
  inverse: (cartProd) => ({ x: cartProd.y, y: cartProd.x }),
});

export interface PacioliGroup<A> extends Group<A> {
  // if (d, c) = (d', c') then there exists an m such that d + c' + m = d' + c + m
  readonly isFactor: (
    factor: A,
    cartProdA: CartesianProduct<A>,
    cartProdB: CartesianProduct<A>
  ) => Bool;
  readonly min: (
    factor: A,
    cartProd: CartesianProduct<A>
  ) => CartesianProduct<A>;
}

//export const getPacioliGroup = <A extends SnarkyMonoid>(
//  M: Monoid<A>,
//  G: Group<CartesianProduct<A>>
//): PacioliGroup<CartesianProduct<A>> => ({
//  ...G,
//  isFactor: (
// //   factor: CartesianProduct<A>,
// //   cartProdA: CartesianProduct<CartesianProduct<A>>,
// //   cartProdB: CartesianProduct<CartesianProduct<A>>
//       factor: A,
//       cartProdA: CartesianProduct<A>,
//       cartProdB: CartesianProduct<A>
//  ) => {
//     //const lhs = M.concat(cartProdA.x, cartProdB.y);
//    //const rhs = M.concat(cartProdB.x, cartProdA.y);
//    return Bool(true);
//  },
//  min: (factor: A, cartProd: CartesianProduct<A>) => cartProd, // Placeholder implementation.
//});
