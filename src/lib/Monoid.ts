import { Monoid } from 'fp-ts/Monoid';

import { Field, UInt32, UInt64, MerkleWitness } from 'snarkyjs';
import { BaseMerkleWitness } from 'snarkyjs/dist/node/lib/merkle_tree';

export type SnarkyMonoid = Field | UInt32 | UInt64 | BaseMerkleWitness;

export const FieldMonoid: Monoid<Field> = {
  empty: new Field(0),
  concat: (a, b) => a.add(b),
};

export const UInt32Monoid: Monoid<UInt32> = {
  empty: UInt32.zero,
  concat: (a, b) => a.add(b),
};

export const UInt64Monoid: Monoid<UInt64> = {
  empty: UInt64.zero,
  concat: (a, b) => a.add(b),
};

export const getSnarkyMonoid = <A extends SnarkyMonoid>(
  M: Monoid<A>
): Monoid<A> => ({
  concat: (x, y) => M.concat(x, y),
  empty: M.empty,
});

//function getMerkleWitnessMonoid(height: number): Monoid<BaseMerkleWitness> {
//  const MerkleWitnessH = MerkleWitness(height);
//
//  // Fill in with code to create an identity witness of the given height.
//  const emptyWitness: Witness = // ...
//
//  return {
//    empty: new MerkleWitnessH(emptyWitness),
//    concat: (x, y) => {
//      // Fill in with code to combine two BaseMerkleWitness objects.
//    },
//  };
//}

//const M = struct<TAccount>({
//  x: N.MonoidSum,
//  y: N.MonoidSum,
//});
//

//
//
//export function getMonoid<A extends Monoid<SnarkyNumbers>>(M: Monoid<A>): Monoid<TAccount<A>> {
//  return {
//    concat: (x, y) => () => M.concat(x, y),
//    empty: () => M.empty
//  }
//}

//const MonoidFieldTAccount = struct<TAccount<Field>>({
//  debit: FieldSum,
//  credit: FieldSum,
//});

//const GroupFieldTAccount: Group<TAccount<Field>> = {
//  ...MonoidFieldTAccount,
//  inverse: (account: TAccount<Field>) => ({
//    debit: account.credit,
//    credit: account.debit,
//  }),
//};
