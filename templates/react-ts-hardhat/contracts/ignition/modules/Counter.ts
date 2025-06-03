// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterModule = buildModule("CounterModule", (m) => {
  const count = m.getParameter("count", 0);

  const counter = m.contract("Counter", [count]);

  return { counter };
});

export default CounterModule;
