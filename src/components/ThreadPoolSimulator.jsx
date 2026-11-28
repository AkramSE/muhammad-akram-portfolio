import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, RotateCcw, Zap, Layers } from 'lucide-react';

export default function ThreadPoolSimulator() {
  const [workerCount, setWorkerCount] = useState(4);
  const [totalTasks, setTotalTasks] = useState(12);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [workers, setWorkers] = useState([]);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    setWorkers(
      Array.from({ length: workerCount }, (_, idx) => ({
        id: idx + 1,
        status: 'IDLE',
        currentTask: null,
        processed: 0,
      }))
    );
    setCompleted(0);
    setElapsedMs(0);
    setRunning(false);
  }, [workerCount, totalTasks]);

  useEffect(() => {
    if (!running) return;

    const startTime = Date.now() - elapsedMs;
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTime);

      setCompleted((prevCompleted) => {
        if (prevCompleted >= totalTasks) {
          setRunning(false);
          setWorkers((prev) =>
            prev.map((w) => ({ ...w, status: 'IDLE', currentTask: null }))
          );
          return totalTasks;
        }

        const remaining = totalTasks - prevCompleted;
        const batch = Math.min(workerCount, remaining);

        setWorkers((prevWorkers) =>
          prevWorkers.map((w, idx) => {
            if (idx < batch) {
              return {
                ...w,
                status: 'EXECUTING',
                currentTask: `Task-${prevCompleted + idx + 1}`,
                processed: w.processed + 1,
              };
            }
            return { ...w, status: 'IDLE', currentTask: null };
          })
        );

        return prevCompleted + batch;
      });
    }, 550);

    return () => clearInterval(interval);
  }, [running, workerCount, totalTasks]);

  const handleReset = () => {
    setRunning(false);
    setCompleted(0);
    setElapsedMs(0);
    setWorkers(
      Array.from({ length: workerCount }, (_, idx) => ({
        id: idx + 1,
        status: 'IDLE',
        currentTask: null,
        processed: 0,
      }))
    );
  };

  const progress = Math.round((completed / totalTasks) * 100);
  const sequentialEstimate = totalTasks * 550;
  const speedup = elapsedMs > 0 ? (sequentialEstimate / Math.max(elapsedMs, 550)).toFixed(2) : `${workerCount}.00`;

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-cyan-500/20 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" />
            INTERACTIVE PDC LAB DEMO • JAVA EXECUTORSERVICE
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white">
            Parallel Thread-Pool &amp; Task Throughput Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Adjust worker threads and task queue size to observe concurrent batch execution and parallel speedup.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (completed >= totalTasks) handleReset();
              setRunning(true);
            }}
            disabled={running}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4" />
            {running ? 'Dispatching...' : completed >= totalTasks ? 'Run Again' : 'Execute Pool'}
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-mono text-slate-400 flex justify-between">
            <span>WORKER THREADS</span>
            <span className="text-cyan-400 font-bold">{workerCount} Threads</span>
          </label>
          <input
            type="range"
            min="1"
            max="8"
            value={workerCount}
            disabled={running}
            onChange={(e) => setWorkerCount(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-mono text-slate-400 flex justify-between">
            <span>QUEUE PAYLOAD</span>
            <span className="text-indigo-400 font-bold">{totalTasks} Tasks</span>
          </label>
          <input
            type="range"
            min="4"
            max="24"
            step="4"
            value={totalTasks}
            disabled={running}
            onChange={(e) => setTotalTasks(Number(e.target.value))}
            className="w-full mt-3 accent-indigo-400 cursor-pointer"
          />
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> QUEUE COMPLETION
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-display font-bold text-white">
              {completed}/{totalTasks}
            </span>
            <span className="text-xs font-mono text-cyan-400">{progress}%</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> PARALLEL SPEEDUP
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-display font-bold text-emerald-400">
              {speedup}x
            </span>
            <span className="text-xs font-mono text-slate-400">{(elapsedMs / 1000).toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-6 border border-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Worker Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {workers.map((w) => {
          const active = w.status === 'EXECUTING';
          return (
            <motion.div
              key={w.id}
              layout
              className={`rounded-xl p-3.5 border transition-colors ${
                active
                  ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_25px_-5px_rgba(34,211,238,0.3)]'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">pool-1-thread-{w.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    active ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {w.status}
                </span>
              </div>
              <div className="mt-2.5 text-xs font-mono text-slate-400 truncate">
                {active ? (
                  <span className="text-cyan-300">Running: {w.currentTask}</span>
                ) : (
                  <span>Awaiting Runnable...</span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
                Completed: {w.processed}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}