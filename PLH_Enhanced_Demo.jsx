import React, { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Eye, Fingerprint, MapPin, Calculator } from 'lucide-react';

/**
 * PLH (Provenance Layer for Humans) - Enhanced Demo
 * A single-file React application demonstrating cryptographic content verification
 * through an interactive cyber-security interface.
 */

// Main App Component
function App() {
  // Global state management
  const [activeTab, setActiveTab] = useState('forge'); // 'forge' | 'feed' | 'privacy'
  const [signedContent, setSignedContent] = useState(null);

  // Handle content signing from ForgeModule
  const handleContentSigned = (signedData) => {
    setSignedContent(signedData);
    // Optionally switch to feed tab to show the signed content
    setActiveTab('feed');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Tab Navigation */}
      <nav className="border-b border-green-400/30 shadow-lg shadow-green-400/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
            {/* Hardware Moat Tab */}
            <button
              onClick={() => setActiveTab('forge')}
              className={`
                px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 font-mono text-sm sm:text-base
                ${activeTab === 'forge' 
                  ? 'bg-green-400/10 text-green-400 border-b-2 border-green-400 shadow-glow-green' 
                  : 'text-green-400/50 hover:text-green-400/80 hover:bg-green-400/5'
                }
              `}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">The Hardware Moat</span>
                <span className="sm:hidden">Hardware Moat</span>
              </div>
            </button>

            {/* Reality Stamp Tab */}
            <button
              onClick={() => setActiveTab('feed')}
              className={`
                px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 font-mono text-sm sm:text-base
                ${activeTab === 'feed' 
                  ? 'bg-green-400/10 text-green-400 border-b-2 border-green-400 shadow-glow-green' 
                  : 'text-green-400/50 hover:text-green-400/80 hover:bg-green-400/5'
                }
              `}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">The Reality Stamp</span>
                <span className="sm:hidden">Reality Stamp</span>
              </div>
            </button>

            {/* Privacy X-Ray Tab */}
            <button
              onClick={() => setActiveTab('privacy')}
              className={`
                px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 font-mono text-sm sm:text-base
                ${activeTab === 'privacy' 
                  ? 'bg-green-400/10 text-green-400 border-b-2 border-green-400 shadow-glow-green' 
                  : 'text-green-400/50 hover:text-green-400/80 hover:bg-green-400/5'
                }
              `}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Privacy X-Ray</span>
                <span className="sm:hidden">Privacy X-Ray</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content - Keep all tabs mounted but hide inactive ones to preserve state */}
      <main className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div style={{ display: activeTab === 'forge' ? 'block' : 'none' }}>
          <ForgeModule onContentSigned={handleContentSigned} />
        </div>
        <div style={{ display: activeTab === 'feed' ? 'block' : 'none' }}>
          <FeedModule userContent={signedContent} />
        </div>
        <div style={{ display: activeTab === 'privacy' ? 'block' : 'none' }}>
          <PrivacyModule />
        </div>
      </main>
    </div>
  );
}

