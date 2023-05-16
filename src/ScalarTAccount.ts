import {
  Circuit,
  Struct,
  UInt64,
  Field,
  Experimental,
  SelfProof,
  CircuitString,
} from 'snarkyjs';

/**
 * A Pair of 64 bit Fields various methods forming a Scalar TAccount
 *
 */
export class ScalarTAccount extends Struct({
  debit: Field,
  credit: Field,
}) {
  assertEquals(acc: ScalarTAccount) {
    this.credit.assertEquals(acc.credit);
    this.debit.assertEquals(acc.debit);
  }

  static get zero() {
    return { debit: new Field(0), credit: new Field(0) };
  }

  static get iden() {
    return ScalarTAccount.zero;
  }

  //  private static clampUInt64(a: Field) {
  //    let max = (1n << 32n) - 1n;
  //    return Circuit.if(
  //      a.greaterThan(Field(max)),
  //      UInt64.from(max),
  //      new UInt64(a)
  //    );
  //  }

  min() {
    return Circuit.if(
      this.debit.lessThan(this.credit),
      new ScalarTAccount({
        debit: new Field(0),
        credit: new Field(0), //this.credit.sub(this.debit),
      }),
      new ScalarTAccount({
        debit: new Field(0), //this.debit.sub(this.credit),
        credit: new Field(0),
      })
    );
  }

  add(acc: ScalarTAccount) {
    return new ScalarTAccount({
      debit: this.debit.add(acc.debit),
      credit: this.credit.add(acc.credit),
    });
  }

  inv() {
    return new ScalarTAccount({
      debit: this.credit,
      credit: this.debit,
    });
  }
}

//  static get iden() {
//    return ScalarTAccount.zero;
//  }
//
////  assertEquals(
////    acc:
////  )
//  static eq(a: ScalarTAccount, b: Scal{
//    return a.debit.equals(b.debit).and(a.credit.equals(b.credit));
//  }
//}
//
//export class NamedScalarTAccount extends Struct({
//  tacc: ScalarTAccount,
//  name: CircuitString,
//}) {}
//
//export class ScalarAmericanLedger extends Struct({
//  assets: NamedScalarTAccount,
//  liabilities: NamedScalarTAccount,
//  equity: NamedScalarTAccount,
//}) {
//  static isBalanced(l: ScalarAmericanLedger) {
//    return ScalarTAccount.eq(
//      ScalarTAccount.min(l.assets.tacc),
//      ScalarTAccount.min(ScalarTAccount.add(l.equity.tacc, l.liabilities.tacc))
//    );
//  }
//  //  static addTransaction();
//}
//
//export class ScalarTransaction extends Struct({
//  acc: NamedScalarTAccount,
//  transaction: ScalarTAccount,
//}) {
//  static add(
//    acc: NamedScalarTAccount,
//    transaction: ScalarTAccount
//  ): NamedScalarTAccount {
//    return {
//      tacc: ScalarTAccount.add(transaction, acc.tacc),
//      name: acc.name,
//    };
//  }
//}
//// returns the value of the equity account
//const runScalarAmericanLedger = Experimental.ZkProgram({
//  publicInput: ScalarAmericanLedger,
//  methods: {
//    init: {
//      privateInputs: [],
//      method(ledger: ScalarAmericanLedger) {
//        Circuit.assertEqual(ledger, {
//          assets: {
//            tacc: ScalarTAccount.iden(),
//            name: CircuitString.fromString('assets'),
//          },
//          liabilities: {
//            tacc: ScalarTAccount.iden(),
//            name: CircuitString.fromString('liabilities'),
//          },
//          equity: {
//            tacc: ScalarTAccount.iden(),
//            name: CircuitString.fromString('equity'),
//          },
//        });
//      },
//    },
// addTransaction: {
//   privateInputs: [SelfProof],
//   method(
//     transactionToAdd: ScalarAmericanLedger,
//     ledger: SelfProof<ScalarAmericanLedger>,
//     newLedger: ScalarAmericanLedger
//   ) {
//     ledger.verify();
//     ledger.publicInput.add(transactionToAdd).assertEqual(newLedger);
//   },
// },
//  },
//});
