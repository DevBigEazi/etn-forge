// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("electroneum-testnet");
        vm.startBroadcast();

        counter = new Counter();

        vm.stopBroadcast();

        vm.createSelectFork("electroneum");
        vm.startBroadcast();

        counter = new Counter();

        vm.stopBroadcast();
    }
}
