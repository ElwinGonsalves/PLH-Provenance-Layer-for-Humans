# PLH (Provenance Layer for Humans)

A single-file React application demonstrating cryptographic content verification through an interactive cyber-security interface. PLH visualizes how hardware-based entropy collection, zero-knowledge proofs, and tamper detection can distinguish human-generated content from AI without using biometrics.

## Features

### 🔐 The Hardware Moat
- **Interactive Entropy Collection**: Move your mouse over the canvas to generate hardware entropy with glowing particle trails
- **Hardware Attestation**: Simulated sensor readouts (Gyroscope, Touch Pressure, Secure Enclave)
- **Content Signing**: Sign text, images, or videos with cryptographic Reality Stamps
- **Invisible Security Mode**: Automatic signing when entropy reaches 100%

### ✅ The Reality Stamp
- **Trust Badges**: Visual indicators showing verified human-generated content
- **Digital Certificates**: Expandable certificates with content hash, timestamp, and zk-SNARK proof ID
- **Tamper Detection**: Real-time detection and visualization of content modifications
- **Social Feed**: Demo feed showing AI content, verified human content, and your signed content

### 🔒 Privacy X-Ray
- **Zero-Knowledge Proof Visualization**: Animated diagram showing how private data stays on device
- **Data Firewall**: Visual representation of privacy-preserving cryptography
- **Educational**: Clear explanation of how biometric data and location remain private while math proofs verify humanity

## Tech Stack

- **React 18** - Component framework with hooks
- **Tailwind CSS** - Utility-first styling with custom animations
- **Lucide React** - Icon library
- **HTML5 Canvas** - Entropy visualization
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ElwinGonsalves/PLH-Provenance-Layer-for-Humans.git

# Navigate to project directory
cd PLH-Provenance-Layer-for-Humans

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm test
```

## How It Works

1. **Entropy Collection**: Move your mouse over the Hardware Moat canvas to collect entropy from hardware interactions
2. **Content Creation**: Enter text or upload images/videos you want to sign
3. **Signing**: Once entropy reaches 100%, sign your content to generate a Reality Stamp
4. **Verification**: View your signed content in The Reality Stamp feed with a verified Trust Badge
5. **Tamper Detection**: Try the "Simulate Tamper" button to see how the system detects modifications

## Project Structure

```
PLH/
├── .kiro/specs/plh-protocol-demo/  # Specification documents
│   ├── requirements.md              # Feature requirements
│   ├── design.md                    # Design document
│   └── tasks.md                     # Implementation tasks
├── src/
│   └── test/
│       └── setup.js                 # Test configuration
├── PLH_Enhanced_Demo.jsx            # Main application component
├── PLH_Enhanced_Demo.test.jsx       # Test suite
├── index.html                       # HTML entry point
├── main.jsx                         # React entry point
├── index.css                        # Global styles
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies and scripts
```

## Design Philosophy

This is a **demonstration application** showcasing concepts of human verification without biometrics. The cryptographic operations are simulated and **NOT secure for production use**. The goal is to educate and visualize complex security concepts in an accessible way.

### Key Concepts Demonstrated

- **Hardware Entropy**: Using physical interactions as a source of randomness
- **Zero-Knowledge Proofs**: Proving humanity without revealing private data
- **Content Provenance**: Cryptographic signatures for content authenticity
- **Tamper Detection**: Hash-based verification of content integrity

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This project was built as a demonstration. Feel free to fork and experiment!

## License

MIT License - See LICENSE file for details

## Acknowledgments

Built with the Kiro IDE spec-driven development workflow, demonstrating how formal requirements and design documents can guide implementation.

---

**Note**: This is an educational demonstration. For production use cases involving actual cryptographic verification, please use established cryptographic libraries and consult security experts.