// EntropyCanvas Component
function EntropyCanvas({ onEntropyChange, isActive, resetTrigger }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const visitedCellsRef = useRef(new Set());
  const gridSize = 45; // Size of grid cells for entropy calculation (larger = faster, ~5 seconds to fill)

  // Reset entropy collection when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined) {
      visitedCellsRef.current.clear();
      particlesRef.current = [];
      onEntropyChange(0);
    }
  }, [resetTrigger, onEntropyChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas 2D context not supported');
      return;
    }

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Handle mouse movement
    const handleMouseMove = (e) => {
      if (!isActive) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      addParticle(x, y);
      updateEntropy(x, y);
    };

    // Handle touch movement
    const handleTouchMove = (e) => {
      if (!isActive) return;
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      addParticle(x, y);
      updateEntropy(x, y);
    };

    // Add particle at cursor position
    const addParticle = (x, y) => {
      particlesRef.current.push({
        x,
        y,
        opacity: 1,
        timestamp: Date.now()
      });

      // Limit particles to prevent memory issues
      if (particlesRef.current.length > 100) {
        particlesRef.current.shift();
      }
    };

    // Update entropy based on canvas coverage
    const updateEntropy = (x, y) => {
      const cellX = Math.floor(x / gridSize);
      const cellY = Math.floor(y / gridSize);
      const cellKey = `${cellX},${cellY}`;
      
      visitedCellsRef.current.add(cellKey);
      
      // Calculate total possible cells
      const totalCellsX = Math.ceil(canvas.width / gridSize);
      const totalCellsY = Math.ceil(canvas.height / gridSize);
      const totalCells = totalCellsX * totalCellsY;
      
      // Calculate entropy percentage
      const coverage = visitedCellsRef.current.size / totalCells;
      const entropyPercentage = Math.min(100, Math.floor(coverage * 100));
      
      onEntropyChange(entropyPercentage);
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Calculate opacity decay over time (fade out over 1 second)
        const age = now - particle.timestamp;
        particle.opacity = Math.max(0, 1 - age / 1000);
        
        if (particle.opacity > 0.01) {
          // Draw glowing green particle
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, 8
          );
          gradient.addColorStop(0, `rgba(74, 222, 128, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(74, 222, 128, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
          ctx.fill();
          
          return true; // Keep particle
        }
        
        return false; // Remove particle
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, onEntropyChange]);

  // Reset entropy when isActive changes to false
  useEffect(() => {
    if (!isActive) {
      visitedCellsRef.current.clear();
      particlesRef.current = [];
      onEntropyChange(0);
    }
  }, [isActive, onEntropyChange]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
}

// ForgeModule Component
function ForgeModule({ onContentSigned }) {
  // State management
  const [messageText, setMessageText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [entropyLevel, setEntropyLevel] = useState(0);
  const [invisibleMode, setInvisibleMode] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [showLockAnimation, setShowLockAnimation] = useState(false);
  const [signError, setSignError] = useState('');
  const [resetTrigger, setResetTrigger] = useState(0);

  // Hash generation function for content
  const generateHash = (content) => {
    // Simple hash function for demo purposes (not cryptographically secure)
    let hash = 0;
    const str = typeof content === 'string' ? content : `${content.name}-${content.size}-${content.type}`;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to hex string and pad
    return Math.abs(hash).toString(16).padStart(16, '0');
  };

  // Generate Reality Stamp
  const generateRealityStamp = () => {
    // Validate content exists
    if (!messageText.trim() && !uploadedFile) {
      setSignError('Please enter content or upload a file before signing');
      return null;
    }

    // Clear any previous errors
    setSignError('');

    // Determine content and content type
    let content, contentType, contentHash;
    
    if (uploadedFile) {
      content = uploadedFile;
      contentType = uploadedFile.type.startsWith('image/') ? 'image' : 'video';
      contentHash = generateHash(uploadedFile);
    } else {
      content = messageText;
      contentType = 'text';
      contentHash = generateHash(messageText);
    }

    // Generate Reality Stamp
    const realityStamp = {
      content,
      contentType,
      contentHash,
      timestamp: Date.now(),
      proofId: `zkp-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      originalHash: contentHash // Store for tamper detection
    };

    return realityStamp;
  };

  // Handle signing
  const handleSign = () => {
    const realityStamp = generateRealityStamp();
    
    if (realityStamp) {
      // Show lock animation
      setShowLockAnimation(true);
      setIsSigned(true);

      // Pass signed content to parent after animation
      setTimeout(() => {
        onContentSigned(realityStamp);
        setShowLockAnimation(false);
      }, 1500);
    }
  };

  // File upload handler
  const handleFileUpload = (event, fileType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous errors
    setUploadError('');

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size exceeds 10MB limit. Please choose a smaller file.');
      return;
    }

    // Validate file format
    const imageFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const videoFormats = ['video/mp4', 'video/webm'];
    
    let isValidFormat = false;
    if (fileType === 'image') {
      isValidFormat = imageFormats.includes(file.type);
      if (!isValidFormat) {
        setUploadError('Unsupported format. Please upload PNG, JPG, or GIF for images.');
        return;
      }
    } else if (fileType === 'video') {
      isValidFormat = videoFormats.includes(file.type);
      if (!isValidFormat) {
        setUploadError('Unsupported format. Please upload MP4 or WEBM for videos.');
        return;
      }
    }

    // Generate preview URL
    const previewUrl = URL.createObjectURL(file);
    setFilePreviewUrl(previewUrl);
    setUploadedFile(file);
  };

  // Cleanup preview URL on unmount or when file changes
  React.useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  // Automatic signing when invisible mode is ON and entropy reaches 100%
  useEffect(() => {
    if (invisibleMode && entropyLevel === 100 && !isSigned) {
      // Automatically sign the content
      handleSign();
    }
  }, [invisibleMode, entropyLevel, isSigned]);

  // Reset function to clear all inputs and allow creating new content
  const handleReset = () => {
    // Clear all input fields
    setMessageText('');
    setUploadedFile(null);
    
    // Revoke preview URL to free memory
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    
    // Clear errors
    setUploadError('');
    setSignError('');
    
    // Reset signing state to allow new content creation
    setIsSigned(false);
    setShowLockAnimation(false);
    
    // Reset entropy to 0% - this will trigger fresh entropy collection
    setEntropyLevel(0);
    
    // Trigger canvas reset by incrementing resetTrigger
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-400 font-mono">The Hardware Moat</h2>
        <p className="text-sm sm:text-base text-green-400/70 font-mono">Generate cryptographically signed content with hardware entropy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column - Content Input */}
        <div className="space-y-4 sm:space-y-6">
          {/* Text Input Area */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-green-400 font-mono">
              Message Text
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Enter your message here..."
              className="w-full h-24 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 bg-black border border-green-400/30 rounded-lg 
                       text-sm sm:text-base text-green-400 placeholder-green-400/30 focus:outline-none focus:border-green-400 
                       focus:ring-1 focus:ring-green-400 focus:shadow-glow-green transition-all resize-none font-mono"
            />
          </div>

          {/* File Upload Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif,image/png,image/jpeg,image/gif"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
              />
              <div
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-400/10 border border-green-400/30 rounded-lg 
                         text-sm sm:text-base text-green-400 hover:bg-green-400/20 hover:border-green-400 hover:shadow-glow-green
                         transition-all font-semibold text-center cursor-pointer font-mono"
              >
                Upload Image (PNG, JPG, GIF)
              </div>
            </label>
            <label className="block">
              <input
                type="file"
                accept=".mp4,.webm,video/mp4,video/webm"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
              <div
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-400/10 border border-green-400/30 rounded-lg 
                         text-sm sm:text-base text-green-400 hover:bg-green-400/20 hover:border-green-400 hover:shadow-glow-green
                         transition-all font-semibold text-center cursor-pointer font-mono"
              >
                Upload Video (MP4, WEBM)
              </div>
            </label>
          </div>

          {/* Upload Error Message */}
          {uploadError && (
            <div className="p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-lg shadow-glow-red">
              <p className="text-xs sm:text-sm text-red-400 font-mono">{uploadError}</p>
            </div>
          )}

          {/* File Preview */}
          {uploadedFile && filePreviewUrl && (
            <div className="p-3 sm:p-4 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-green-400 font-mono">Uploaded File</h3>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setFilePreviewUrl(null);
                    setUploadError('');
                  }}
                  className="text-xs text-green-400/70 hover:text-green-400 transition-colors font-mono"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-green-400/70 mb-2 sm:mb-3 truncate font-mono">{uploadedFile.name}</p>
              
              {/* Image Preview */}
              {uploadedFile.type.startsWith('image/') && (
                <img
                  src={filePreviewUrl}
                  alt="Preview"
                  className="w-full rounded border border-green-400/30"
                />
              )}
              
              {/* Video Preview */}
              {uploadedFile.type.startsWith('video/') && (
                <video
                  src={filePreviewUrl}
                  controls
                  className="w-full rounded border border-green-400/30"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          {/* Hardware Attestation Panel */}
          <HardwareAttestationPanel />

          {/* Invisible Security Toggle */}
          <div className="p-3 sm:p-4 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-green-400 mb-1 font-mono">Invisible Security</h3>
                <p className="text-xs text-green-400/70 font-mono">Auto-sign when entropy reaches 100%</p>
              </div>
              <button
                onClick={() => setInvisibleMode(!invisibleMode)}
                className={`
                  relative w-14 h-7 rounded-full transition-all duration-300
                  ${invisibleMode ? 'bg-green-400' : 'bg-green-400/20'}
                `}
              >
                <div
                  className={`
                    absolute top-1 left-1 w-5 h-5 bg-black rounded-full transition-transform duration-300
                    ${invisibleMode ? 'translate-x-7' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Hardware Moat Canvas */}
        <div className="space-y-4 sm:space-y-6">
          {/* Entropy Canvas */}
          <div className="relative aspect-square bg-black border border-green-400/30 rounded-lg overflow-hidden shadow-glow-green">
            <EntropyCanvas 
              onEntropyChange={setEntropyLevel} 
              isActive={!isSigned}
              resetTrigger={resetTrigger}
            />
          </div>

          {/* Entropy Display */}
          <div className="p-3 sm:p-4 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-semibold text-green-400 font-mono">Hardware Entropy</h3>
              <span className={`text-xl sm:text-2xl font-bold font-mono ${entropyLevel === 100 ? 'animate-pulse text-green-400' : 'text-green-400/70'}`}>
                {entropyLevel}%
              </span>
            </div>
            {/* Entropy Progress Bar */}
            <div className="w-full h-2 bg-green-400/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-green-400 transition-all duration-300 ${entropyLevel === 100 ? 'animate-pulse shadow-glow-green' : ''}`}
                style={{ width: `${entropyLevel}%` }}
              />
            </div>
            <p className="text-xs text-green-400/70 mt-2 font-mono">
              {entropyLevel < 100 
                ? 'Move your mouse over the canvas to collect entropy' 
                : 'Entropy collection complete!'}
            </p>
          </div>

          {/* Sign Error Message */}
          {signError && (
            <div className="p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-lg shadow-glow-red">
              <p className="text-xs sm:text-sm text-red-400 font-mono">{signError}</p>
            </div>
          )}

          {/* Sign Button (hidden in invisible mode) */}
          {!invisibleMode && (
            <button
              onClick={handleSign}
              disabled={entropyLevel < 100 || isSigned}
              className={`
                w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 font-mono
                ${entropyLevel >= 100 && !isSigned
                  ? 'bg-green-400 text-black hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/50 shadow-glow-green cursor-pointer'
                  : 'bg-green-400/20 text-green-400/50 cursor-not-allowed border border-green-400/30'
                }
              `}
            >
              {isSigned ? 'Signed ✓' : 'Sign Content'}
            </button>
          )}

          {/* Reset Button - shown when there's content or after signing */}
          {(messageText || uploadedFile || isSigned) && (
            <button
              onClick={handleReset}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 font-mono
                       bg-green-400/10 border border-green-400/30 text-green-400 
                       hover:bg-green-400/20 hover:border-green-400 hover:shadow-glow-green"
            >
              {isSigned ? 'Create New Content' : 'Clear All'}
            </button>
          )}

          {/* Lock Animation */}
          {showLockAnimation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 animate-fadeIn">
              <div className="text-center">
                <Lock className="w-32 h-32 mx-auto text-green-400 animate-lockPulse" />
                <p className="mt-4 text-2xl font-bold text-green-400 animate-pulse">
                  Content Signed
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hardware Attestation Panel Component
function HardwareAttestationPanel() {
  return (
    <div className="p-3 sm:p-4 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
      <h3 className="text-sm sm:text-base font-semibold text-green-400 mb-2 sm:mb-3 font-mono">Hardware Attestation</h3>
      <div className="space-y-2">
        {/* Gyroscope */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-green-400/70 font-mono">Gyroscope:</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Active</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green" />
          </div>
        </div>
        {/* Touch Pressure */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-green-400/70 font-mono">Touch Pressure:</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Detected</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green" />
          </div>
        </div>
        {/* Enclave */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-green-400/70 font-mono">Enclave:</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Locked</span>
            <Lock className="w-3 h-3 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// DigitalCertificate Component
function DigitalCertificate({ certificate, isTampered, currentContent }) {
  // Hash generation function (same as in ForgeModule)
  const generateHash = (content) => {
    let hash = 0;
    const str = typeof content === 'string' ? content : `${content.name}-${content.size}-${content.type}`;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(16).padStart(16, '0');
  };

  // Calculate current hash if content is provided
  const currentHash = currentContent ? generateHash(currentContent) : null;

  // Format timestamp to readable date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Truncate hash with ellipsis
  const truncateHash = (hash) => {
    if (!hash) return 'N/A';
    if (hash.length <= 16) return hash;
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  // Determine verification status
  const verificationStatus = isTampered ? 'TAMPERED - Hash Mismatch' : 'VERIFIED';
  const statusColor = isTampered ? 'text-red-400' : 'text-green-400';

  return (
    <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-black/50 border border-green-400/30 rounded-lg space-y-2 sm:space-y-3 animate-expandCertificate shadow-glow-green">
      <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 sm:mb-3 font-mono">
        Digital Certificate
      </h4>
      
      {/* Original Content Hash */}
      <div className="space-y-1">
        <div className="text-xs text-green-400/50 uppercase tracking-wide font-mono">Original Hash</div>
        <div className={`text-sm font-mono break-all ${isTampered ? 'text-green-400/70 line-through' : 'text-green-400'}`}>
          {truncateHash(certificate.hash)}
        </div>
      </div>

      {/* Current Content Hash (shown when tampered) */}
      {isTampered && currentHash && (
        <div className="space-y-1">
          <div className="text-xs text-red-400/70 uppercase tracking-wide font-mono">Current Hash</div>
          <div className="text-sm font-mono text-red-400 break-all">
            {truncateHash(currentHash)}
          </div>
        </div>
      )}

      {/* Content Type */}
      <div className="space-y-1">
        <div className="text-xs text-green-400/50 uppercase tracking-wide font-mono">Content Type</div>
        <div className="text-sm font-mono text-green-400 capitalize">
          {certificate.contentType}
        </div>
      </div>

      {/* Timestamp */}
      <div className="space-y-1">
        <div className="text-xs text-green-400/50 uppercase tracking-wide font-mono">Timestamp</div>
        <div className="text-sm font-mono text-green-400">
          {formatTimestamp(certificate.timestamp)}
        </div>
      </div>

      {/* Proof ID */}
      <div className="space-y-1">
        <div className="text-xs text-green-400/50 uppercase tracking-wide font-mono">zk-SNARK Proof ID</div>
        <div className="text-sm font-mono text-green-400 break-all">
          {certificate.proofId}
        </div>
      </div>

      {/* Verification Status */}
      <div className="pt-3 border-t border-green-400/20">
        <div className="flex items-center justify-between">
          <div className="text-xs text-green-400/50 uppercase tracking-wide font-mono">Status</div>
          <div className={`text-sm font-bold font-mono ${statusColor}`}>
            {verificationStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

// TrustBadge Component
function TrustBadge({ isVerified, isTampered, certificate, isExpanded, onToggle, currentContent }) {
  // Don't render anything if not verified
  if (!isVerified) {
    return null;
  }

  // Determine badge state
  const isGreen = isVerified && !isTampered;
  const isRed = isTampered;

  return (
    <div className="flex flex-col items-end">
      {/* Badge Button */}
      <button
        onClick={onToggle}
        className={`
          relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-xs transition-all duration-300 font-mono
          flex items-center space-x-1 sm:space-x-2 cursor-pointer
          ${isGreen 
            ? 'bg-green-400/20 border-2 border-green-400 text-green-400 animate-scanning hover:bg-green-400/30' 
            : 'bg-red-500/20 border-2 border-red-500 text-red-400 hover:bg-red-500/30 shadow-glow-red'
          }
          ${isTampered ? 'animate-shatter' : ''}
        `}
      >
        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">
          {isGreen ? 'VERIFIED HUMAN' : 'HASH MISMATCH'}
        </span>
        <span className="sm:hidden">
          {isGreen ? 'VERIFIED' : 'TAMPERED'}
        </span>
      </button>

      {/* Expanded Certificate */}
      {isExpanded && certificate && (
        <DigitalCertificate 
          certificate={certificate} 
          isTampered={isTampered} 
          currentContent={currentContent}
        />
      )}
    </div>
  );
}

// Post Component
function Post({ post, isExpanded, onToggleCertificate, isTampered, onSimulateTamper }) {
  // Create preview URL for File objects
  const [previewUrl, setPreviewUrl] = React.useState(null);

  React.useEffect(() => {
    // Generate preview URL for File objects
    if (post.content && typeof post.content !== 'string' && post.content instanceof File) {
      const url = URL.createObjectURL(post.content);
      setPreviewUrl(url);
      
      // Cleanup function to revoke URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [post.content]);

  // Get the content URL (either string URL or generated blob URL)
  const getContentUrl = () => {
    if (typeof post.content === 'string') {
      return post.content;
    }
    return previewUrl;
  };

  return (
    <div className="p-4 sm:p-6 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-green-400 font-mono">{post.author}</h3>
          <p className="text-xs text-green-400/50 font-mono">
            {post.certificate ? new Date(post.certificate.timestamp).toLocaleString() : 'Just now'}
          </p>
        </div>
        {/* Trust Badge */}
        <TrustBadge
          isVerified={post.isVerified}
          isTampered={isTampered}
          certificate={post.certificate}
          isExpanded={isExpanded}
          onToggle={onToggleCertificate}
          currentContent={post.content}
        />
      </div>

      {/* Post Content - Render based on content type */}
      <div className="mb-3 sm:mb-4">
        {/* Text Content - Formatted text with proper whitespace handling */}
        {post.contentType === 'text' && (
          <div className="text-green-400">
            <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed font-mono">
              {post.content}
            </p>
          </div>
        )}

        {/* Image Content - Display with preview */}
        {post.contentType === 'image' && post.content && (
          <div className="relative">
            <img
              src={getContentUrl()}
              alt="Post content"
              className={`w-full rounded-lg border border-green-400/30 object-cover ${
                isTampered ? 'filter grayscale contrast-125 brightness-75' : ''
              }`}
              onError={(e) => {
                console.error('Image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Video Content - Display with player controls */}
        {post.contentType === 'video' && post.content && (
          <div className="relative">
            <video
              src={getContentUrl()}
              controls
              className={`w-full rounded-lg border border-green-400/30 ${
                isTampered ? 'filter hue-rotate-180 saturate-150' : ''
              }`}
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Simulate Tamper Button - Only show for verified posts that haven't been tampered */}
      {post.isVerified && !isTampered && (
        <button
          onClick={() => onSimulateTamper(post.id)}
          className="w-full px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg 
                   text-red-400 hover:bg-red-500/20 hover:border-red-500 hover:shadow-glow-red
                   transition-all font-semibold text-xs sm:text-sm font-mono"
        >
          Simulate Tamper
        </button>
      )}
    </div>
  );
}

// FeedModule Component
function FeedModule({ userContent }) {
  // State management
  const [posts, setPosts] = useState([]);
  const [expandedCertId, setExpandedCertId] = useState(null);
  const [tamperedPostIds, setTamperedPostIds] = useState(new Set());

  // Initialize posts with mock data
  useEffect(() => {
    const mockPosts = [
      // Post 1: AI bot (no badge)
      {
        id: 'post-1',
        author: 'AI_ContentBot_3000',
        content: 'Check out this amazing new product! 🤖 #ad #sponsored #definitely-not-a-bot',
        contentType: 'text',
        isVerified: false,
        certificate: null,
        originalContent: 'Check out this amazing new product! 🤖 #ad #sponsored #definitely-not-a-bot'
      },
      // Post 2: Verified human (with badge)
      {
        id: 'post-2',
        author: 'Sarah_Chen',
        content: 'Just finished my morning run! The sunrise was absolutely beautiful today. 🌅',
        contentType: 'text',
        isVerified: true,
        certificate: {
          hash: 'a3f5d8c2e1b4f7a9',
          contentType: 'text',
          timestamp: Date.now() - 3600000, // 1 hour ago
          proofId: 'zkp-verified-human-12345'
        },
        originalContent: 'Just finished my morning run! The sunrise was absolutely beautiful today. 🌅'
      }
    ];

    // Post 3: User content (conditional)
    if (userContent) {
      mockPosts.push({
        id: 'post-3',
        author: 'You',
        content: userContent.content,
        contentType: userContent.contentType,
        isVerified: true,
        certificate: {
          hash: userContent.contentHash,
          contentType: userContent.contentType,
          timestamp: userContent.timestamp,
          proofId: userContent.proofId
        },
        originalContent: userContent.content // Store for tamper detection
      });
    }

    setPosts(mockPosts);
  }, [userContent]);

  // Toggle certificate expansion
  const handleToggleCertificate = (postId) => {
    setExpandedCertId(expandedCertId === postId ? null : postId);
  };

  // Simulate tamper functionality
  const handleSimulateTamper = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          let tamperedContent;
          
          // Text tampering: append [HACKED] or change words
          if (post.contentType === 'text') {
            // Randomly choose between appending [HACKED] or changing words
            if (Math.random() > 0.5) {
              tamperedContent = post.content + ' [HACKED]';
            } else {
              // Change some words in the text
              const words = post.content.split(' ');
              if (words.length > 3) {
                const randomIndex = Math.floor(Math.random() * (words.length - 1));
                words[randomIndex] = 'TAMPERED';
              }
              tamperedContent = words.join(' ');
            }
          } 
          // Image tampering: content stays the same, visual filter applied via CSS
          else if (post.contentType === 'image') {
            tamperedContent = post.content; // CSS filter will be applied in Post component
          }
          // Video tampering: content stays the same, visual filter applied via CSS
          else if (post.contentType === 'video') {
            tamperedContent = post.content; // CSS filter will be applied in Post component
          }
          
          return {
            ...post,
            content: tamperedContent
          };
        }
        return post;
      })
    );
    
    // Add post ID to tamperedPostIds set
    setTamperedPostIds(prev => new Set([...prev, postId]));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-400 font-mono">The Reality Stamp</h2>
        <p className="text-sm sm:text-base text-green-400/70 font-mono">Social feed with Trust Badges for verified content</p>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 sm:space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            isExpanded={expandedCertId === post.id}
            onToggleCertificate={() => handleToggleCertificate(post.id)}
            isTampered={tamperedPostIds.has(post.id)}
            onSimulateTamper={handleSimulateTamper}
          />
        ))}

        {/* Placeholder when no user content exists */}
        {!userContent && (
          <div className="p-6 sm:p-8 bg-green-400/5 border border-green-400/30 border-dashed rounded-lg text-center shadow-glow-green">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-green-400/50" />
            <h3 className="text-sm sm:text-base font-semibold text-green-400 mb-2 font-mono">Your Content Will Appear Here</h3>
            <p className="text-xs sm:text-sm text-green-400/70 font-mono">
              Sign content in The Hardware Moat to see it appear in the feed with a Trust Badge
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// PrivacyModule Component
function PrivacyModule() {
  // Animation state management
  const [animationPlayed, setAnimationPlayed] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    // Small delay to ensure component is mounted before starting animation
    const timer = setTimeout(() => {
      setAnimationPlayed(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-400 font-mono">Privacy X-Ray</h2>
        <p className="text-sm sm:text-base text-green-400/70 font-mono">Understanding zero-knowledge proofs and data privacy</p>
      </div>

      {/* Split-screen diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-center relative">
        {/* Left Panel - User Device (Private) */}
        <div className="p-6 sm:p-8 bg-green-400/5 border-2 border-green-400/30 rounded-lg min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center relative overflow-visible shadow-glow-green">
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6 text-center font-mono">
            User Device
            <span className="block text-xs sm:text-sm font-normal text-green-400/70 mt-1">(Private)</span>
          </h3>
          
          {/* Private Data Icons */}
          <div className="space-y-4 sm:space-y-6 w-full">
            {/* Biometric Data Icon */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-400/10 rounded-lg border border-green-400/30 relative shadow-glow-green">
              <Fingerprint className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Biometric Data</span>
              {/* Lock icon appears after animation */}
              {animationPlayed && (
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 absolute -right-1 sm:-right-2 -top-1 sm:-top-2 animate-fadeIn" />
              )}
            </div>
            
            {/* Location Icon */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-400/10 rounded-lg border border-green-400/30 relative shadow-glow-green">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Location</span>
              {/* Lock icon appears after animation */}
              {animationPlayed && (
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 absolute -right-1 sm:-right-2 -top-1 sm:-top-2 animate-fadeIn" />
              )}
            </div>
          </div>
        </div>

        {/* Center - Data Firewall */}
        <div className="flex flex-col items-center justify-center min-h-[100px] lg:min-h-[400px] relative my-4 lg:my-0">
          <div className="relative">
            {/* Firewall visualization - horizontal on mobile, vertical on desktop */}
            <div className="lg:w-1 lg:h-64 w-64 h-1 bg-gradient-to-r lg:bg-gradient-to-b from-red-500 via-orange-500 to-red-500 rounded-full shadow-lg shadow-red-500/50">
              {/* Animated glow effect */}
              <div className="absolute inset-0 lg:w-1 lg:h-64 w-64 h-1 bg-gradient-to-r lg:bg-gradient-to-b from-red-500 via-orange-500 to-red-500 rounded-full blur-sm animate-pulse" />
            </div>
            
            {/* Firewall label */}
            <div className="absolute -bottom-8 lg:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
                Data Firewall
              </span>
            </div>
          </div>

          {/* Animated Icons Moving Toward/Through Firewall */}
          {animationPlayed && (
            <>
              {/* Biometric Data - moves toward firewall and stops */}
              <div className="absolute top-16 left-0 animate-biometricMove">
                <Fingerprint className="w-6 h-6 text-green-400 opacity-50" />
              </div>

              {/* Location - moves toward firewall and stops */}
              <div className="absolute top-32 left-0 animate-locationMove">
                <MapPin className="w-6 h-6 text-green-400 opacity-50" />
              </div>

              {/* Math Proof - passes through firewall */}
              <div className="absolute top-24 left-0 animate-mathProofMove">
                <Calculator className="w-6 h-6 text-green-400" />
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Public Ledger (Public) */}
        <div className="p-6 sm:p-8 bg-green-400/5 border-2 border-green-400/30 rounded-lg min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center shadow-glow-green">
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6 text-center font-mono">
            Public Ledger
            <span className="block text-xs sm:text-sm font-normal text-green-400/70 mt-1">(Public)</span>
          </h3>
          
          {/* Math Proof Icon */}
          <div className="space-y-4 sm:space-y-6 w-full">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-400/10 rounded-lg border border-green-400/30 shadow-glow-green">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              <span className="text-xs sm:text-sm font-semibold text-green-400 font-mono">Math Proof</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Text */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-400/5 border border-green-400/30 rounded-lg shadow-glow-green">
        <h4 className="text-sm sm:text-base font-bold text-green-400 mb-2 sm:mb-3 font-mono">How Zero-Knowledge Proofs Protect Your Privacy</h4>
        <p className="text-xs sm:text-sm text-green-400/70 leading-relaxed font-mono">
          Your sensitive biometric data and location information stay locked on your device. 
          Only a mathematical proof passes through the firewall to the public ledger, 
          proving you're human without revealing any personal information.
        </p>
      </div>
    </div>
  );
}

export default App;
