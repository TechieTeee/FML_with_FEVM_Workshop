// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface Model {
    function predict(bytes memory input) external returns (bytes memory);
}

contract ModelService {
    Model public deployedModel;

    constructor(address modelAddress) {
        deployedModel = Model(modelAddress);
    }

    function predict(bytes memory input) public returns (bytes memory) {
        return deployedModel.predict(input);
    }
}
