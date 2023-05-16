import { isReady, Mina, shutdown, Field, Bool } from 'snarkyjs';
import { Integer } from 'snarkyjs/dist/node/js_crypto/non-negative';
import { ScalarTAccount } from './ScalarTAccount';

const mkScalarTAccount = (dbt: number, crd: number) => {
  return new ScalarTAccount({
    debit: new Field(dbt),
    credit: new Field(crd),
  });
};

// test invariants with random inputs
// Function to generate a random integer between 0 and max (inclusive)
//const randBigInt = (max) => {
//  const maxBigInt = BigInt(max);
//  return BigInt(Math.floor(Number(maxBigInt * BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) / Number.MAX_SAFE_INTEGER)));
//};
//
//
//// Generate the upper bound
//const maxSum = randBigInt(2 ** 256 - 1);
//
//// Create an array of size 6 and fill it with null
//const arr = new Array(6).fill(null);
//
//// Use `reduce` to generate the six numbers
//const numbers = arr.reduce((acc, _, i) => {
//  // Calculate the remaining budget
//  let remaining = maxSum - BigInt(acc.sum);
//
//  // Generate a random number that is less than or equal to the remaining budget
//  let number = randBigInt(remaining);
//
//  // Add the number to the sum and the array
//  return {
//    sum: acc.sum + Number(number),
//    numbers: [...acc.numbers, number],
//  };
//}, { sum: 0n, numbers: [] }).numbers;
//
//console.log(numbers);
//console.log(numbers.reduce((a, b) => a + b, 0n));
//console.log(maxSum);
//const [a, b, c, d, e, f] = numbers;

//describe('ScalarTAccount is a Group', () => {
//  beforeAll(async () => {
//    await isReady;
//    let Local = Mina.LocalBlockchain();
//    Mina.setActiveInstance(Local);
//  });
//
//  it('Identity', async () => {
//    expect(ScalarTAccount.iden).toEqual(mkScalarTAccount(0, 0));
//  });
//
//  it('Reduced Form', async () => {
//    let [dbt, crd] = a < b ? [0, b - a] : [a - b, 0];
//    mkScalarTAccount(a, b);
//    //    expect(mkScalarTAccount(a, b).min()).toEqual(mkScalarTAccount(dbt, crd));
//  });
//
//  xit('Additive Closure', async () => {
//    let x = mkScalarTAccount(a, b),
//      y = mkScalarTAccount(c, d);
//
//    expect(x.add(y)).toEqual(mkScalarTAccount(a + c, b + d));
//  });
//
//  xit('Associative', async () => {
//    let x = mkScalarTAccount(a, b),
//      y = mkScalarTAccount(c, d),
//      z = mkScalarTAccount(e, f);
//
//    expect(x.add(y.add(z))).toEqual(x.add(y).add(z));
//  });
//
//  afterAll(async () => {
//    setTimeout(shutdown, 0);
//  });
//});

//it('Equality', async () => {
//  //let x = mkScalarTAccount(2, 1),
//  //  y = mkScalarTAccount(2, 7);
//  let x = mkScalarTAccount(a, b),
//    y = mkScalarTAccount(c, d);

//  expect(ScalarTAccount.eq(x, x)).toEqual(new Bool(true));
//  expect(ScalarTAccount.eq(x, y)).toEqual(new Bool(false));
//});

//it('Abelian', async () => {
//  let x = mkScalarTAccount(a, b),
//    y = mkScalarTAccount(c, d);

//  expect(ScalarTAccount.add(x, y)).toEqual(ScalarTAccount.add(y, x));
//});

//it('Reduced Form', async () => {
//  let [dbt, crd] = a < b ? [0, b - a] : [a - b, 0];

//  expect(ScalarTAccount.min(mkScalarTAccount(a, b))).toEqual(
//    mkScalarTAccount(dbt, crd)
//  );
//});
// });

//describe('Accounting Equation by Induction', () => {
//  beforeAll(async () => {
//    await isReady;
//    let Local = Mina.LocalBlockchain();
//    Mina.setActiveInstance(Local);
//  });
//  afterAll(async () => {
//    setTimeout(shutdown, 0);
//  });
//
//  //  xit('Eq holds during base case', async () => {
//  //    let [assets, liabilities, equity] = Array(3).fill(ScalarTAccount.iden);
//  //    expect(assets).toEqual(ScalarTAccount.add(liabilities, equity));
//  //    expect(
//  //      ScalarTAccount.eq(assets, ScalarTAccount.add(liabilities, equity))
//  //    ).toEqual(Bool(true));
//  //    expect(
//  //      ScalarAmericanLedger.isBalanced({
//  //        assets: assets,
//  //        liabilities: liabilities,
//  //        equity: equity,
//  //      })
//  //    ).toEqual(Bool(true));
//  //    expect(
//  //      ScalarAmericanLedger.isBalanced({
//  //          assets: UInt64.zero,
//  //          debit: UInt64.one,
//  //          credit: UInt64.zero,
//  //        }),
//  //      })
//  //    ).toEqual(Bool(false));
//  //  });
//});
