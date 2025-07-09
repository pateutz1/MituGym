'use client';

import { useState } from 'react';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring';

interface PerformanceMonitorProps {
  showDebugInfo?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function PerformanceMonitor({
  showDebugInfo = false,
  position = 'top-right',
}: PerformanceMonitorProps) {
  const {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getPerformanceAnalysis,
    exportPerformanceData,
    clearPerformanceLog,
  } = usePerformanceMonitoring();

  const [showDetails, setShowDetails] = useState(false);
  const analysis = getPerformanceAnalysis();

  if (!showDebugInfo) {
    return null;
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) {
      return 'text-green-400';
    }
    if (score >= 60) {
      return 'text-yellow-400';
    }
    return 'text-red-400';
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 max-w-sm rounded-lg border border-white/20 bg-black/80 p-4 font-mono text-sm text-white backdrop-blur-sm`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Performance Monitor</h3>
        <button
          className="text-white/60 hover:text-white"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '−' : '+'}
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span
            className={metrics.fps < 45 ? 'text-red-400' : 'text-green-400'}
          >
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
        <div className="mt-4 space-y-2 border-white/20 border-t pt-4">
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
            <div className="mt-2 border-white/20 border-t pt-2">
              <div className="mb-1 text-xs text-yellow-400">
                Recommendations:
              </div>
              {analysis.recommendations.slice(0, 2).map((rec, index) => (
                <div className="mb-1 text-white/70 text-xs" key={index}>
                  • {rec}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              className={`rounded px-2 py-1 text-xs ${
                isMonitoring
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
            >
              {isMonitoring ? 'Stop' : 'Start'}
            </button>

            <button
              className="rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700"
              onClick={exportPerformanceData}
            >
              Export
            </button>

            <button
              className="rounded bg-gray-600 px-2 py-1 text-xs hover:bg-gray-700"
              onClick={clearPerformanceLog}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
