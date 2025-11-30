# Design Document

## Overview

PLH (Provenance Layer for Humans) is a single-file React application demonstrating cryptographic content verification through an interactive cyber-security interface. The application uses visual metaphors to explain complex security concepts: hardware entropy collection via mouse movements, zero-knowledge proofs through animated diagrams, and tamper detection via visual badge transformations.

The application is structured around three main modules (ForgeModule, FeedModule, PrivacyModule) that demonstrate the complete lifecycle of human-verified content creation, verification, and privacy preservation.

## Architecture

### High-Level Structure

```
PLH_Enhanced_Demo.jsx
├── App Component (Main Container)
│   ├── Tab Navigation
│   ├── Global State Management
│   └── Tab Content Router
├── ForgeModule (The Hardware Moat)
│   ├── Content Input (Text/Image/Video)
│   ├── EntropyCanvas Component
│   ├── HardwareAttestationPanel
│   └── InvisibleSecurityToggle
├── FeedModule (The Reality Stamp)
│   ├── PostList Component
│   ├── Post Component
│   ├── TrustBadge Component
│   └── DigitalCertificate Component
└── PrivacyModule (Privacy X-Ray)
    ├── SplitDiagram Component
    ├── DataFirewall Animation
    └── IconAnimations
```

### State Management

The application uses React hooks (useState, useEffect, useRef) for state management:

- **Global State**: Current tab, signed content data
- **Forge State**: Message text, uploaded files, entropy level, invisible mode, signing status
- **Feed State**: Posts array, expanded certificate IDs, tampered post IDs
- **Privacy State**: Animation play state

### Technology Stack

- **React**: Component framework (using hooks)
- **Tailwind CSS**: Utility-first styling with custom animations
- **Lucide React**: Icon library for UI elements
- **HTML5 Canvas**: For entropy visualization
- **CSS Keyframes**: For animations (scanning, pulse, shatter, lock)

## Components and Interfaces

### 1. App Component

**Purpose**: Root component managing tab navigation and global state

**Props**: None (root component)

**State**:
```typescript
{
  activeTab: 'forge' | 'feed' | 'privacy',
  signedContent: {
    content: string | File,
    contentType: 'text' | 'image' | 'video',
    hash: string,
    timestamp: number,
    proofId: string
  } | null
}
```

**Methods**:
- `setActiveTab(tab)`: Switch between tabs
- `handleContentSigned(signedData)`: Store signed content from Forge

### 2. ForgeModule Component

**Purpose**: Content creation and entropy collection interface

**Props**:
```typescript
{
  onContentSigned: (signedData) => void
}
```

**State**:
```typescript
{
  messageText: string,
  uploadedFile: File | null,
  filePreviewUrl: string | null,
  entropyLevel: number,
  invisibleMode: boolean,
  isSigned: boolean,
  showLockAnimation: boolean
}
```

**Methods**:
- `handleTextChange(text)`: Update message text
- `handleFileUpload(file)`: Process image/video upload
- `handleCanvasInteraction(event)`: Track mouse movement for entropy
- `handleSign()`: Generate Reality Stamp
- `resetForge()`: Clear all inputs and reset state

### 3. EntropyCanvas Component

**Purpose**: Interactive canvas for entropy visualization

**Props**:
```typescript
{
  onEntropyChange: (level: number) => void,
  isActive: boolean
}
```

**State**:
```typescript
{
  particles: Array<{
    x: number,
    y: number,
    opacity: number,
    timestamp: number
  }>
}
```

**Canvas Logic**:
- Track mouse/touch movements
- Draw glowing green particles at cursor position
- Fade particles over time (opacity decay)
- Calculate entropy based on movement coverage
- Clear and redraw on each animation frame

### 4. HardwareAttestationPanel Component

**Purpose**: Display simulated hardware sensor readouts

**Props**: None

