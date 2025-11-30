# Implementation Plan

- [x] 1. Set up project structure and core application shell





  - Create PLH_Enhanced_Demo.jsx with React imports and Tailwind CSS setup
  - Implement main App component with tab navigation state
  - Create tab navigation UI with three tabs: Hardware Moat, Reality Stamp, Privacy X-Ray
  - Set up global state for activeTab and signedContent
  - _Requirements: 10.1, 10.2, 10.6_
-

- [x] 2. Implement ForgeModule - Basic structure and text input




  - Create ForgeModule component with text input area
  - Implement state management for messageText, uploadedFile, entropyLevel, invisibleMode, isSigned
  - Add Hardware Attestation panel with sensor readouts (Gyroscope, Touch Pressure, Enclave)
  - Add Invisible Security toggle switch
  - _Requirements: 1.1, 1.2, 1.8, 2.1_

- [x] 3. Implement file upload functionality





  - Add image upload button accepting PNG, JPG, GIF formats
  - Add video upload button accepting MP4, WEBM formats
  - Implement file validation for format and size (10MB limit)
  - Generate and display preview for uploaded images and videos
  - Handle upload errors with appropriate error messages
  - _Requirements: 1.3, 1.4, 1.5, 8.2, 8.3_

- [ ]* 3.1 Write property test for file format validation
  - **Property 1: File format validation for images**
  - **Property 2: File format validation for videos**
  - **Validates: Requirements 1.3, 1.4**

- [ ]* 3.2 Write property test for file preview generation
  - **Property 3: File preview generation**
  - **Validates: Requirements 1.5**

- [x] 4. Implement EntropyCanvas component





  - Create canvas element with proper dimensions and styling
  - Set up canvas 2D rendering context
  - Implement mouse movement tracking over canvas
  - Draw glowing green particles at cursor position
  - Implement particle array management with opacity decay
  - Calculate entropy based on canvas interaction coverage
  - Update entropy percentage display with pulse animation
  - _Requirements: 1.6, 1.7, 6.6_

- [ ]* 4.1 Write property test for particle rendering
  - **Property 4: Particle rendering on mouse movement**
  - **Validates: Requirements 1.6**

- [ ]* 4.2 Write property test for entropy behavior
  - **Property 5: Entropy monotonic increase**
  - **Validates: Requirements 1.7**

- [ ]* 4.3 Write property test for particle opacity decay
  - **Property 15: Particle opacity decay**
  - **Validates: Requirements 7.4**

- [x] 5. Implement signing functionality





  - Implement Sign button with disabled state when entropy < 100%
  - Create hash generation function for content
  - Generate Reality Stamp with contentHash, contentType, timestamp, proofId
  - Implement Lock animation on successful signing
  - Pass signed content to parent App component
  - Handle empty content validation
  - _Requirements: 1.9, 1.10, 1.11, 8.1_

- [ ]* 5.1 Write property test for sign button state
  - **Property 6: Sign button disabled state**
  - **Validates: Requirements 1.9**

- [ ]* 5.2 Write property test for Reality Stamp completeness
  - **Property 7: Reality Stamp completeness**
  - **Validates: Requirements 1.10**

- [x] 6. Implement Invisible Security mode





  - Implement toggle switch functionality
  - Hide Sign button when Invisible Security is ON
  - Implement automatic signing when entropy reaches 100% in invisible mode
  - Ensure manual signing required when invisible mode is OFF
  - Display Lock animation for both manual and automatic signing
  - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [ ]* 6.1 Write property test for automatic signing
  - **Property 8: Automatic signing in invisible mode**
  - **Validates: Requirements 2.3**

- [ ]* 6.2 Write property test for manual signing requirement
  - **Property 9: Manual signing required when invisible mode off**
  - **Validates: Requirements 2.4**

- [x] 7. Implement reset and reusability functionality





  - Implement reset function to clear all inputs
  - Reset entropy to 0% when clearing inputs
  - Allow creating new content after signing
  - Ensure fresh entropy collection on reset
  - _Requirements: 8.4, 8.7_

- [ ]* 7.1 Write property test for reset functionality
  - **Property 16: Reset clears entropy**
  - **Property 18: Forge reusability**
  - **Validates: Requirements 8.4, 8.7**

- [x] 8. Checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement FeedModule - Basic structure and mock posts





  - Create FeedModule component with posts array state
  - Create Post component for rendering individual posts
  - Implement three mock posts: AI bot (no badge), verified human (with badge), user content (conditional)
  - Implement state for expandedCertId and tamperedPostIds
  - Display placeholder when no user content exists
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.6_

