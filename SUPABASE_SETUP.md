# Supabase Course Integration Guide

## Overview
This guide explains how to integrate your existing course data with Supabase while maintaining a fixed set of courses that don't change frequently.

## 1. Database Setup

### Create Courses Table
```sql
-- Create courses table
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  instructor TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  modules INTEGER NOT NULL,
  cle_credits DECIMAL(3,1) NOT NULL,
  credit_type TEXT NOT NULL CHECK (credit_type IN ('General', 'Ethics', 'Technology', 'Competency')),
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  thumbnail TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies (if needed)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access for courses
CREATE POLICY "Allow public read access on courses" ON courses
  FOR SELECT USING (true);

-- Allow authenticated users to update progress
CREATE POLICY "Allow authenticated users to update progress" ON courses
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

### Create User Progress Table (Optional)
```sql
-- Create user_course_progress table for personalized progress
CREATE TABLE user_course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress" ON user_course_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_course_progress
  FOR ALL USING (auth.uid() = user_id);
```

## 2. Data Migration Script

Create a migration script to populate your courses table with existing data:

```typescript
// scripts/migrate-courses.ts
import { createClient } from '@supabase/supabase-js';
import { courses } from '../data/courses';

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

async function migrateCourses() {
  console.log('Starting course migration...');
  
  // Transform your course data to match database schema
  const coursesToInsert = courses.map(course => ({
    id: course.id,
    instructor: course.instructor,
    title: course.title,
    description: course.description,
    modules: course.modules,
    cle_credits: course.cleCredits,
    credit_type: course.creditType,
    category: course.category,
    is_featured: course.isFeatured || false,
    is_completed: course.isCompleted || false,
    progress: course.progress || 0,
    thumbnail: course.thumbnail,
    image_url: course.imageUrl
  }));

  // Insert courses in batches
  const batchSize = 50;
  for (let i = 0; i < coursesToInsert.length; i += batchSize) {
    const batch = coursesToInsert.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('courses')
      .upsert(batch, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Error inserting batch:', error);
    } else {
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}`);
    }
  }
  
  console.log('Course migration completed!');
}

migrateCourses();
```

## 3. Course Service Integration

Create a service to handle course data:

```typescript
// services/courseService.ts
import { createClient } from '@supabase/supabase-js';
import { Course } from '../data/courses';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class CourseService {
  // Get all courses
  static async getAllCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      // Fallback to local data
      return [];
    }

    return data.map(this.transformCourse);
  }

  // Get courses by category
  static async getCoursesByCategory(category: string): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses by category:', error);
      return [];
    }

    return data.map(this.transformCourse);
  }

  // Get featured courses
  static async getFeaturedCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured courses:', error);
      return [];
    }

    return data.map(this.transformCourse);
  }

  // Update course progress for user
  static async updateProgress(courseId: string, progress: number, userId?: string) {
    if (!userId) return;

    const { error } = await supabase
      .from('user_course_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        progress,
        is_completed: progress >= 100,
        last_accessed: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating progress:', error);
    }
  }

  // Transform database row to Course interface
  private static transformCourse(row: any): Course {
    return {
      id: row.id,
      instructor: row.instructor,
      title: row.title,
      description: row.description,
      modules: row.modules,
      cleCredits: row.cle_credits,
      creditType: row.credit_type,
      category: row.category,
      isFeatured: row.is_featured,
      isCompleted: row.is_completed,
      progress: row.progress,
      thumbnail: row.thumbnail,
      imageUrl: row.image_url
    };
  }
}
```

## 4. Update Your Components

Modify your course data functions to use Supabase:

```typescript
// data/courses.ts - Updated version
import { CourseService } from '../services/courseService';

// Keep your existing Course interface and local data as fallback
export { Course } from './courses';

// Replace the getCoursesbyCategory function
export const getCoursesbyCategory = async (category: string): Promise<Course[]> => {
  try {
    return await CourseService.getCoursesByCategory(category);
  } catch (error) {
    console.error('Falling back to local data:', error);
    // Fallback to your existing local courses data
    return courses.filter(course => course.category === category);
  }
};

export const getFeaturedCourses = async (): Promise<Course[]> => {
  try {
    return await CourseService.getFeaturedCourses();
  } catch (error) {
    console.error('Falling back to local data:', error);
    return courses.filter(course => course.isFeatured);
  }
};
```

## 5. Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For admin operations
```

## 6. Hybrid Approach (Recommended)

For a fixed course catalog with optional user personalization:

1. **Static Course Data**: Keep your course catalog in the database but update it infrequently
2. **User Progress**: Store individual user progress in `user_course_progress` table
3. **Fallback Strategy**: Always have local data as backup
4. **Caching**: Implement client-side caching for better performance

This approach gives you:
- ✅ Consistent course catalog across users
- ✅ Personalized progress tracking
- ✅ Ability to update courses when needed
- ✅ Offline capability with local fallback
- ✅ Better performance with caching

## 7. Implementation Steps

1. Set up Supabase tables using the SQL above
2. Run the migration script to populate courses
3. Create the CourseService
4. Update your components to use async data fetching
5. Add loading states and error handling
6. Test with your existing UI

This setup gives you the flexibility to manage courses centrally while maintaining the current user experience!