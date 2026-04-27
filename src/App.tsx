import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Star, 
  Play, 
  Lock, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Timer, 
  LogOut,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  User,
  Settings,
  Camera,
  LayoutGrid
} from 'lucide-react';
import { LEVELS, LEADERBOARD_DATA } from './constants';
import { QuestionType, UserProgress, Level, Question } from './types';

// Moved outside to prevent re-creation on every App render
const HomeView = ({ setView }: { setView: (v: any) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-2 gap-12 items-center"
  >
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 bg-secondary-container/30 text-secondary px-4 py-2 rounded-full border border-secondary/10">
        <TrendingUp className="w-4 h-4" />
        <span className="text-xs font-bold font-display uppercase tracking-wider">Level up your learning</span>
      </div>
      <h1 className="font-display text-5xl md:text-7xl font-extrabold text-on-surface leading-tight">
        Unlock Your Potential <br />
        One <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-4 pointer-events-none">Puzzle</span> at a Time.
      </h1>
      <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
        The ultimate school-safe platform to master critical thinking through engaging puzzles. Turn every challenge into a journey of discovery.
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <button 
          onClick={() => setView('levels')}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
        >
          Start Learning
        </button>
        <button className="bg-surface-container-highest text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-surface-container-high transition-all active:scale-95">
          How It Works
        </button>
      </div>
      <div className="flex items-center gap-4 pt-4">
        <div className="flex -space-x-3">
          {[1, 2, 3].map(i => (
            <img 
              key={i}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
              className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed"
              alt="Student"
            />
          ))}
        </div>
        <span className="text-sm font-medium text-on-surface-variant">Joined by 12,000+ students this month</span>
      </div>
    </div>
    <div className="relative">
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <img 
        src="https://images.unsplash.com/photo-1620712943543-bcc4628c71d5?q=80&w=2545&auto=format&fit=crop"
        alt="Student Solving Puzzle"
        className="relative z-10 w-full rounded-3xl shadow-2xl border-8 border-white object-cover aspect-[4/3]"
      />
      <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-surface-container-highest flex items-center gap-4">
        <div className="bg-tertiary-fixed text-tertiary p-3 rounded-2xl">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Achievement</p>
          <p className="text-xl font-extrabold text-on-surface">Logic Master</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const LevelsView = ({ progress, startLevel }: { progress: UserProgress, startLevel: (l: Level) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="max-w-7xl mx-auto px-6 py-12"
  >
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-display font-extrabold text-on-surface">Choose Your Quest</h2>
        <p className="text-on-surface-variant italic">"Adventure is worthwhile in itself." – Amelia Earhart</p>
      </div>
      <div className="bg-surface-container p-4 rounded-3xl border border-primary/5 flex items-center gap-8">
        <div className="text-center">
          <span className="block text-xs font-bold text-on-surface-variant uppercase">Unlocked</span>
          <span className="text-2xl font-black text-primary">{progress.unlockedLevels.length}</span>
        </div>
        <div className="w-px h-8 bg-outline-variant" />
        <div className="text-center">
          <span className="block text-xs font-bold text-on-surface-variant uppercase">Completed</span>
          <span className="text-2xl font-black text-secondary">{progress.completedLevels.length}</span>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {LEVELS.map(level => {
        const isUnlocked = progress.unlockedLevels.includes(level.id);
        const isCompleted = progress.completedLevels.includes(level.id);

        return (
          <motion.div 
            key={level.id}
            whileHover={isUnlocked ? { y: -8 } : {}}
            className={`p-1 rounded-3xl transition-all ${isUnlocked ? 'bg-white shadow-lg border border-surface-container-highest' : 'bg-surface-container-low opacity-60 grayscale'}`}
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isUnlocked ? 'bg-primary-fixed text-primary' : 'bg-outline-variant text-on-surface-variant'}`}>
                  {isUnlocked ? <Trophy className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                </div>
                {isCompleted && (
                  <div className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-on-surface">Level {level.id}: {level.title}</h3>
                <p className="text-on-surface-variant text-sm mt-2">{level.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-bold ${level.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {level.difficulty}
                </span>
                <span className="text-on-surface-variant flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  {isCompleted ? '3/3' : '0/3'}
                </span>
              </div>
              
              {isUnlocked ? (
                <button 
                  onClick={() => startLevel(level)}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {isCompleted ? 'Replay' : 'Play Level'}
                </button>
              ) : (
                <div className="bg-surface-container text-on-surface-variant py-4 rounded-2xl font-bold text-center">
                  Level Locked
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const GameView = ({ 
  activeLevel, 
  currentQuestionIdx, 
  timeLeft, 
  sessionScore, 
  showFeedback, 
  handleAnswer, 
  nextQuestion, 
  setView 
}: { 
  activeLevel: Level, 
  currentQuestionIdx: number, 
  timeLeft: number, 
  sessionScore: number, 
  showFeedback: any, 
  handleAnswer: (a: string | null) => void, 
  nextQuestion: () => void, 
  setView: (v: any) => void,
  key?: string
}) => {
  const currentQ = activeLevel.questions[currentQuestionIdx];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8"
    >
      <div className="bg-white rounded-3xl p-6 border border-surface-container-highest shadow-sm grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-sm text-on-surface-variant">Question {currentQuestionIdx + 1} of {activeLevel.questions.length}</span>
            <span className="font-bold text-xs text-secondary uppercase tracking-wider">{Math.round(((currentQuestionIdx + 1) / activeLevel.questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIdx + 1) / activeLevel.questions.length) * 100}%` }}
              className="h-full bg-secondary rounded-full relative"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-colors ${timeLeft < 20 ? 'bg-error-container text-error border-error/20' : 'bg-surface-container text-primary border-primary/10'}`}>
            <Timer className="w-5 h-5" />
            <span className="text-2xl font-black font-display tabular-nums">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Time Remaining</span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Current Score</span>
            <span className="block text-2xl font-black font-display text-primary">{sessionScore}</span>
          </div>
          <div className="bg-tertiary-fixed text-tertiary p-3 rounded-2xl">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-surface-container-highest relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-on-surface mb-10 leading-tight">
            {currentQ.text}
          </h2>

          <div className="grid gap-4">
            {currentQ.options?.map((option, i) => (
              <button
                key={i}
                disabled={!!showFeedback}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-6 rounded-2xl border-2 font-bold text-lg transition-all group flex items-center justify-between
                  ${showFeedback 
                    ? option === currentQ.correctAnswer 
                      ? 'bg-secondary-container/10 border-secondary text-secondary' 
                      : showFeedback.isCorrect ? 'bg-white border-surface-container-highest opacity-40' : 'bg-white border-outline-variant opacity-60'
                    : 'bg-white border-surface-container-highest hover:border-primary hover:bg-primary/5 active:scale-[0.99]'
                  }
                `}
              >
                <span>{option}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${!showFeedback && 'group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-10 p-8 rounded-3xl border-2 flex flex-col md:flex-row items-center gap-6 ${showFeedback.isCorrect ? 'bg-secondary-container/10 border-secondary/20 text-secondary' : 'bg-error-container/10 border-error/20 text-error'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg ${showFeedback.isCorrect ? 'bg-secondary text-white' : 'bg-error text-white'}`}>
                  {showFeedback.isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <p className="text-2xl font-display font-black">{showFeedback.isCorrect ? 'Correct Answer!' : 'Not Quite Right'}</p>
                  <p className="text-on-surface-variant font-medium leading-relaxed">{showFeedback.explanation}</p>
                </div>
                <button 
                  onClick={nextQuestion}
                  className={`px-10 py-4 rounded-xl font-black text-lg flex items-center gap-2 shadow-xl hover:-translate-y-1 transition-all active:scale-95 ${showFeedback.isCorrect ? 'bg-secondary text-white' : 'bg-error text-white'}`}
                >
                  {currentQuestionIdx < activeLevel.questions.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container p-8 rounded-[2rem] border border-primary/5">
            <h3 className="text-xl font-display font-black text-primary mb-4 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6" />
              Study Tip
            </h3>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              Take your time to read the full question. Every detail matters when solving these logic paths!
            </p>
          </div>
          {!showFeedback && (
            <div className="bg-tertiary-container/10 p-8 rounded-[2rem] border border-tertiary/20">
              <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">Need a lift?</p>
              <button className="w-full bg-white text-tertiary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-tertiary-fixed transition-colors">
                <Star className="w-4 h-4 fill-current" />
                Use Hint (2 Left)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl backdrop-blur-sm">
        <button 
          onClick={() => setView('levels')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-error/30 text-error font-bold hover:bg-error-container/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Quit Session
        </button>
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">
          Curious minds never stop exploring
        </p>
      </div>
    </motion.div>
  );
};

const ResultsView = ({ activeLevel, sessionScore, sessionCorrectCount, setView, startLevel }: { 
  activeLevel: Level, 
  sessionScore: number, 
  sessionCorrectCount: number, 
  setView: (v: any) => void, 
  startLevel: (l: Level) => void,
  key?: string
}) => {
  const accuracy = Math.round((sessionCorrectCount / activeLevel.questions.length) * 100);
  const grade = accuracy >= 90 ? 'A+' : accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : 'C';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto px-6 py-12 text-center"
    >
      <div className="bg-white rounded-[3rem] shadow-2xl p-12 border border-surface-container-highest relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="w-24 h-24 bg-tertiary-fixed rounded-full flex items-center justify-center mx-auto shadow-xl shadow-tertiary/10">
            <Trophy className="w-12 h-12 text-tertiary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-display font-black text-primary">Level Complete!</h1>
            <p className="text-xl text-on-surface-variant font-medium">"Keep curious, your potential is limitless!"</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 py-8">
            <div className="bg-surface-container p-8 rounded-3xl border border-primary/5">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Final Score</p>
              <p className="text-4xl font-black text-on-surface">{sessionScore}<span className="text-lg text-primary">pts</span></p>
            </div>
            <div className="bg-secondary-container p-8 rounded-3xl border border-secondary/10">
              <p className="text-xs font-bold text-on-secondary-container uppercase tracking-widest mb-2">Grade</p>
              <p className="text-5xl font-black text-on-secondary-container">{grade}</p>
            </div>
            <div className="bg-surface-container-high p-8 rounded-3xl border border-primary/5 flex flex-col justify-center gap-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-secondary flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Correct</span>
                <span className="text-on-surface">{sessionCorrectCount}</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${accuracy}%` }} />
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-error flex items-center gap-1"><XCircle className="w-4 h-4" /> Incorrect</span>
                <span className="text-on-surface">{activeLevel.questions.length - sessionCorrectCount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setView('levels')}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
            >
              Go to Map
              <ChevronRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => startLevel(activeLevel)}
              className="bg-surface-container-highest text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-surface-container-high transition-all active:scale-95 flex items-center gap-3"
            >
              <RotateCcw className="w-6 h-6" />
              Retry
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LeaderboardView = ({ progress, setView }: { progress: UserProgress, setView: (v: any) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="max-w-4xl mx-auto px-6 py-12"
  >
    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-surface-container-highest">
      <div className="p-10 border-b border-surface-container-highest flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-tertiary-fixed text-tertiary p-3 rounded-2xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-display font-black text-on-surface">Global Rankings</h2>
        </div>
        <div className="bg-surface-container px-5 py-2 rounded-full text-xs font-bold text-on-surface-variant uppercase tracking-widest">
          Weekly Leaderboard
        </div>
      </div>
      <div className="divide-y divide-surface-container">
        {LEADERBOARD_DATA.map((scorer, i) => (
          <div key={scorer.id} className="flex items-center gap-6 p-8 hover:bg-surface-container-low transition-colors group">
            <div className="w-12 text-center text-3xl font-black text-outline-variant group-hover:text-primary transition-colors">
              {(i + 1).toString().padStart(2, '0')}
            </div>
            <img src={scorer.avatar} alt={scorer.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-surface-container-highest group-hover:border-primary transition-colors" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-on-surface">{scorer.name}</h3>
              <p className="text-sm font-medium text-secondary">Level {scorer.level} • {scorer.title}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-on-surface font-display">{scorer.points.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Total Points</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-6 p-8 bg-primary/5 hover:bg-primary/10 transition-colors group relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-r-md">YOU</div>
          <div className="w-12 text-center text-3xl font-black text-primary">04</div>
          <img 
            src={progress.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=Player`} 
            alt="Avatar" 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary transition-colors bg-primary-fixed" 
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-on-surface">{progress.username || 'You (The Explorer)'}</h3>
            <p className="text-sm font-medium text-secondary">Level {progress.completedLevels.length + 1} • {progress.totalXp > 500 ? 'Pro' : 'Apprentice'}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-on-surface font-display">{progress.totalXp.toLocaleString()}</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Total Points</p>
          </div>
        </div>
      </div>
      <div className="p-8 text-center bg-surface-container-low">
        <button onClick={() => setView('home')} className="text-primary font-bold text-sm hover:underline underline-offset-4 flex items-center gap-2 mx-auto">
          Return to Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ProfileView = ({ progress, saveProgress, setView }: { progress: UserProgress, saveProgress: (p: UserProgress) => void, setView: (v: any) => void, key?: string }) => {
  const [name, setName] = useState(progress.username || '');
  const [avatarSeed, setAvatarSeed] = useState(progress.username || 'Explorer');
  
  const handleSave = () => {
    const newProgress = {
      ...progress,
      username: name,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`
    };
    saveProgress(newProgress);
    setView('home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto px-6 py-12"
    >
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-surface-container-highest">
        <div className="bg-primary/5 p-10 text-center border-b border-surface-container-highest relative">
          <div className="relative inline-block">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} 
              alt="Avatar Preview" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white"
            />
            <button 
              onClick={() => setAvatarSeed(Math.random().toString())}
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <h2 className="mt-6 text-3xl font-display font-black text-on-surface">Customize Profile</h2>
        </div>
        
        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest pl-1">Student Username</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container px-6 py-4 rounded-2xl border-2 border-transparent focus:border-primary outline-none font-bold text-lg transition-all"
              placeholder="Enter your name..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container p-4 rounded-3xl border border-primary/5 text-center">
              <Trophy className="w-5 h-5 text-tertiary mx-auto mb-1" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">XP</p>
              <p className="text-xl font-black text-on-surface">{progress.totalXp}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-3xl border border-primary/5 text-center">
              <Star className="w-5 h-5 text-primary mx-auto mb-1" fill="currentColor" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Stars</p>
              <p className="text-xl font-black text-on-surface">{progress.stars}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-3xl border border-primary/5 text-center">
              <GraduationCap className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Level</p>
              <p className="text-xl font-black text-on-surface">{progress.completedLevels.length + 1}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleSave}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
            >
              Save Changes
            </button>
            <button 
              onClick={() => setView('home')}
              className="w-full text-on-surface-variant py-2 font-bold hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
    <footer className="bg-white border-t border-surface-container-highest mt-auto">
      <div className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-on-surface font-display">PuzzleAcademia</span>
          <p className="text-xs text-on-surface-variant">© 2026 PuzzleAcademia. Safe, Smart Learning.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary hover:underline">Privacy Policy</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary hover:underline">Safety Guide</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );

const Header = ({ totalXp, stars, avatarUrl, onNavigate }: { totalXp: number, stars: number, avatarUrl?: string, onNavigate: (view: any) => void }) => (
  <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-surface-container-highest sticky top-0 z-50">
    <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => onNavigate('home')}
          className="text-2xl font-extrabold text-primary tracking-tighter font-display cursor-pointer"
        >
          PuzzleAcademia
        </button>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="font-display text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Home</button>
          <button onClick={() => onNavigate('levels')} className="font-display text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Levels</button>
          <button onClick={() => onNavigate('leaderboard')} className="font-display text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Leaderboard</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-2xl border border-primary/10">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-tertiary" />
            <span className="font-bold text-sm">{totalXp} XP</span>
          </div>
          <div className="w-px h-4 bg-outline-variant" />
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="font-bold text-sm">{stars}</span>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 bg-primary text-white pl-2 pr-4 py-1.5 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
        >
          <img 
            src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=Player`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border-2 border-white/20 bg-primary-fixed shrink-0"
          />
          <span className="hidden xs:inline">Profile</span>
        </button>
      </div>
    </nav>
  </header>
);

export default function App() {
  const [view, setView] = useState<'home' | 'levels' | 'playing' | 'results' | 'leaderboard' | 'profile'>('home');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('puzzle_academia_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    return {
      unlockedLevels: [1],
      completedLevels: [],
      scores: {},
      totalXp: 0,
      stars: 0,
      username: 'Explorer',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Explorer`
    };
  });

  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{ isCorrect: boolean, explanation: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(180);

  const saveProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('puzzle_academia_progress', JSON.stringify(newProgress));
  }, []);

  // Cleanup state when leaving playing view
  useEffect(() => {
    if (view !== 'playing') {
      setShowFeedback(null);
    }
  }, [view]);

  const handleAnswer = useCallback((answer: string | null) => {
    if (!activeLevel) return;
    const currentQ = activeLevel.questions[currentQuestionIdx];
    const isCorrect = answer === currentQ.correctAnswer;

    if (isCorrect) {
      setSessionScore(prev => prev + 100);
      setSessionCorrectCount(prev => prev + 1);
    } else {
      setSessionScore(prev => Math.max(0, prev - 25));
    }

    setShowFeedback({ isCorrect, explanation: currentQ.explanation });
  }, [activeLevel, currentQuestionIdx]);

  // Timer logic
  useEffect(() => {
    let timer: any;
    if (view === 'playing' && !showFeedback && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && view === 'playing' && !showFeedback) {
      // Handle timeout only if feedback isn't already shown
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [view, showFeedback, timeLeft, handleAnswer]);

  const startLevel = (level: Level) => {
    setActiveLevel(level);
    setCurrentQuestionIdx(0);
    setSessionScore(0);
    setSessionCorrectCount(0);
    setTimeLeft(180);
    setShowFeedback(null);
    setView('playing');
  };

  const completeLevel = useCallback(() => {
    if (!activeLevel) return;
    
    const isFirstCompletion = !progress.completedLevels.includes(activeLevel.id);
    const earnedStars = Math.ceil((sessionCorrectCount / activeLevel.questions.length) * 3);
    
    const newProgress = { ...progress };
    if (isFirstCompletion) {
      newProgress.completedLevels.push(activeLevel.id);
      newProgress.totalXp += activeLevel.xpValue;
      newProgress.stars += earnedStars;
      
      // Unlock next level
      const nextLevel = LEVELS.find(l => l.id === activeLevel.id + 1);
      if (nextLevel && !newProgress.unlockedLevels.includes(nextLevel.id)) {
        newProgress.unlockedLevels.push(nextLevel.id);
      }
    }
    
    // Update score if higher
    const prevScore = progress.scores[activeLevel.id] || 0;
    if (sessionScore > prevScore) {
      newProgress.scores[activeLevel.id] = sessionScore;
    }

    saveProgress(newProgress);
    setView('results');
  }, [activeLevel, progress, sessionCorrectCount, sessionScore, saveProgress]);

  const nextQuestion = () => {
    setShowFeedback(null);
    if (!activeLevel) return;
    
    if (currentQuestionIdx < activeLevel.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      completeLevel();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {view !== 'playing' && (
        <Header 
          totalXp={progress.totalXp} 
          stars={progress.stars} 
          avatarUrl={progress.avatarUrl}
          onNavigate={(v) => { setView(v); setActiveLevel(null); }} 
        />
      )}
      
      <main className={`flex-grow ${view === 'playing' ? 'bg-surface-container-low' : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          {view === 'home' && <HomeView key="home" setView={setView} />}
          {view === 'levels' && <LevelsView key="levels" progress={progress} startLevel={startLevel} />}
          {view === 'playing' && activeLevel && (
            <GameView 
              key="playing" 
              activeLevel={activeLevel}
              currentQuestionIdx={currentQuestionIdx}
              timeLeft={timeLeft}
              sessionScore={sessionScore}
              showFeedback={showFeedback}
              handleAnswer={handleAnswer}
              nextQuestion={nextQuestion}
              setView={setView}
            />
          )}
          {view === 'results' && activeLevel && (
            <ResultsView 
              key="results" 
              activeLevel={activeLevel}
              sessionScore={sessionScore}
              sessionCorrectCount={sessionCorrectCount}
              setView={setView}
              startLevel={startLevel}
            />
          )}
          {view === 'leaderboard' && <LeaderboardView key="leaderboard" progress={progress} setView={setView} />}
          {view === 'profile' && <ProfileView key="profile" progress={progress} saveProgress={saveProgress} setView={setView} />}
        </AnimatePresence>
      </main>

      {view !== 'playing' && <Footer />}
      
      {/* Mobile Nav Shell */}
      {view !== 'playing' && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-surface-container-highest shadow-2xl rounded-t-3xl">
          <button onClick={() => setView('home')} className={`p-2 rounded-xl transition-all ${view === 'home' ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant'}`}>
            <LayoutGrid className="w-6 h-6" />
          </button>
          <button onClick={() => setView('levels')} className={`p-2 rounded-xl transition-all ${view === 'levels' ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant'}`}>
            <Trophy className="w-6 h-6" />
          </button>
          <button onClick={() => setView('leaderboard')} className={`p-2 rounded-xl transition-all ${view === 'leaderboard' ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant'}`}>
            <TrendingUp className="w-6 h-6" />
          </button>
          <button onClick={() => setView('profile')} className={`p-2 rounded-xl transition-all ${view === 'profile' ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant'}`}>
            <User className="w-6 h-6" />
          </button>
        </nav>
      )}
    </div>
  );
}
