using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CryptoBankAfrica
{
    /// <summary>
    /// The C# implementation of the contract defined in crypto_bank_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class CryptoBankContract : CryptoBankContractContainer.CryptoBankContractBase
    {
        /// <summary>
        /// The implementation of the Hello method. It takes no parameters and returns on of the custom data types
        /// defined in the protobuf definition file.
        /// </summary>
        /// <param name="input">Empty message (from Protobuf)</param>
        /// <returns>a HelloReturn</returns>
        public override HelloReturn Hello(Empty input)
        {
            return new HelloReturn {Value = "Hello World!"};
        }
    }
}