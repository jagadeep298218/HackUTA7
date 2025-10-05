import React, { useState, useRef, useEffect } from 'react'

interface DraggableSpiderManProps {
  message: string
  isLoading: boolean
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  onRunCode: () => void
}

const DraggableSpiderMan: React.FC<DraggableSpiderManProps> = ({
  message,
  isLoading,
  showDialog,
  setShowDialog,
  onRunCode
}) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 320 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showBubble, setShowBubble] = useState(false)
  const mascotRef = useRef<HTMLDivElement>(null)

  // Show text bubble when there's a new message
  useEffect(() => {
    if (message && !isLoading) {
      setShowBubble(true)
      // Hide bubble after 5 seconds
      const timer = setTimeout(() => setShowBubble(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [message, isLoading])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === mascotRef.current || (mascotRef.current && mascotRef.current.contains(e.target as Node))) {
      const rect = mascotRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
        setIsDragging(true)
      }
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      // Keep mascot within screen bounds
      const maxX = window.innerWidth - 160
      const maxY = window.innerHeight - 160
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isDragging) {
      setShowDialog(true)
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <>
      {/* Text Bubble */}
      {showBubble && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x - 200,
            top: position.y - 80,
            maxWidth: '300px'
          }}
        >
          <div className="bg-white rounded-lg p-4 shadow-2xl border-2 border-spiderman-red relative">
            {/* Bubble tail */}
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-spiderman-red"></div>
            <div className="absolute -bottom-1 right-9 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white"></div>
            
            <p className="text-gray-800 text-sm leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Draggable Mascot */}
      <div
        ref={mascotRef}
        className={`fixed z-40 cursor-move select-none transition-transform duration-200 ${
          isDragging ? 'scale-110' : 'scale-100 hover:scale-105'
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleMascotClick}
      >
        <div className="relative">
          {/* Spider-Man Avatar */}
          <div className="w-32 h-32 flex items-center justify-center shadow-2xl transition-all duration-300">
            {isLoading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <img
                src={showBubble ? "/speaking_pose.png" : "/standard_pose.png"}
                alt="Spider-Man Mascot"
                className={`w-full h-full object-contain transition-all duration-300 hover:scale-105 ${
                  showBubble ? 'animate-pulse' : ''
                }`}
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  imageRendering: 'crisp-edges'
                }}
                onError={(e) => {
                  // Fallback if images don't exist
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">SM</div>';
                }}
              />
            )}
          </div>
          
        </div>
      </div>

      {/* Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-4 border-spiderman-red">
            {/* Dialog header */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center mr-4">
                <img
                  src="/speaking_pose.png"
                  alt="Spider-Man"
                  className="w-full h-full object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                    imageRendering: 'crisp-edges'
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white text-lg font-bold">SM</div>';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-spiderman-red">Spider-Man Coach</h3>
                <p className="text-sm text-gray-600">Your Friendly DSA Mentor</p>
              </div>
            </div>

            {/* Dialog content */}
            <div className="mb-6">
              <p className="text-gray-800 text-lg mb-4">How can I help you, hero?</p>
              
              <div className="space-y-3">
                <button
                  onClick={onRunCode}
                  className="w-full bg-spiderman-red hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 spiderman-glitch"
                >
                  Analyze My Code
                </button>
                
                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Dialog footer */}
            <div className="text-center text-sm text-gray-500">
              <p>"With great power comes great responsibility!"</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DraggableSpiderMan
