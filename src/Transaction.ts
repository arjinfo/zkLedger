import { Circuit, Struct, UInt64 } from 'snarkyjs';

export class Transaction extends Struct({
  debit: UInt64,
  credit: UInt64,
}) {
  static add(a: Transaction, b: Transaction) {
    return { debit: a.debit.add(b.debit), credit: a.credit.add(b.credit) };
  }

  static min(a: Transaction) {
    return Circuit.if(
      a.debit.lessThan(a.credit),
      { debit: new UInt64(0), credit: a.credit.sub(a.debit) },
      { debit: a.debit.sub(a.credit), credit: new UInt64(0) }
    );
  }

  static inv(a: Transaction) {
    return { debit: a.credit, credit: a.debit };
  }

  static iden() {
    return { debit: new UInt64(0), credit: new UInt64(0) };
  }
}
