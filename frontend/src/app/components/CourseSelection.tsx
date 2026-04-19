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
  const [recentCourseId, setRecentCourseId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setRecentCourseId(window.localStorage.getItem('codequest_recent_course'));
  }, []);

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

  const progressCourses = courses.filter((course) => course.progress > 0);
  const recentCourse = recentCourseId ? courses.find((course) => course.id === recentCourseId) ?? null : null;
  const visibleProgressCourses = [
    ...(recentCourse ? [recentCourse] : []),
    ...progressCourses
  ].filter((course, index, list) => list.findIndex((item) => item.id === course.id) === index);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'html':
        return <Code className="h-12 w-12" />;
      case 'css':
        return <Palette className="h-12 w-12" />;
      case 'javascript':
        return <Zap className="h-12 w-12" />;
      default:
        return <Code className="h-12 w-12" />;
    }
  };

  const getCourseLetter = (courseId: string) => {
    switch (courseId) {
      case 'html':
        return 'H';
      case 'css':
        return 'C';
      case 'javascript':
        return 'JS';
      case 'react':
        return 'R';
      case 'typescript':
        return 'TS';
      case 'nodejs':
        return 'N';
      case 'python':
        return 'PY';
      case 'sql':
        return 'SQL';
      default:
        return 'API';
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-16">
      <section>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-[#a8abb3] transition-colors hover:text-[#f1f3fc]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learn
          </button>
        )}

        <h2 className="font-['Space_Grotesk'] text-4xl font-black uppercase tracking-tighter text-[#f1f3fc]">{heading}</h2>
        <p className="mt-2 text-[#a8abb3]">{subheading}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProgressCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="group relative max-w-md cursor-pointer overflow-hidden rounded-[2rem] border border-blue-500/20 bg-[#0f141a] p-8 transition-all hover:border-blue-500/40"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-400">Course</div>
                  <div className="font-['Space_Grotesk'] text-2xl font-black text-[#f1f3fc]">{course.title}</div>
                  <div className="mt-1 text-xs text-[#a8abb3]">
                    {course.completedLessons}/{course.totalLessons} lessons completed
                  </div>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${course.color}`}>
                  {getIcon(course.icon)}
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-[#a8abb3]">Progress</span>
                  <span className="text-[#5cfd80]">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#20262f]">
                  <div
                    className="h-full bg-[#5cfd80] shadow-[0_0_10px_rgba(92,253,128,0.5)]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 py-4 text-xs font-black uppercase tracking-widest text-blue-400 transition-all hover:bg-blue-500/20">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </section>

      {showCareerPaths && (
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-4xl font-black uppercase tracking-tighter text-[#f1f3fc]">
                Career Paths
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              <span>🎯</span>
              Earn a professional certificate
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenFrontendPath) {
                  onOpenFrontendPath();
                  return;
                }
                setSelectedTab('frontend');
              }}
              className="group flex flex-col rounded-[2rem] border border-blue-500/20 bg-[#0f141a] p-6 text-left transition-all hover:border-blue-500/40"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-black uppercase text-[#f1f3fc]">Front-End Developer</h3>
                  <div className="text-[10px] uppercase tracking-widest text-[#a8abb3]">5 courses</div>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[#a8abb3]">
                Master HTML, CSS, JavaScript, React, and TypeScript to build modern websites
              </p>
              <div className="mb-7 flex flex-wrap gap-2">
                <span className="rounded border border-orange-500/20 bg-orange-900/30 px-2 py-1 text-[10px] font-bold text-orange-500">HTML</span>
                <span className="rounded border border-blue-500/20 bg-blue-900/30 px-2 py-1 text-[10px] font-bold text-blue-500">CSS</span>
                <span className="rounded border border-yellow-500/20 bg-yellow-900/30 px-2 py-1 text-[10px] font-bold text-yellow-500">JS</span>
              </div>
              <span className="mt-auto text-xs font-bold uppercase tracking-widest text-blue-400 transition-colors group-hover:text-blue-300">
                Click to view these courses
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab('backend')}
              className="group flex flex-col rounded-[2rem] border border-green-500/20 bg-[#0f141a] p-7 text-left transition-all hover:border-green-500/40"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-400">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-black uppercase text-[#f1f3fc]">Back-End Developer</h3>
                  <div className="text-[10px] uppercase tracking-widest text-[#a8abb3]">6 courses</div>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[#a8abb3]">
                Learn Node.js, Python, databases, APIs, and server-side programming
              </p>
              <div className="mb-7 flex flex-wrap gap-2">
                <span className="rounded border border-green-500/20 bg-green-900/30 px-2 py-1 text-[10px] font-bold text-green-500">Node.js</span>
                <span className="rounded border border-blue-500/20 bg-blue-900/30 px-2 py-1 text-[10px] font-bold text-blue-500">Python</span>
                <span className="rounded border border-purple-500/20 bg-purple-900/30 px-2 py-1 text-[10px] font-bold text-purple-500">SQL</span>
              </div>
              <span className="mt-auto text-xs font-bold uppercase tracking-widest text-green-400 transition-colors group-hover:text-green-300">
                Click to view these courses
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab('all')}
              className="group flex flex-col rounded-[2rem] border border-purple-500/30 bg-[#1a1521] p-7 text-left shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-all hover:border-purple-500/60"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/20 text-purple-400">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-black uppercase text-[#f1f3fc]">Full Stack Developer</h3>
                  <div className="text-[10px] uppercase tracking-widest text-[#a8abb3]">10 courses</div>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[#a8abb3]">
                Complete front-end and back-end development mastery for full applications
              </p>
              <div className="mb-7 flex flex-wrap gap-2">
                <span className="rounded border border-blue-400/20 bg-blue-900/30 px-2 py-1 text-[10px] font-bold text-blue-400">React</span>
                <span className="rounded border border-green-400/20 bg-green-900/30 px-2 py-1 text-[10px] font-bold text-green-400">Node</span>
                <span className="rounded border border-purple-400/20 bg-purple-900/30 px-2 py-1 text-[10px] font-bold text-purple-400">DB</span>
              </div>
              <span className="mt-auto text-xs font-bold uppercase tracking-widest text-purple-400 transition-colors group-hover:text-purple-300">
                Click to view all courses
              </span>
            </button>
          </div>
        </section>
      )}

      <section>
        <div className="mb-8">
          <h2 className="font-['Space_Grotesk'] text-4xl font-black uppercase tracking-tighter text-[#f1f3fc]">
            Course Library
          </h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedTab('all')}
            className={`rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-[0.28em] transition-all ${
              selectedTab === 'all'
                ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-[#44484f]/40 bg-[#20262f] text-[#f1f3fc] hover:border-cyan-400/30 hover:text-cyan-200'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('frontend')}
            className={`rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-[0.28em] transition-all ${
              selectedTab === 'frontend'
                ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-[#44484f]/40 bg-[#20262f] text-[#f1f3fc] hover:border-cyan-400/30 hover:text-cyan-200'
            }`}
          >
            Frontend
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('backend')}
            className={`rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-[0.28em] transition-all ${
              selectedTab === 'backend'
                ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-[#44484f]/40 bg-[#20262f] text-[#f1f3fc] hover:border-cyan-400/30 hover:text-cyan-200'
            }`}
          >
            Backend
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {displayedCourses.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelectCourse(course.id)}
              className="group flex min-h-[20rem] flex-col rounded-[2rem] border border-[#2a3240] bg-[#20262f] p-7 text-left transition-all duration-300 hover:border-[#94aaff]/30"
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a8abb3]">Course</p>
                  <span className="block font-['Space_Grotesk'] text-[2rem] font-black leading-none text-[#f1f3fc]">
                    {course.title}
                  </span>
                  <span className="mt-4 block text-[10px] uppercase tracking-[0.28em] text-[#a8abb3]">
                    {frontendCourseIds.has(course.id) ? 'Frontend' : backendCourseIds.has(course.id) ? 'Backend' : 'Track'}
                  </span>
                </div>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${course.color} text-black/80`}>
                  {getIcon(course.icon)}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm leading-9 text-[#a8abb3]">{course.description}</p>
              </div>

              <div className="mt-8 flex items-end justify-between text-sm font-bold">
                <span className="text-[#a8abb3]">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="text-[#94aaff]">{course.progress}%</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
