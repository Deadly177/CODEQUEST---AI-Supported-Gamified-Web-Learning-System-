import { BookOpen, Code2, Sparkles, Trophy } from 'lucide-react';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: 'html' | 'css' | 'javascript' | 'backend';
  color: string;
}

interface LessonsOverviewProps {
  courses: CourseSummary[];
  onSelectCourse: (courseId: string) => void;
}

const iconMap = {
  html: Code2,
  css: Sparkles,
  javascript: Trophy,
  backend: BookOpen
};

export function LessonsOverview({ courses, onSelectCourse }: LessonsOverviewProps) {
  return (
    <div className="rounded-[2rem] bg-[#151a21] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">Library</h3>
        <span className="text-xs uppercase tracking-[0.24em] text-[#a8abb3]">Open Courses</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          const Icon = iconMap[course.icon];

          return (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelectCourse(course.id)}
              className="rounded-[1.5rem] bg-[#20262f] p-5 text-left transition-all hover:bg-[#262c36]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8abb3]">Course</p>
                  <h4 className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">{course.title}</h4>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${course.color}`}>
                  <Icon className="h-5 w-5 text-black/80" />
                </div>
              </div>
              <p className="text-sm leading-7 text-[#a8abb3]">{course.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[#a8abb3]">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="font-bold text-[#94aaff]">{course.progress}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
