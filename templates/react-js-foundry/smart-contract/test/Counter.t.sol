// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;
    address public owner;
    address public user;

    function setUp() public {
        owner = address(this);
        user = address(0x1);
        counter = new Counter();
    }

    function test_InitialState() public view {
        assertEq(counter.count(), 0);
        assertEq(counter.owner(), owner);
        assertEq(counter.getCount(), 0);
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.count(), 1);
        
        counter.increment();
        assertEq(counter.count(), 2);
    }

    function test_IncrementEmitsEvent() public {
        vm.expectEmit(true, true, false, true);
        emit Counter.CountChanged(1, owner);
        counter.increment();
    }

    function test_IncrementByAnyUser() public {
        vm.prank(user);
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function test_Decrement() public {
        counter.increment();
        counter.increment();
        assertEq(counter.count(), 2);
        
        counter.decrement();
        assertEq(counter.count(), 1);
    }

    function test_DecrementEmitsEvent() public {
        counter.increment(); // Set to 1 first
        
        vm.expectEmit(true, true, false, true);
        emit Counter.CountChanged(0, owner);
        counter.decrement();
    }

    function test_DecrementRevertsAtZero() public {
        vm.expectRevert("Count cannot go below zero");
        counter.decrement();
    }

    function test_DecrementByAnyUser() public {
        counter.increment(); // Set to 1
        
        vm.prank(user);
        counter.decrement();
        assertEq(counter.count(), 0);
    }

    function test_Reset() public {
        counter.increment();
        counter.increment();
        counter.increment();
        assertEq(counter.count(), 3);
        
        counter.reset();
        assertEq(counter.count(), 0);
    }

    function test_ResetEmitsEvent() public {
        counter.increment(); // Set to 1
        
        vm.expectEmit(true, true, false, true);
        emit Counter.CountChanged(0, owner);
        counter.reset();
    }

    function test_ResetRevertsForNonOwner() public {
        vm.prank(user);
        vm.expectRevert("Only owner can reset");
        counter.reset();
    }

    function test_ResetWhenAlreadyZero() public {
        vm.expectEmit(true, true, false, true);
        emit Counter.CountChanged(0, owner);
        counter.reset();
    }

    function testFuzz_IncrementMultipleTimes(uint8 times) public {
        vm.assume(times > 0);
        
        for (uint8 i = 0; i < times; i++) {
            counter.increment();
        }
        
        assertEq(counter.count(), times);
    }

    function testFuzz_IncrementAndDecrement(uint8 increments, uint8 decrements) public {
        vm.assume(increments >= decrements);
        
        for (uint8 i = 0; i < increments; i++) {
            counter.increment();
        }
        
        for (uint8 i = 0; i < decrements; i++) {
            counter.decrement();
        }
        
        assertEq(counter.count(), increments - decrements);
    }

    function testFuzz_DecrementFailsWhenInsufficientCount(uint8 increments, uint8 decrements) public {
        vm.assume(decrements > increments);
        
        for (uint8 i = 0; i < increments; i++) {
            counter.increment();
        }
        
        // Should succeed for first `increments` decrements
        for (uint8 i = 0; i < increments; i++) {
            counter.decrement();
        }
        
        // Should fail on the next decrement
        vm.expectRevert("Count cannot go below zero");
        counter.decrement();
    }

    function testFuzz_ResetByOwnerAlwaysWorks(uint8 count) public {
        for (uint8 i = 0; i < count; i++) {
            counter.increment();
        }
        
        counter.reset();
        assertEq(counter.count(), 0);
    }

    function testFuzz_ResetByNonOwnerAlwaysFails(address nonOwner, uint8 count) public {
        vm.assume(nonOwner != owner);
        
        for (uint8 i = 0; i < count; i++) {
            counter.increment();
        }
        
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can reset");
        counter.reset();
    }
}