'use client'

import { useState } from 'react'
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring'

interface PerformanceMonitorProps {
  showDebugInfo?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function PerformanceMonitor({ 
  showDebugInfo = false,
  position = 'top-right' 
}: PerformanceMonitorProps) {
  const { 
    metrics, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring,
    getPerformanceAnalysis,
    exportPerformanceData,
    clearPerformanceLog
  } = usePerformanceMonitoring()

  const [showDetails, setShowDetails] = useState(false)
  const analysis = getPerformanceAnalysis()

  if (!showDebugInfo) return null

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white text-sm font-mono max-w-sm`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Performance Monitor</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-white/60 hover:text-white"
        >
          {showDetails ? '−' : '+'}
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 45 ? 'text-red-400' : 'text-green-400'}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Frame Time:</span>
          <span>{metrics.frameTime.toFixed(1)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span>Active Animations:</span>
          <span>{metrics.animationCount}</span>
        </div>

        <div className="flex justify-between">
          <span>Performance Score:</span>
          <span className={getPerformanceColor(analysis.performanceScore)}>
            {analysis.performanceScore.toFixed(0)}%
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
          <div className="flex justify-between">
            <span>Memory:</span>
            <span>{metrics.memoryUsage?.toFixed(1) || 'N/A'}MB</span>
          </div>
          
          <div className="flex justify-between">
            <span>Avg Frame Time:</span>
            <span>{metrics.averageFrameTime.toFixed(1)}ms</span>
          </div>
          
          <div className="flex justify-between">
            <span>Total Animations:</span>
            <span>{analysis.totalAnimations}</span>
          </div>

          {analysis.recommendations.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="text-yellow-400 text-xs mb-1">Recommendations:</div>
              {analysis.recommendations.slice(0, 2).map((rec, index) => (
                <div key={index} className="text-xs text-white/70 mb-1">
                  • {rec}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              className={`px-2 py-1 text-xs rounded ${
                isMonitoring 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isMonitoring ? 'Stop' : 'Start'}
            </button>
            
            <button
              onClick={exportPerformanceData}
              className="px-2 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700"
            >
              Export
            </button>
            
            <button
              onClick={clearPerformanceLog}
              className="px-2 py-1 text-xs rounded bg-gray-600 hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 