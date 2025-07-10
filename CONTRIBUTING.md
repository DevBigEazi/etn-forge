# Contributing to etn-dapp-forge 🤝

Thank you for your interest in contributing to etn-dapp-forge! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🎯 How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide environment information (OS, Node.js version, etc.)
- Include error messages and stack traces

### Suggesting Enhancements

- Use the GitHub issue tracker with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity
- Provide use cases and examples

### Code Contributions

- Fork the repository
- Create a feature branch
- Make your changes
- Add tests if applicable
- Submit a pull request

## 🛠 Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- For blockchain development: Hardhat and/or Foundry

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/etn-dapp-forge.git
cd etn-dapp-forge

# Install dependencies
npm install

# Link the package locally for testing
npm link

# Test the CLI locally
create-etn-dapp test-project
```

### Testing Templates

```bash
# Test each template
npm run test:templates

# Test specific template
npm run test:template next-ts-hardhat
```

## 📁 Project Structure

```
etn-dapp-forge/
├── bin/                    # CLI executable
│   └── create-app.js      # Main CLI logic
├── templates/             # Template directories
│   ├── next-ts-hardhat/   # Next.js + TypeScript + Hardhat
│   ├── next-js-hardhat/   # Next.js + JavaScript + Hardhat
│   ├── next-ts-foundry/   # Next.js + TypeScript + Foundry
│   ├── next-js-foundry/   # Next.js + JavaScript + Foundry
│   ├── react-ts-hardhat/  # React + TypeScript + Hardhat
│   ├── react-js-hardhat/  # React + JavaScript + Hardhat
│   ├── react-ts-foundry/  # React + TypeScript + Foundry
│   └── react-js-foundry/  # React + JavaScript + Foundry
├── package.json           # Root package configuration
├── README.md             # Main documentation
└── CONTRIBUTING.md       # This file
```

## 📝 Coding Standards

### JavaScript/TypeScript

- Use **ESLint** for linting
- Follow **Prettier** formatting
- Use **TypeScript** for new features
- Write **JSDoc** comments for functions

### Template Development

- Keep templates **minimal but functional**
- Include **comprehensive examples**
- Use **latest stable versions** of dependencies
- Follow **consistent naming conventions**

### CLI Development

- Use **commander.js** for CLI argument parsing
- Implement **interactive prompts** with arrow keys
- Provide **clear error messages**
- Include **progress indicators**

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Test template generation
npm run test:templates
```

### Test Coverage

- Aim for **80%+ test coverage**
- Test **CLI functionality**
- Test **template generation**
- Test **error handling**

### Template Testing

```bash
# Test template creation
npm run test:create next-ts-hardhat my-test-app

# Verify template structure
npm run test:verify next-ts-hardhat

# Test template functionality
npm run test:functionality next-ts-hardhat
```

## 🔄 Pull Request Process

### Before Submitting

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** if applicable
5. **Update documentation** if needed
6. **Run tests**: `npm test`
7. **Commit your changes**: `git commit -m 'Add amazing feature'`
8. **Push to your fork**: `git push origin feature/amazing-feature`

### Pull Request Guidelines

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Reference issues** if applicable
- **Include screenshots** for UI changes
- **Update documentation** if needed

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** if any
4. **Merge** when approved

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in `package.json`
2. **Update CHANGELOG.md**
3. **Create release branch**
4. **Run full test suite**
5. **Create GitHub release**
6. **Publish to npm**

### Release Commands

```bash
# Update version
npm version patch|minor|major

# Build and test
npm run build
npm test

# Publish to npm
npm publish
```

## 📚 Documentation

### Documentation Standards

- Write **clear and concise** documentation
- Include **code examples**
- Use **proper markdown formatting**
- Keep **README.md** up to date
- Document **breaking changes**

### Documentation Structure

- **README.md**: Main project documentation
- **CONTRIBUTING.md**: This file
- **CHANGELOG.md**: Version history
- **docs/**: Additional documentation
- **templates/*/README.md**: Template-specific docs

## 🐛 Bug Reports

### Bug Report Template

```markdown
**Bug Description**
Brief description of the bug

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Node.js version: [e.g., 18.17.0]
- npm version: [e.g., 9.6.7]
- etn-dapp-forge version: [e.g., 0.0.1]

**Additional Information**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature

**Use Case**
Why this feature is needed

**Proposed Implementation**
How this feature could be implemented

**Alternatives Considered**
Other approaches that were considered

**Additional Information**
Any other relevant information
```

## 🤝 Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discord**: For community discussions
- **Documentation**: For usage questions

### Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **GitHub** contributors page
- **Release notes**

## 📄 License

By contributing to etn-dapp-forge, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to etn-dapp-forge! 🚀** 