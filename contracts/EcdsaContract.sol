pragma solidity ^0.4.24;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/cryptography/ECDSA.sol";

contract EcdsaContract is Initializable {

    using ECDSA for bytes32;

    uint256 public tokenId;
    uint256 public value;
    uint256 public expirationTime;
    bytes public signature;
    address public owner;

    bytes32 public messageHash;
    address public verifiedAddress;

    function initialize() initializer public {}

    function setData(
        uint256 _tokenId,
        uint256 _value,
        uint256 _expirationTime,
        bytes _signature, 
        address _owner
    ) public
    {
        tokenId = _tokenId;
        value = _value;
        expirationTime = _expirationTime;
        signature = _signature;
        owner = _owner;
    }

    function verifySignature() public {
        // solium-disable-next-line security/no-sha3
        messageHash = sha3(tokenId, value, expirationTime);
        verifiedAddress = messageHash.toEthSignedMessageHash().recover(signature);
    }

}