/**
 * @file index.js
 * @author hzz780
 */
const AElf = require('aelf-sdk');
const Wallet = AElf.wallet;
const sha256 = AElf.utils.sha256;

// address: G1ixCNMTpk2ukQDsw93JTGt2son4YKB9gRaYRGZosNQsRdCxC
const defaultPrivateKey = '60af52541d2474ee2735cc2dfbca21e2ac71a576b73f3d97c4940442c4e22ffe';

const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);
const aelf = new AElf(new AElf.providers.HttpProvider('https://tdvw-test-node.aelf.io'));

if(!aelf.isConnected()) {
    console.error('Blockchain Node is not running.');
    process.exit(1);
}

/** use async mode with promise, all chain methods and contract methods are default to be async **/
const helloWorldContractName = 'AElf.Contracts.CryptoBankAfrica';
let helloWorldContract = null;
aelf.chain.getChainStatus().then(({ GenesisContractAddress }) => {
    return aelf.chain.contractAt(GenesisContractAddress, wallet);
}).then(zeroC => {
    return zeroC.GetContractAddressByName.call(sha256(helloWorldContractName));
}).then(helloWorldContractAddress => {
    return aelf.chain.contractAt(helloWorldContractAddress, wallet);
}).then(helloWorldC => {
    helloWorldContract = helloWorldC;
    return helloWorldC.Hello.call();
}).then(result => {
    console.log('hello world contract call: ', result);
    return helloWorldContract.Hello();
}).then(result => {
    return aelf.chain.getTxResult(result.TransactionId);
}).then(result => {
    console.log('async getTxResult', result);
}).catch(err => {
    console.log(err);
});

/** use sync mode, all chain methods and contract methods are set to be sync **/
const {
    GenesisContractAddress
} = aelf.chain.getChainStatus({sync: true});
const zeroC = aelf.chain.contractAt(GenesisContractAddress, wallet, {sync: true});
const helloWorldContractAddress = zeroC.GetContractAddressByName.call(sha256(helloWorldContractName), {
    sync: true
});

const helloWorldC = aelf.chain.contractAt(helloWorldContractAddress, wallet, {
    sync: true
});

// 1.Good Way; async
// use `call` to get information is always a good way.
let result = helloWorldC.Hello.call({
    sync: true
});
// { Value: 'Hello world!' };

// 2.Bay Way; sync
result = helloWorldC.Hello({sync: true});
console.log('call: ', result);
// return demo:
// {
//     TransactionId: 'd40654c3f95a8a1b163f6d8b9112b0b72273ba74d02d2233b0c869db3847e35a'
// }
aelf.chain.getTxResult(result.TransactionId, (err, result) => {
    console.log(err, result);
});
