// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleCounter {
    uint256 public count;
    address public owner;
    
    event CountChanged(uint256 newCount, address changedBy);
    
    constructor() {
        owner = msg.sender;
        count = 0;
    }
    
    function increment() public {
        count++;
        emit CountChanged(count, msg.sender);
    }
    
    function decrement() public {
        require(count > 0, "Count cannot go below zero");
        count--;
        emit CountChanged(count, msg.sender);
    }
    
    function reset() public {
        require(msg.sender == owner, "Only owner can reset");
        count = 0;
        emit CountChanged(count, msg.sender);
    }
    
    function getCount() public view returns (uint256) {
        return count;
    }
}