**Display**:
- Gyroscope: Active (with green indicator)
- Touch Pressure: Detected (with green indicator)
- Enclave: Locked (with lock icon)

### 5. FeedModule Component

**Purpose**: Display social feed with verification badges

**Props**:
```typescript
{
  userContent: SignedContent | null
}
```

**State**:
```typescript
{
  posts: Array<Post>,
  expandedCertId: string | null,
  tamperedPostIds: Set<string>
}
```

**Post Interface**:
```typescript
interface Post {
  id: string,
  author: string,
  content: string | File,
  contentType: 'text' | 'image' | 'video',
  isVerified: boolean,
  certificate?: {
    hash: string,
    timestamp: number,
    proofId: string
  }
}
```

### 6. TrustBadge Component

**Purpose**: Display verification status with interactive certificate

**Props**:
```typescript
{
  isVerified: boolean,
  isTampered: boolean,
  certificate: Certificate | null,
  isExpanded: boolean,
  onToggle: () => void
}
```

**Visual States**:
- Verified: Green glowing badge with scanning animation
- Tampered: Red shattered badge with "HASH MISMATCH"
- Unverified: No badge displayed

### 7. DigitalCertificate Component

**Purpose**: Expandable certificate details

**Props**:
```typescript
{
  certificate: {
    hash: string,
    contentType: string,
    timestamp: number,
    proofId: string
  },
  isTampered: boolean
}
```

**Display**:
- Content Hash (truncated with ellipsis)
- Content Type
- Timestamp (formatted)
- zk-SNARK Proof ID
- Verification Status

### 8. PrivacyModule Component

**Purpose**: Educational visualization of zero-knowledge proofs

**State**:
```typescript
{
  animationPlayed: boolean
}
```

**Layout**:
- Left Panel: User Device (Private)
- Center: Data Firewall
- Right Panel: Public Ledger (Public)

**Animation Sequence**:
1. Biometric Data icon moves toward firewall → stops
2. Location icon moves toward firewall → stops
3. Math Proof icon moves through firewall → reaches public ledger
4. Lock icons appear on stopped data

## Data Models

### SignedContent

```typescript
interface SignedContent {
  content: string | File;
  contentType: 'text' | 'image' | 'video';
  contentHash: string;
  timestamp: number;
  proofId: string;
  originalHash: string; // For tamper detection
}
```

### Post

```typescript
interface Post {
  id: string;
  author: string;
  content: string | File;
  contentType: 'text' | 'image' | 'video';
  isVerified: boolean;
  certificate?: Certificate;
  originalContent?: string | File; // For tamper detection
}
```

### Certificate

```typescript
interface Certificate {
  contentHash: string;
  contentType: string;
  timestamp: number;
  proofId: string;
}
```

### Particle

