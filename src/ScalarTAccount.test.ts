import { ScalarTAccount } from './ScalarTAccount';
import { UInt64, Mina, isReady, shutdown } from 'snarkyjs';

describe('ScalarTAccount is a Group', () => {
  beforeAll(async () => {
    await isReady;
    let Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);
  });
  afterAll(async () => {
    setTimeout(shutdown, 0);
  });

  const mkScalarTAccount = (dbt: number, crd: number) => {
    return new ScalarTAccount({
      debit: UInt64.from(dbt),
      credit: UInt64.from(crd),
    });
  };

  const randInt = Math.floor(Math.random() * 10000);
  const [a, b, c, d, e, f] = Array(6).fill(randInt);

  it('Additive Closure', async () => {
    let x = mkScalarTAccount(a, b),
      y = mkScalarTAccount(c, d);

    expect(ScalarTAccount.add(x, y)).toEqual(mkScalarTAccount(a + c, b + d));
  });

  it('Associative', async () => {
    let x = mkScalarTAccount(a, b),
      y = mkScalarTAccount(c, d),
      z = mkScalarTAccount(e, f);

    expect(ScalarTAccount.add(ScalarTAccount.add(x, y), z)).toEqual(
      ScalarTAccount.add(x, ScalarTAccount.add(y, z))
    );
  });

  it('Abelian', async () => {
    let x = mkScalarTAccount(a, b),
      y = mkScalarTAccount(c, d);

    expect(ScalarTAccount.add(x, y)).toEqual(ScalarTAccount.add(y, x));
  });

  it('Identity', async () => {
    let x = mkScalarTAccount(a, b);

    expect(ScalarTAccount.add(x, ScalarTAccount.iden())).toEqual(x);
  });

  it('Inverse', async () => {
    let x = mkScalarTAccount(a, b);

    expect(
      ScalarTAccount.min(ScalarTAccount.add(x, ScalarTAccount.inv(x)))
    ).toEqual(ScalarTAccount.iden());
  });

  it('Reduced Form', async () => {
    let [dbt, crd] = a < b ? [0, b - a] : [a - b, 0];

    expect(ScalarTAccount.min(mkScalarTAccount(a, b))).toEqual(
      mkScalarTAccount(dbt, crd)
    );
  });
});
