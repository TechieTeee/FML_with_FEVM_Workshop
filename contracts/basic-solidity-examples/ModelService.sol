// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ModelService {
    bytes public modelBytecode;

    function deployModel() public returns (address) {
        bytes memory bytecode = modelBytecode;
        address modelAddress;
        assembly {
            modelAddress := create(0, add(bytecode, 0x20), mload(bytecode))
            if iszero(extcodesize(modelAddress)) {
                revert(0, 0)
            }
        }
        return modelAddress;
    }
}
