import { ArrowLeft, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Lesson {
  id: string;
  number: number;
  title: string;
  type: 'learn' | 'practice';
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  number: number;
  title: string;
  progress: string;
  lessons: Lesson[];
  icon?: string;
}

interface CourseViewProps {
  courseTitle: string;
  sections: Section[];
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
  certificate: {
    progress: number;
    total: number;
  };
}

export function CourseView({ courseTitle, sections, onBack, onStartLesson, certificate }: CourseViewProps) {
  const [selectedSection, setSelectedSection] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    setSelectedSection(sections[0]?.id ?? '');
  }, [sections]);

  const currentSection = sections.find(s => s.id === selectedSection);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Left Sidebar - Course Navigation */}
      <div className="w-80 bg-slate-900 border border-cyan-500/20 rounded-xl p-6 overflow-y-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </button>

        <div className="mb-6">
          <p className="text-xs text-slate-400 uppercase mb-2">Course</p>
          <h2 className="text-xl text-white mb-4">{courseTitle}</h2>
          
          {/* Certificate Progress */}
          <div className="bg-slate-800 border border-cyan-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">🏆</div>
              <div className="flex-1">
                <p className="text-sm text-white">Certificate of Completion</p>
                <p className="text-xs text-slate-400">{certificate.progress}% Complete</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${certificate.progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">0/{certificate.total}</p>
          </div>
        </div>

        {/* Sections List */}
        <div>
          <p className="text-xs text-slate-400 uppercase mb-3">Sections</p>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedSection === section.id
                    ? 'bg-cyan-500/20 border border-cyan-500/40'
                    : 'bg-slate-800 border border-slate-700 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {section.icon && <span className="text-lg">{section.icon}</span>}
                    <div>
                      <p className="text-sm text-white">{section.number}. {section.title}</p>
                      <p className="text-xs text-slate-400">{section.progress}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Lessons */}
      <div className="flex-1 bg-slate-900 border border-cyan-500/20 rounded-xl p-8 overflow-y-auto">
        {currentSection && (
          <>
            <div className="mb-8">
              <p className="text-sm text-slate-400 uppercase mb-2">Section</p>
              <h1 className="text-3xl text-white mb-2">{currentSection.number}. {currentSection.title}</h1>
              <p className="text-slate-400">{currentSection.lessons[0]?.title.includes('variables') ? 'Create variables storing numbers, strings, and booleans' : 'Learn the fundamentals step by step'}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-white">Lessons</h3>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400">{currentSection.progress}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {currentSection.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`bg-slate-800 border rounded-xl p-4 transition-all ${
                      lesson.locked
                        ? 'border-slate-700 opacity-60'
                        : lesson.completed
                        ? 'border-green-500/30 hover:border-green-500/50'
                        : 'border-cyan-500/30 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm">{String(lesson.number).padStart(2, '0')}</span>
                        <span className="text-white">{lesson.title}</span>
                      </div>
                      
                      {lesson.locked ? (
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-500 rounded-lg cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4" />
                        </button>
                      ) : lesson.completed ? (
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all"
                        >
                          <span className="text-sm">✓ COMPLETED</span>
                        </button>
                      ) : lesson.type === 'practice' ? (
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-all"
                        >
                          <span className="text-sm">⚡ PRACTICE</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all"
                        >
                          <span className="text-sm">📖 LEARN</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Section Preview */}
            {sections.indexOf(currentSection) < sections.length - 1 && (
              <div className="bg-slate-800 border border-cyan-500/20 rounded-xl p-6">
                <p className="text-sm text-slate-400 uppercase mb-2">Next Section</p>
                <h3 className="text-xl text-white mb-2">{sections[sections.indexOf(currentSection) + 1].title}</h3>
                <button
                  onClick={() => setSelectedSection(sections[sections.indexOf(currentSection) + 1].id)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all"
                >
                  Continue
                </button>
              </div>
            )}
          </>
        )}

        {!currentSection && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl text-white mb-2">Course content is coming soon</h3>
              <p className="text-slate-400">This course does not have lesson sections available yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
