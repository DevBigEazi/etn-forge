// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    int256 public count;
    address public owner;
    
    event CountChanged(int256 newCount, address changedBy);
    
    constructor() {
        owner = msg.sender;
        count = 0;
    }
    
    function increment() public {
        count++;
        emit CountChanged(count, msg.sender);
    }
    
    function decrement() public {
        count--;
        emit CountChanged(count, msg.sender);
    }
    
    function reset() public {
        count = 0;
        emit CountChanged(count, msg.sender);
    }
    
    function getCount() public view returns (int256) {
        return count;
    }
}