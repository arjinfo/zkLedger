import { Transaction } from './Transaction';
import {
  isReady,
  shutdown,
  Mina,
  PrivateKey,
  PublicKey,
  Account,
  AccountUpdate,
  UInt64,
} from 'snarkyjs';

let proofsEnabled = true;

describe('Transactions', () => {
  let deployerAccount: PublicKey, deployerKey: PrivateKey;
  //senderAccount: PublicKey,
  //senderKey: PrivateKey,
  //zkAppAddress: PublicKey,
  //zkAppPrivateKey: PrivateKey

  beforeAll(async () => {
    await isReady;
  });

  beforeEach(() => {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      Local.testAccounts[0]);
    //    ({ privateKey: senderKey, publicKey: senderAccount } =
    //      Local.testAccounts[1]);
    //zkAppPrivateKey = PrivateKey.random();
    //zkAppAddress = zkAppPrivateKey.toPublicKey();
  });

  afterAll(() => {
    // `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
    // Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
    // This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
    setTimeout(shutdown, 0);
  });

  //  async function localDeploy() {
  //    const txn = await Mina.transaction(deployerAccount, () => {
  //      AccountUpdate.fundNewAccount(deployerAccount);
  //    });
  //    await txn.prove();
  //    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  //    // await txn.sign([deployerKey, zkAppPrivateKey]).send();
  //    console.log(`deployer account initialized with ${Account(deployerAccount).balance} mina`)
  //  }

  it('should start', async () => {
    //    await localDeploy();
    // [x / y] + [y / x] == identity()
    //expect(Account(deployerAccount).balance.assertEquals(new UInt64(0)))
    let initial = new Transaction({
      debit: new UInt64(100),
      credit: new UInt64(40),
    });
    let update = new Transaction({
      debit: new UInt64(10),
      credit: new UInt64(30),
    });
    console.log(Transaction.add(initial, update));
  });
  it.todo('should be correct');
});
