using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.CryptoBankAfrica
{
    public class CryptoBankContractTestBase : DAppContractTestBase<CryptoBankContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal CryptoBankContractContainer.CryptoBankContractStub GetCryptoBankContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<CryptoBankContractContainer.CryptoBankContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}