- [x] 10. Implement content rendering for different types





  - Render text content as formatted text
  - Render image content with image preview
  - Render video content with video player controls
  - Handle all three content types in Post component
  - _Requirements: 3.5, 3.6, 3.7_

- [ ]* 10.1 Write property test for signed content in feed
  - **Property 10: Signed content appears in feed**
  - **Validates: Requirements 3.4**

- [x] 11. Implement TrustBadge component





  - Create TrustBadge component with verified/tampered states
  - Implement green glowing badge for verified posts
  - Implement red badge for tampered posts
  - Add CSS scanning animation effect to green badges
  - Implement click handler to toggle certificate expansion
  - _Requirements: 3.3, 3.9, 4.5_

- [x] 12. Implement DigitalCertificate component





  - Create DigitalCertificate component with expandable view
  - Display contentHash (truncated with ellipsis)
  - Display contentType, timestamp (formatted), and proofId
  - Show verification status
  - Implement smooth expand/collapse animation
  - _Requirements: 3.8_

- [ ]* 12.1 Write property test for certificate expansion
  - **Property 11: Certificate expansion completeness**
  - **Validates: Requirements 3.8**

- [x] 13. Implement tamper simulation functionality





  - Add Simulate Tamper button to verified posts
  - Implement text tampering (append [HACKED] or change words)
  - Implement image tampering (apply visual filter)
  - Implement video tampering (modify display properties)
  - Update tamperedPostIds state when tampered
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 14. Implement tamper detection and visual feedback





  - Change badge color from green to red when content tampered
  - Implement shatter animation effect using CSS keyframes
  - Display "HASH MISMATCH" text on red badge
  - Recalculate content hash and show mismatch in certificate
  - _Requirements: 4.5, 4.6, 4.7, 4.8_

- [ ]* 14.1 Write property test for tamper detection
  - **Property 12: Tamper detection badge color change**
  - **Property 13: Hash mismatch on tamper**
  - **Validates: Requirements 4.5, 4.8**

- [ ] 15. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. Implement PrivacyModule - Basic structure





  - Create PrivacyModule component with split-screen layout
  - Create left panel for User Device (Private)
  - Create right panel for Public Ledger (Public)
  - Create center Data Firewall element
  - Add icons for Biometric Data, Location, and Math Proof using Lucide React
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 17. Implement Privacy X-Ray animations





  - Implement animation state management
  - Animate Biometric Data icon moving toward firewall and stopping
  - Animate Location icon moving toward firewall and stopping
  - Animate Math Proof icon passing through firewall to Public Ledger
  - Add lock icons to stopped data icons
  - Use CSS keyframes for smooth animations
  - _Requirements: 5.4, 5.5, 5.6, 7.5_

- [x] 18. Implement design system and styling





  - Apply black background (#000000) to all components
  - Use neon green (#4ade80) for primary interactive elements
  - Use alert red (#ef4444) for error and tamper states
  - Apply monospace font (font-mono) to all text
  - Add glowing effects to borders and interactive elements using box-shadow
  - Ensure consistent styling across all components
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 18.1 Write property test for consistent background color
  - **Property 14: Consistent background color**
  - **Validates: Requirements 6.1**

- [x] 19. Implement tab state persistence





  - Ensure tab switching preserves all state data
  - Test switching between all three tabs
  - Verify data persists when returning to a tab
  - _Requirements: 8.5_

- [ ]* 19.1 Write property test for tab state persistence
  - **Property 17: Tab state persistence**
  - **Validates: Requirements 8.5**

- [x] 20. Implement responsive design





  - Add responsive breakpoints for mobile, tablet, desktop
  - Stack canvas and layouts vertically on mobile
  - Stack Privacy X-Ray panels vertically on mobile
  - Ensure horizontal layouts on desktop
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 21. Implement touch event support





  - Add touch event handlers to EntropyCanvas
  - Ensure touch events produce same entropy behavior as mouse events
  - Test on touch-enabled devices or simulators
  - _Requirements: 9.4_

- [ ]* 21.1 Write property test for touch and mouse equivalence
  - **Property 19: Touch and mouse equivalence**
  - **Validates: Requirements 9.4**

- [x] 22. Final polish and edge case handling





  - Verify all error messages display correctly
  - Test all edge cases (empty content, no user content, etc.)
  - Ensure all animations play smoothly
  - Verify canvas handles errors gracefully
  - Test file upload edge cases
  - _Requirements: 8.1, 8.2, 8.3, 8.6, 8.8_

- [x] 23. Final Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
