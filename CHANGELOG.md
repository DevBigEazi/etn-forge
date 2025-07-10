# Changelog

All notable changes to etn-dappforge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
- CLI scaffolding tool
- Multiple template support
- Interactive command-line interface

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.0.1] - 2024-01-XX

### Added
- **Initial Release** 🎉
- Interactive CLI with arrow key navigation
- 8 different template combinations:
  - Next.js + TypeScript + Hardhat
  - Next.js + JavaScript + Hardhat
  - Next.js + TypeScript + Foundry
  - Next.js + JavaScript + Foundry
  - React + TypeScript + Hardhat
  - React + JavaScript + Hardhat
  - React + TypeScript + Foundry
  - React + JavaScript + Foundry
- Monorepo structure with workspaces
- Pre-configured Electroneum network settings
- Sample Counter smart contract
- Complete DApp with wallet integration
- Modern UI with Tailwind CSS and dark mode
- TypeScript support with type generation
- Comprehensive error handling
- Transaction status indicators
- Responsive design for mobile and desktop
- Git initialization and initial commit
- Automatic dependency installation
- Environment variable configuration
- ESLint and TypeScript configuration
- Hardhat and Foundry configurations
- Deployment scripts for both networks
- Test suites for smart contracts
- Documentation and README files

### Technical Features
- **Frontend Stack**:
  - Next.js 15 / React 19
  - TypeScript 5
  - Tailwind CSS 4
  - Wagmi 2.15
  - Viem 2.31
  - TanStack Query 5.81
- **Smart Contract Stack**:
  - Solidity 0.8.26
  - Hardhat 2.24 / Foundry latest
  - TypeChain for type generation
  - Comprehensive testing framework
- **Development Tools**:
  - ESLint configuration
  - Prettier formatting
  - Git hooks
  - Hot reloading
  - Environment management

### Network Configuration
- **Electroneum Mainnet**:
  - Chain ID: 52014
  - RPC: `https://rpc.ankr.com/electroneum/${ANKR_API_KEY}`
  - Explorer: `https://blockexplorer.electroneum.com`
- **Electroneum Testnet**:
  - Chain ID: 52014
  - RPC: `https://rpc.ankr.com/electroneum_testnet/${ANKR_API_KEY}`
  - Explorer: `https://testnet-blockexplorer.electroneum.com`

### Sample DApp Features
- **Counter Contract**:
  - `getCount()`: Read current value
  - `increment()`: Increase by 1
  - `decrement()`: Decrease by 1
  - `reset()`: Reset to 0
- **Frontend Features**:
  - Wallet connection (MetaMask, etc.)
  - Real-time contract interaction
  - Transaction status tracking
  - Error handling and retry logic
  - Responsive UI components
  - Dark/light theme support

### CLI Features
- **Interactive Selection**:
  - Language choice (TypeScript/JavaScript)
  - Framework choice (Next.js/React)
  - Development environment (Hardhat/Foundry)
- **Automated Setup**:
  - Template file copying
  - Git repository initialization
  - Dependency installation
  - Project structure creation
- **User Experience**:
  - Beautiful ASCII art banner
  - Progress indicators
  - Clear success messages
  - Helpful next steps

### Documentation
- **Comprehensive README**:
  - Quick start guide
  - Feature overview
  - Template descriptions
  - Development commands
  - Deployment instructions
  - Troubleshooting guide
- **Contributing Guidelines**:
  - Development setup
  - Coding standards
  - Testing procedures
  - Pull request process
- **Template Documentation**:
  - Individual README files
  - Configuration guides
  - Usage examples

---

## Version History

### Version Naming Convention
- **MAJOR.MINOR.PATCH**
  - MAJOR: Breaking changes
  - MINOR: New features (backward compatible)
  - PATCH: Bug fixes (backward compatible)

### Release Schedule
- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly for new features
- **Major releases**: Quarterly for breaking changes

### Support Policy
- **Current version**: Full support
- **Previous major version**: Security fixes only
- **Older versions**: No support

---

## Migration Guides

### Upgrading Between Major Versions
When upgrading between major versions, check the migration guide for breaking changes and required updates.

### Template Updates
Template updates are backward compatible within the same major version. New features may be added but existing functionality will not be removed.

---

## Acknowledgments

### Contributors
- **DevBigEazi**: Project creator and maintainer
- **Electroneum Community**: Feedback and testing
- **Open Source Contributors**: Bug reports and feature suggestions

### Dependencies
- **Next.js Team**: React framework
- **Vercel Team**: Deployment platform
- **Hardhat Team**: Ethereum development framework
- **Foundry Team**: Rust-based toolkit
- **Wagmi Team**: React hooks for Ethereum
- **Tailwind CSS Team**: Utility-first CSS framework

---

**For detailed information about each release, visit our [GitHub releases page](https://github.com/your-username/etn-dappforge/releases).** 