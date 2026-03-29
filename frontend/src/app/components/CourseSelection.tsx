import { ArrowLeft, Code, Palette, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: 'html' | 'css' | 'javascript' | 'backend';
  color: string;
}

interface CourseSelectionProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onOpenFrontendPath?: () => void;
  initialTab?: 'all' | 'frontend' | 'backend';
  heading?: string;
  subheading?: string;
  showCareerPaths?: boolean;
  onBack?: () => void;
}

export function CourseSelection({
  courses,
  onSelectCourse,
  onOpenFrontendPath,
  initialTab = 'all',
  heading = 'Your Progress',
  subheading = 'Continue your frontend development journey',
  showCareerPaths = true,
  onBack
}: CourseSelectionProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'frontend' | 'backend'>(initialTab);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'html':
        return <Code className="w-12 h-12" />;
      case 'css':
        return <Palette className="w-12 h-12" />;
      case 'javascript':
        return <Zap className="w-12 h-12" />;
      case 'backend':
        return <Code className="w-12 h-12" />;
      default:
        return <Code className="w-12 h-12" />;
    }
  };

  const frontendCourseIds = new Set(['html', 'css', 'javascript', 'react', 'typescript']);
  const backendCourseIds = new Set(['nodejs', 'python', 'sql', 'apis']);

  const displayedCourses = courses.filter((course) => {
    if (selectedTab === 'frontend') {
      return frontendCourseIds.has(course.id);
    }
    if (selectedTab === 'backend') {
      return backendCourseIds.has(course.id);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </button>
        )}
        <h2 className="text-3xl text-white mb-2">{heading}</h2>
        <p className="text-slate-400">{subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {courses.filter(c => c.progress > 0).map((course) => (
          <div
            key={course.id}
            className="bg-slate-900 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer group"
            onClick={() => onSelectCourse(course.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-xs text-slate-400 uppercase mb-1">Course</p>
                <h3 className="text-xl text-white mb-2">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{course.completedLessons}/{course.totalLessons} lessons completed</p>
              </div>
              <div className={`${course.color} p-3 rounded-lg shadow-lg`}>
                {getIcon(course.icon)}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Progress</span>
                <span className="text-sm text-green-400 font-semibold">{course.progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-green-500/50"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
            
            <button className="w-full mt-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg group-hover:bg-cyan-500/30 transition-all">
              Continue Learning
            </button>
          </div>
        ))}
      </div>

      {showCareerPaths && (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl text-white">Career Paths</h2>
          <span className="text-sm text-cyan-400">🎯 Earn a professional certificate</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Front-End Developer Path */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFrontendPath) {
                onOpenFrontendPath();
                return;
              }
              setSelectedTab('frontend');
            }}
            className={`text-left bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border rounded-xl p-6 transition-all ${
              selectedTab === 'frontend'
                ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'border-cyan-500/30 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg shadow-lg shadow-cyan-500/20">
                <Code className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl text-white">Front-End Developer</h3>
                <p className="text-xs text-slate-400">5 courses</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">Master HTML, CSS, JavaScript, React, and TypeScript to build modern websites</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30">HTML</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">CSS</span>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30">JS</span>
            </div>
            <p className="text-cyan-400 text-sm mt-4">Click to view these courses</p>
          </button>

          {/* Back-End Developer Path */}
          <button
            type="button"
            onClick={() => setSelectedTab('backend')}
            className={`text-left bg-gradient-to-br from-green-500/10 to-emerald-500/10 border rounded-xl p-6 transition-all ${
              selectedTab === 'backend'
                ? 'border-green-400 shadow-lg shadow-green-500/20'
                : 'border-green-500/30 hover:border-green-500/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500/20 p-3 rounded-lg shadow-lg shadow-green-500/20">
                <Code className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl text-white">Back-End Developer</h3>
                <p className="text-xs text-slate-400">6 courses</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">Learn Node.js, Python, databases, APIs, and server-side programming</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">Node.js</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">Python</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">SQL</span>
            </div>
            <p className="text-green-400 text-sm mt-4">Click to view these courses</p>
          </button>

          {/* Full Stack Developer Path */}
          <button
            type="button"
            onClick={() => setSelectedTab('all')}
            className={`text-left bg-gradient-to-br from-purple-500/10 to-pink-500/10 border rounded-xl p-6 transition-all ${
              selectedTab === 'all'
                ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                : 'border-purple-500/30 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg shadow-lg shadow-purple-500/20">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl text-white">Full Stack Developer</h3>
                <p className="text-xs text-slate-400">10 courses</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">Complete front-end and back-end development mastery for full applications</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">React</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">Node</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">DB</span>
            </div>
            <p className="text-purple-400 text-sm mt-4">Click to view all courses</p>
          </button>
        </div>
      </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-3xl text-white">All Courses</h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedTab === 'all'
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                  : 'border-slate-700 text-slate-300 hover:border-cyan-500/40'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('frontend')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedTab === 'frontend'
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                  : 'border-slate-700 text-slate-300 hover:border-cyan-500/40'
              }`}
            >
              Frontend
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('backend')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedTab === 'backend'
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                  : 'border-slate-700 text-slate-300 hover:border-cyan-500/40'
              }`}
            >
              Backend
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="bg-slate-900 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group"
          >
            <div className={`h-48 ${course.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <div className="relative z-10 text-white">
                {getIcon(course.icon)}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-cyan-400 uppercase">Course</span>
                <div className={`${course.color} w-8 h-8 rounded flex items-center justify-center`}>
                  <span className="text-white text-xs">
                    {course.id === 'html'
                      ? 'H'
                      : course.id === 'css'
                      ? 'C'
                      : course.id === 'javascript'
                      ? 'JS'
                      : course.id === 'react'
                      ? 'R'
                      : course.id === 'typescript'
                      ? 'TS'
                      : course.id === 'nodejs'
                      ? 'N'
                      : course.id === 'python'
                      ? 'PY'
                      : course.id === 'sql'
                      ? 'SQL'
                      : 'API'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl text-white mb-2">{course.title}</h3>
              <p className="text-slate-400 text-sm mb-5">{course.description}</p>
              <div className="text-sm text-cyan-400">Open course</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
