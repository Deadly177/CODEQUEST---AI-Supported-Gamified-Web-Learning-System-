import { BookOpen, Clock, Star } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
    xpReward: number;
    category: string;
    color: string;
  };
  onStart: (courseId: string) => void;
}

export function CourseCard({ course, onStart }: CourseCardProps) {
  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-xl shadow-xl shadow-cyan-500/10 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer">
      <div 
        className={`h-32 ${course.color} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <BookOpen className="w-16 h-16 text-white relative z-10" />
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/30">
            {course.category}
          </span>
          <span className="text-xs text-yellow-400 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400" />
            +{course.xpReward} XP
          </span>
        </div>
        
        <h3 className="text-xl mb-2 text-white">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-4">{course.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-slate-400">{course.lessonsCompleted} / {course.totalLessons} lessons</span>
            <span className="text-cyan-400">{course.progress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={() => onStart(course.id)}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 py-3 rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 font-semibold"
        >
          {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
        </button>
      </div>
    </div>
  );
}