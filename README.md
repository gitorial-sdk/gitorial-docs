# Gitorial Documentation

![Version](https://img.shields.io/badge/version-0.2.2-yellow)
![VS Code](https://img.shields.io/badge/VS%20Code-1.87.0+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

The official documentation site for **Gitorial**, a VS Code extension that enables interactive, step-by-step coding tutorials directly in your editor. Learn coding concepts, frameworks, and best practices through guided, hands-on experiences.

## 🚀 Quick Start

### Installation

1. **Install from VS Code Marketplace**
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
   - Search for **"Gitorial"**
   - Click **Install**

2. **Manual Installation**
   - Download the latest `.vsix` file from [GitHub Releases](https://github.com/gitorial-sdk/gitorial-vscode.git/releases)
   - Run `Extensions: Install from VSIX...` in VS Code command palette

### Your First Tutorial

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Run **`Gitorial: Clone New Tutorial`**
3. Enter a tutorial repository URL
4. The extension will clone and open the tutorial automatically

## 📚 Documentation Sections

### [Getting Started](/docs/getting-started/)
Learn the basics of using Gitorial, from installation to your first tutorial experience.

### [Features](/docs/features/)
Explore all the powerful features that make Gitorial an exceptional learning platform.

### [Development](/docs/development/)
Contribute to the Gitorial ecosystem and help build the future of interactive learning.

## 🏗️ Technical Architecture

Gitorial follows a **Clean Architecture** pattern with three distinct layers:

- **UI Layer**: VS Code integration and user interface management
- **Domain Layer**: Core business logic and tutorial processing
- **Infrastructure Layer**: External dependencies and data persistence

## 🛠️ Development

### Prerequisites
- Node.js v20+
- pnpm v10+
- VS Code v1.87+
- Git

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/gitorial-sdk/gitorial-vscode.git
cd gitorial-vscode

# Install dependencies
pnpm install

# Start development mode
pnpm run dev

# Run tests
pnpm run test

# Build for production
pnpm run build
```

For detailed development information, see the [Development Guide](/docs/development/).

## 🌍 Community & Support

- **GitHub**: [gitorial-sdk/gitorial-vscode](https://github.com/gitorial-sdk/gitorial-vscode.git)
- **Issues**: [Bug reports and feature requests](https://github.com/gitorial-sdk/gitorial-vscode.git/issues)
- **Discussions**: [Community discussions](https://github.com/gitorial-sdk/gitorial-vscode.git/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/gitorial-sdk/gitorial-vscode.git/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

This project is proudly **funded by Polkadot OpenGov**. We're grateful for the community's support in making interactive learning more accessible for developers in the Polkadot ecosystem and beyond.

---

**Made with ❤️ by [Andrzej Sulkowski](https://github.com/andrzejSulkowski)**
