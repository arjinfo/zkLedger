import { Circuit, Struct, UInt64 } from 'snarkyjs';

export class ScalarTAccount extends Struct({
  debit: UInt64,
  credit: UInt64,
}) {
  static add(a: ScalarTAccount, b: ScalarTAccount) {
    return { debit: a.debit.add(b.debit), credit: a.credit.add(b.credit) };
  }

  static min(a: ScalarTAccount) {
    return Circuit.if(
      a.debit.lessThan(a.credit),
      { debit: UInt64.zero, credit: a.credit.sub(a.debit) },
      { debit: a.debit.sub(a.credit), credit: UInt64.zero }
    );
  }

  static inv(a: ScalarTAccount) {
    return { debit: a.credit, credit: a.debit };
  }

  static iden() {
    return { debit: UInt64.zero, credit: UInt64.zero };
  }
}
