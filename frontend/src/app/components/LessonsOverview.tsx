import { BookOpen, Code2, Lock, Sparkles, Trophy } from 'lucide-react';

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
  unlockAllCourses?: boolean;
}

const iconMap = {
  html: Code2,
  css: Sparkles,
  javascript: Trophy,
  backend: BookOpen
};

export function LessonsOverview({ courses, onSelectCourse, unlockAllCourses = false }: LessonsOverviewProps) {
  const orderedCourseIds = ['html', 'css', 'javascript', 'react', 'typescript', 'nodejs', 'python', 'sql', 'apis'];
  const courseById = new Map(courses.map((course) => [course.id, course]));
  const isCourseUnlocked = (course: CourseSummary) => {
    if (unlockAllCourses) {
      return true;
    }

    const courseIndex = orderedCourseIds.indexOf(course.id);
    if (courseIndex <= 0) {
      return true;
    }

    const previousCourse = courseById.get(orderedCourseIds[courseIndex - 1]);
    return Boolean(previousCourse && previousCourse.progress >= 100);
  };

  return (
    <div className="rounded-[2rem] bg-[#151a21] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">Library</h3>
        <span className="text-xs uppercase tracking-[0.24em] text-[#a8abb3]">Open Courses</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          const Icon = iconMap[course.icon];
          const unlocked = isCourseUnlocked(course);

          return (
            <button
              key={course.id}
              type="button"
              disabled={!unlocked}
              onClick={() => {
                if (unlocked) {
                  onSelectCourse(course.id);
                }
              }}
              className={`rounded-[1.5rem] text-left transition-all ${
                unlocked
                  ? 'bg-[#20262f] p-5 hover:bg-[#262c36]'
                  : 'min-h-[10rem] cursor-not-allowed border border-dashed border-white/10 bg-[#111720] p-4 opacity-65 grayscale'
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8abb3]">Course</p>
                  <h4 className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">{course.title}</h4>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${unlocked ? course.color : 'bg-[#20262f]'}`}>
                  {unlocked ? <Icon className="h-5 w-5 text-black/80" /> : <Lock className="h-5 w-5 text-[#a8abb3]" />}
                </div>
              </div>
              <p className={`${unlocked ? 'text-sm leading-7' : 'line-clamp-2 text-xs leading-5'} text-[#a8abb3]`}>
                {unlocked ? course.description : 'Complete the previous course to unlock this course.'}
              </p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[#a8abb3]">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className={`font-bold ${unlocked ? 'text-[#94aaff]' : 'text-[#ffbd5c]'}`}>
                  {unlocked ? `${course.progress}%` : 'Locked'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