```typescript
interface Particle {
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: File format validation for images

*For any* uploaded file, if the file extension is PNG, JPG, or GIF, then the system should accept the image upload.
**Validates: Requirements 1.3**

### Property 2: File format validation for videos

*For any* uploaded file, if the file extension is MP4 or WEBM, then the system should accept the video upload.
**Validates: Requirements 1.4**

### Property 3: File preview generation

*For any* successfully uploaded image or video file, the system should generate and display a preview URL.
**Validates: Requirements 1.5**

### Property 4: Particle rendering on mouse movement

*For any* mouse movement event over the Hardware Moat canvas, the system should create a new particle at the cursor coordinates with full opacity.
**Validates: Requirements 1.6**

### Property 5: Entropy monotonic increase

*For any* sequence of canvas interactions, the entropy level should be monotonically non-decreasing (never decrease) and bounded between 0% and 100%.
**Validates: Requirements 1.7**

### Property 6: Sign button disabled state

*For any* entropy level below 100% when Invisible Security is OFF, the Sign button should remain in a disabled state.
**Validates: Requirements 1.9**

### Property 7: Reality Stamp completeness

*For any* content (text, image, or video) that is signed, the generated Reality Stamp should contain all required fields: contentHash, contentType, timestamp, and proofId.
**Validates: Requirements 1.10**

### Property 8: Automatic signing in invisible mode

*For any* content when Invisible Security is ON, once entropy reaches 100%, the system should automatically generate a Reality Stamp without user interaction.
**Validates: Requirements 2.3**

### Property 9: Manual signing required when invisible mode off

*For any* content when Invisible Security is OFF, even when entropy reaches 100%, the system should NOT automatically sign until the user clicks the Sign button.
**Validates: Requirements 2.4**

### Property 10: Signed content appears in feed

*For any* content signed in The Hardware Moat, that content should appear as the third post in The Reality Stamp feed.
**Validates: Requirements 3.4**

### Property 11: Certificate expansion completeness

*For any* verified post with a Trust Badge, clicking the badge should expand to reveal a Digital Certificate containing contentHash, contentType, timestamp, and proofId.
**Validates: Requirements 3.8**

### Property 12: Tamper detection badge color change

*For any* verified post whose content is modified after verification, the Trust Badge should immediately change from green (#4ade80) to red (#ef4444).
**Validates: Requirements 4.5**

### Property 13: Hash mismatch on tamper

*For any* verified post whose content is modified, the computed hash of the current content should differ from the original hash stored in the certificate.
**Validates: Requirements 4.8**

### Property 14: Consistent background color

*For any* rendered component in the application, the background color should be black (#000000).
**Validates: Requirements 6.1**

### Property 15: Particle opacity decay

*For any* particle drawn on the Hardware Moat canvas, its opacity should decrease over time until it reaches zero and is removed.
**Validates: Requirements 7.4**

### Property 16: Reset clears entropy

*For any* state where entropy is greater than 0%, resetting or clearing input should set the entropy level back to 0%.
**Validates: Requirements 8.4**

### Property 17: Tab state persistence

*For any* tab, switching to a different tab and then returning should preserve all data that was present before switching.
**Validates: Requirements 8.5**

### Property 18: Forge reusability

*For any* completed signing operation, returning to The Hardware Moat should allow creating new content with entropy starting at 0%.
**Validates: Requirements 8.7**

### Property 19: Touch and mouse equivalence

*For any* touch event on the Hardware Moat canvas, the entropy collection behavior should be equivalent to a mouse event at the same coordinates.
**Validates: Requirements 9.4**

## Error Handling

### Input Validation Errors

**Empty Content Error**:
- Trigger: User attempts to sign without any text or uploaded file
- Response: Display error message "Please enter content or upload a file before signing"
- Recovery: User adds content and retries

**File Size Error**:
- Trigger: User uploads file exceeding 10MB
- Response: Display error message "File size exceeds 10MB limit. Please choose a smaller file."
- Recovery: User selects a different file

**Unsupported Format Error**:
- Trigger: User uploads file with unsupported extension
- Response: Display error message "Unsupported format. Please upload PNG, JPG, GIF for images or MP4, WEBM for videos."
- Recovery: User selects a supported file format

### Canvas Errors

**Canvas Context Error**:
- Trigger: Canvas fails to get 2D rendering context
- Response: Log error to console, display fallback message "Canvas not supported"
- Recovery: Application continues without entropy visualization

**Animation Frame Error**:
- Trigger: requestAnimationFrame fails
- Response: Fall back to setTimeout for animation loop
- Recovery: Particles still animate but may be less smooth

### State Errors

**Invalid Entropy Value**:
- Trigger: Entropy calculation produces value outside 0-100 range
- Response: Clamp value to valid range (Math.max(0, Math.min(100, value)))
- Recovery: Entropy continues to function correctly

**Missing Certificate Data**:
- Trigger: User clicks badge on post without certificate
- Response: Do not expand, log warning to console
- Recovery: Badge remains clickable but doesn't expand

## Testing Strategy

### Unit Testing Approach

The application will use **Vitest** as the testing framework for unit tests. Unit tests will focus on:

**Component Rendering**:
- Test that ForgeModule renders all required input elements
- Test that FeedModule renders three posts
- Test that PrivacyModule renders split-screen layout
- Test that TrustBadge renders in correct color based on verification status

**State Management**:
- Test that tab switching updates activeTab state
- Test that signing updates signedContent state
- Test that tampering updates tamperedPostIds set
- Test that invisible mode toggle updates state correctly

**Event Handlers**:
- Test that handleTextChange updates messageText
- Test that handleFileUpload processes valid files
- Test that handleSign generates Reality Stamp with correct structure
- Test that handleTamper modifies content and triggers badge change

**Edge Cases**:
- Test empty content validation
- Test file size limit enforcement (10MB)
- Test unsupported format rejection
- Test initial state (entropy at 0%, button disabled)
- Test placeholder display when no user content exists

### Property-Based Testing Approach

The application will use **fast-check** as the property-based testing library. Property-based tests will verify universal properties across many randomly generated inputs:

**Configuration**: Each property-based test will run a minimum of 100 iterations to ensure thorough coverage.

**Tagging Convention**: Each property-based test will include a comment tag in this exact format:
```javascript
// Feature: plh-protocol-demo, Property {number}: {property_text}
```

**Property Test Coverage**:

1. **File Format Validation** (Properties 1-2):
   - Generate random file objects with various extensions
   - Verify PNG/JPG/GIF accepted for images, MP4/WEBM for videos
   - Verify other formats rejected

2. **Entropy Behavior** (Properties 5, 7, 16):
   - Generate random sequences of canvas interactions
   - Verify entropy never decreases and stays in 0-100 range
   - Verify Reality Stamp always contains required fields
   - Verify reset always returns entropy to 0%

3. **Signing Modes** (Properties 8-9):
   - Generate random content and entropy levels
   - Verify automatic signing occurs only when invisible mode ON and entropy = 100%
   - Verify manual signing required when invisible mode OFF

4. **Tamper Detection** (Properties 12-13):
   - Generate random verified posts
   - Modify content in various ways
   - Verify badge always turns red
   - Verify hash always mismatches after modification

5. **State Persistence** (Property 17):
   - Generate random tab states
   - Switch tabs and return
   - Verify all data preserved

6. **Input Equivalence** (Property 19):
   - Generate random touch and mouse events at same coordinates
   - Verify entropy changes are equivalent

**Test Utilities**:
- `generateRandomFile(type, size)`: Create mock File objects
- `generateRandomContent()`: Create random text/image/video content
- `simulateCanvasInteraction(x, y)`: Simulate mouse/touch events
- `computeHash(content)`: Calculate content hash for verification

### Integration Testing

Integration tests will verify interactions between components:

- **Forge to Feed Flow**: Sign content in Forge, verify it appears in Feed
- **Tamper Detection Flow**: Tamper with verified post, verify badge and certificate update
- **Invisible Mode Flow**: Enable invisible mode, reach 100% entropy, verify auto-signing
- **Tab Navigation Flow**: Create content in Forge, switch tabs, verify persistence

### Visual Regression Testing

While not automated, manual visual testing will verify:
- Particle animations render smoothly
- Badge shatter animation plays correctly
- Lock animation provides satisfying feedback
- Privacy X-Ray animation sequence is clear
- Responsive layouts work on mobile and desktop

## Performance Considerations

### Canvas Optimization

**Particle Management**:
- Limit maximum particles to 100 to prevent memory issues
- Remove particles with opacity < 0.01 to reduce rendering load
- Use requestAnimationFrame for smooth 60fps animation
- Clear canvas before each frame to prevent visual artifacts

**Entropy Calculation**:
- Throttle entropy updates to every 50ms to reduce computation
- Use simple coverage algorithm (track unique grid cells visited)
- Avoid complex mathematical operations in animation loop

### File Handling

**Upload Optimization**:
- Validate file size before reading to prevent memory issues
- Use FileReader for client-side preview generation
- Generate object URLs for image/video preview (revoke when unmounted)
- Limit file size to 10MB to ensure reasonable performance

**Hash Calculation**:
- For demo purposes, use simple hash function (not cryptographically secure)
- For text: hash the string content
- For files: hash file name + size + type (avoid reading entire file)

### State Management

**Minimize Re-renders**:
- Use React.memo for components that don't need frequent updates
- Split state into logical chunks (forge state, feed state, privacy state)
- Use useCallback for event handlers to prevent recreation
- Use useRef for canvas and animation frame IDs

### Animation Performance

**CSS Animations**:
- Use transform and opacity for animations (GPU-accelerated)
- Avoid animating layout properties (width, height, margin)
- Use will-change hint for frequently animated elements
- Remove will-change after animation completes

## Security Considerations

**Note**: This is a demonstration application. The cryptographic operations are simulated and NOT secure for production use.

### Simulated Cryptography

**Hash Function**:
- Use simple string hashing for demo purposes
- Real implementation would use SHA-256 or similar
- Hash should be deterministic for tamper detection

**zk-SNARK Proof**:
- Generate random proof ID for demonstration
- Real implementation would use actual zero-knowledge proof library
- Proof should be verifiable but not reveal private data

**Entropy Collection**:
- Mouse movements simulate hardware entropy
- Real implementation would use Web Crypto API
- Should collect from multiple hardware sources

### Data Privacy

**Local Storage**:
- All data stored in component state (not persisted)
- No data sent to external servers
- File uploads processed entirely client-side

**Content Handling**:
- Uploaded files never leave the browser
- Preview URLs are blob URLs (local to browser)
- No tracking or analytics

## Deployment Considerations

### Build Configuration

**Single File Output**:
- Component: PLH_Enhanced_Demo.jsx
- Dependencies: React, Tailwind CSS, Lucide React
- Build tool: Vite or Create React App
- Output: Single HTML file with inlined JS/CSS

### Browser Compatibility

**Required Features**:
- ES6+ JavaScript support
- HTML5 Canvas API
- FileReader API
- CSS Grid and Flexbox
- CSS Animations and Keyframes

**Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsive Breakpoints

**Mobile**: < 768px
- Stack layouts vertically
- Reduce canvas size
- Simplify animations

**Tablet**: 768px - 1024px
- Hybrid layouts
- Full canvas size
- All animations enabled

**Desktop**: > 1024px
- Horizontal layouts
- Maximum canvas size
- All features enabled

## Future Enhancements

### Potential Features

1. **Real Cryptography**: Integrate Web Crypto API for actual hash generation
2. **Persistent Storage**: Save signed content to localStorage or IndexedDB
3. **Export Functionality**: Download signed content with certificate as JSON
4. **Batch Signing**: Sign multiple pieces of content at once
5. **Advanced Entropy**: Collect from gyroscope, accelerometer, touch pressure
6. **Verification API**: Backend service to verify signatures
7. **Social Sharing**: Share verified content with embedded certificates
8. **Accessibility**: Screen reader support, keyboard navigation
9. **Internationalization**: Multi-language support
10. **Dark/Light Mode**: Toggle between themes (currently dark only)

### Technical Improvements

1. **TypeScript**: Add type safety throughout the application
2. **Component Library**: Extract reusable components
3. **State Management**: Consider Zustand or Jotai for complex state
4. **Testing**: Achieve 90%+ code coverage
5. **Performance**: Implement virtual scrolling for large feeds
6. **PWA**: Make application installable as Progressive Web App
7. **WebAssembly**: Use WASM for performance-critical operations
8. **Web Workers**: Offload hash calculation to background thread
