import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { courseService } from '../services/courseService';
import { motion } from 'motion/react';
import { Course, COURSE_CATEGORIES } from '../data/courses';

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [courseData, setCourseData] = useState({
    id: '',
    title: '',
    instructor: '',
    description: '',
    duration: '',
    modules: 0,
    cleCredits: 0,
    creditType: 'General' as Course['creditType'],
    category: '',
    isFeatured: false,
    isNew: true,
    progress: 0,
    imageUrl: '',
    tags: '',
    level: 'Beginner' as Course['level'],
    rating: 4.5,
    studentsEnrolled: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const course = {
        ...courseData,
        modules: Number(courseData.modules),
        cleCredits: Number(courseData.cleCredits),
        rating: Number(courseData.rating),
        studentsEnrolled: Number(courseData.studentsEnrolled),
        tags: courseData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const response = await courseService.addCourse(course);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Course added successfully!' });
        setCourseData({
          id: '',
          title: '',
          instructor: '',
          description: '',
          duration: '',
          modules: 0,
          cleCredits: 0,
          creditType: 'General',
          category: '',
          isFeatured: false,
          isNew: true,
          progress: 0,
          imageUrl: '',
          tags: '',
          level: 'Beginner',
          rating: 4.5,
          studentsEnrolled: 0
        });
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to add course' });
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage({ type: 'error', text: 'Failed to add course. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[var(--aow-gold)] text-[var(--aow-black)] hover:bg-[var(--aow-gold)]/90"
        >
          + Add Course
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--aow-black)] border border-[var(--aow-gold)]/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Add New Course</h2>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10"
          >
            ✕
          </Button>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.type === 'success' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm mb-2">Course ID</label>
              <Input
                value={courseData.id}
                onChange={(e) => setCourseData({ ...courseData, id: e.target.value })}
                placeholder="unique-course-id"
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Title</label>
              <Input
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                placeholder="Course Title"
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm mb-2">Instructor</label>
              <Input
                value={courseData.instructor}
                onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
                placeholder="Instructor Name"
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Duration</label>
              <Input
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                placeholder="4.5 hours"
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Description</label>
            <Textarea
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              placeholder="Course description..."
              className="bg-white/10 border-white/20 text-white"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm mb-2">Modules</label>
              <Input
                type="number"
                value={courseData.modules}
                onChange={(e) => setCourseData({ ...courseData, modules: parseInt(e.target.value) || 0 })}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">CLE Credits</label>
              <Input
                type="number"
                step="0.5"
                value={courseData.cleCredits}
                onChange={(e) => setCourseData({ ...courseData, cleCredits: parseFloat(e.target.value) || 0 })}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Credit Type</label>
              <Select value={courseData.creditType} onValueChange={(value: Course['creditType']) => setCourseData({ ...courseData, creditType: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Ethics">Ethics</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Competency">Competency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm mb-2">Category</label>
              <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Level</label>
              <Select value={courseData.level} onValueChange={(value: Course['level']) => setCourseData({ ...courseData, level: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Image URL</label>
            <Input
              value={courseData.imageUrl}
              onChange={(e) => setCourseData({ ...courseData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Tags (comma-separated)</label>
            <Input
              value={courseData.tags}
              onChange={(e) => setCourseData({ ...courseData, tags: e.target.value })}
              placeholder="Advocacy, Trial Practice, Communication"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={courseData.isFeatured}
                onChange={(e) => setCourseData({ ...courseData, isFeatured: e.target.checked })}
                className="rounded"
              />
              <span>Featured Course</span>
            </label>
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={courseData.isNew}
                onChange={(e) => setCourseData({ ...courseData, isNew: e.target.checked })}
                className="rounded"
              />
              <span>New Course</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[var(--aow-gold)] text-[var(--aow-black)] hover:bg-[var(--aow-gold)]/90"
            >
              {loading ? 'Adding...' : 'Add Course'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}