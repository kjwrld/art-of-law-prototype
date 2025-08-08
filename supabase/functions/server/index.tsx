import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import { createClient } from "npm:@supabase/supabase-js@2"
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))
app.use('*', logger(console.log))

// Supabase client for server operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Helper function to add frontend fields to database courses
const enhanceCourseData = (course: any) => {
  return {
    ...course,
    // Add frontend-only fields with defaults
    progress: 0, // User progress, will be fetched separately
    imageUrl: course.image_link || 'https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg',
    tags: [], // Derive from course content later
    level: 'Intermediate', // Default level
    rating: 4.5 + Math.random() * 0.5, // Mock rating 4.5-5.0
    studentsEnrolled: Math.floor(Math.random() * 3000) + 500, // Mock enrollment
    duration: `${Math.ceil(course.credits * 0.8)} hours`, // Estimate duration from credits
    // Map database fields to expected frontend fields for backward compatibility
    cleCredits: course.credits,
    creditType: course.credit_type,
    isFeatured: course.featured,
    isNew: course.new_tag
  }
}

// Health check endpoint
app.get('/make-server-9180a2e7/health', (c) => {
  return c.json({ status: 'ok', message: 'Art of War Legal API is running' })
})

// Debug endpoint to check course data from database
app.get('/make-server-9180a2e7/debug/courses', async (c) => {
  try {
    console.log('🔧 Debug: Checking database courses...')
    
    // Query the actual courses table
    const { data: allCourses, error } = await supabase
      .from('courses')
      .select('*')
    
    if (error) {
      console.error('Debug: Database error:', error)
      return c.json({ success: false, error: 'Database error', details: error.message }, 500)
    }

    // Group by selection for debugging
    const selections = ['Recommended', 'Celebrity', 'Continue', 'top', 'ai_web3']
    const selectionCounts = {}
    const selectionSamples = {}
    
    for (const selection of selections) {
      const selectionCourses = allCourses?.filter(course => course.selection === selection) || []
      selectionCounts[selection] = selectionCourses.length
      selectionSamples[selection] = selectionCourses.map(c => ({ title: c.title, instructor: c.instructor }))
    }
    
    return c.json({
      success: true,
      debug: {
        totalCourses: allCourses?.length || 0,
        selections: selectionCounts,
        sampleCourses: selectionSamples,
        tableName: 'courses',
        availableSelections: [...new Set(allCourses?.map(c => c.selection) || [])]
      }
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return c.json({ success: false, error: 'Failed to fetch debug info', details: error.message }, 500)
  }
})

// Get all courses from database
app.get('/make-server-9180a2e7/courses', async (c) => {
  try {
    // Check if this is a focus-based query
    const focus = c.req.query('focus')
    
    if (focus) {
      console.log(`🎯 Fetching courses with focus: "${focus}"`)
      
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .eq('focus', focus)
        .not('focus', 'is', null) // Exclude null focus
        .neq('focus', '') // Exclude empty focus
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error(`Database error fetching courses with focus "${focus}":`, error)
        return c.json({ success: false, error: 'Failed to fetch courses by focus' }, 500)
      }

      // Enhance courses with frontend fields
      const enhancedCourses = courses?.map(enhanceCourseData) || []
      
      console.log(`✅ Found ${enhancedCourses.length} courses with focus "${focus}"`)
      return c.json({ success: true, courses: enhancedCourses, focus })
    }
    
    console.log('📚 Fetching all courses from database...')
    
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Database error fetching courses:', error)
      return c.json({ success: false, error: 'Failed to fetch courses' }, 500)
    }

    // Enhance courses with frontend fields
    const enhancedCourses = courses?.map(enhanceCourseData) || []
    
    console.log(`✅ Successfully fetched ${enhancedCourses.length} courses from database`)
    return c.json({ success: true, courses: enhancedCourses })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return c.json({ success: false, error: 'Failed to fetch courses' }, 500)
  }
})

// Get all courses from database (specific endpoint for global overlay)
app.get('/make-server-9180a2e7/courses/all', async (c) => {
  try {
    console.log('🌐 Fetching all courses for global overlay system...')
    
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Database error fetching all courses:', error)
      return c.json({ success: false, error: 'Failed to fetch all courses' }, 500)
    }

    // Enhance courses with frontend fields
    const enhancedCourses = courses?.map(enhanceCourseData) || []
    
    console.log(`✅ Successfully fetched ${enhancedCourses.length} courses for global overlay`)
    return c.json({ success: true, courses: enhancedCourses })
  } catch (error) {
    console.error('Error fetching all courses:', error)
    return c.json({ success: false, error: 'Failed to fetch all courses' }, 500)
  }
})

// Get courses by selection (this is what we need for "Recommended For You")
app.get('/make-server-9180a2e7/courses/selection/:selection', async (c) => {
  try {
    const selection = c.req.param('selection')
    console.log(`🔍 Fetching courses for selection: "${selection}"`)
    
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('selection', selection)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error(`Database error fetching courses for selection "${selection}":`, error)
      return c.json({ success: false, error: 'Failed to fetch courses by selection' }, 500)
    }

    // Enhance courses with frontend fields
    const enhancedCourses = courses?.map(enhanceCourseData) || []
    
    console.log(`✅ Found ${enhancedCourses.length} courses for selection "${selection}"`)
    return c.json({ success: true, courses: enhancedCourses, selection })
  } catch (error) {
    console.error(`Error fetching courses by selection "${selection}":`, error)
    return c.json({ success: false, error: 'Failed to fetch courses by selection' }, 500)
  }
})

// Legacy endpoint: Get courses by category (maps to selection-based system)
app.get('/make-server-9180a2e7/courses/category/:category', async (c) => {
  try {
    const category = c.req.param('category')
    console.log(`🔍 Legacy: Fetching courses for category "${category}"`)
    
    // Map category names to selection values
    let selection = ''
    switch (category) {
      case 'Recommended For You':
        selection = 'Recommended' // Also include Celebrity courses
        break
      case 'Continue Watching':
        selection = 'Continue'
        break
      case 'The Next Frontier: AI & Crypto':
        selection = 'ai_web3'
        break
      default:
        console.warn(`Unknown category: ${category}`)
        return c.json({ success: true, courses: [], category })
    }
    
    let query = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    
    // For "Recommended For You", only include "Recommended" selection (Celebrity moved to hero carousel)
    if (category === 'Recommended For You') {
      query = query.eq('selection', 'Recommended')
    } else {
      query = query.eq('selection', selection)
    }
    
    const { data: courses, error } = await query
    
    if (error) {
      console.error(`Database error fetching courses for category "${category}":`, error)
      return c.json({ success: false, error: 'Failed to fetch courses by category' }, 500)
    }

    // Enhance courses with frontend fields
    const enhancedCourses = courses?.map(enhanceCourseData) || []
    
    console.log(`✅ Found ${enhancedCourses.length} courses for category "${category}" (selection: ${selection})`)
    return c.json({ success: true, courses: enhancedCourses, category })
  } catch (error) {
    console.error(`Error fetching courses for category "${category}":`, error)
    return c.json({ success: false, error: 'Failed to fetch courses by category' }, 500)
  }
})

// Get single course by ID
app.get('/make-server-9180a2e7/courses/:id', async (c) => {
  try {
    const courseId = c.req.param('id')
    console.log(`🔍 Fetching course with ID: ${courseId}`)
    
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return c.json({ success: false, error: 'Course not found' }, 404)
      }
      console.error(`Database error fetching course ${courseId}:`, error)
      return c.json({ success: false, error: 'Failed to fetch course' }, 500)
    }

    // Enhance course with frontend fields
    const enhancedCourse = enhanceCourseData(course)
    
    console.log(`✅ Found course: ${enhancedCourse.title}`)
    return c.json({ success: true, course: enhancedCourse })
  } catch (error) {
    console.error('Error fetching course:', error)
    return c.json({ success: false, error: 'Failed to fetch course' }, 500)
  }
})

// Get all learning tracks (kept from KV store for now)
app.get('/make-server-9180a2e7/learning-tracks', async (c) => {
  try {
    const tracks = await kv.get('learning-tracks:all') || []
    return c.json({ success: true, tracks })
  } catch (error) {
    console.error('Error fetching learning tracks:', error)
    return c.json({ success: false, error: 'Failed to fetch learning tracks' }, 500)
  }
})

// Update course progress (requires user auth)
app.put('/make-server-9180a2e7/courses/:id/progress', async (c) => {
  try {
    const courseId = c.req.param('id')
    const { progress, userId } = await c.req.json()
    
    // In a real app, you'd validate the user session here
    if (!userId) {
      return c.json({ success: false, error: 'User authentication required' }, 401)
    }

    // Store user progress in KV store
    const progressKey = `user:${userId}:course:${courseId}:progress`
    await kv.set(progressKey, { progress, updatedAt: new Date().toISOString() })

    return c.json({ success: true, message: 'Progress updated successfully' })
  } catch (error) {
    console.error('Error updating course progress:', error)
    return c.json({ success: false, error: 'Failed to update progress' }, 500)
  }
})

// Get user's course progress
app.get('/make-server-9180a2e7/users/:userId/progress', async (c) => {
  try {
    const userId = c.req.param('userId')
    
    // Get all progress entries for this user from KV store
    const progressEntries = await kv.getByPrefix(`user:${userId}:course:`)
    
    const userProgress = progressEntries.reduce((acc: any, entry: any) => {
      const courseId = entry.key.split(':')[3] // Extract course ID from key
      acc[courseId] = entry.value
      return acc
    }, {})

    return c.json({ success: true, progress: userProgress })
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return c.json({ success: false, error: 'Failed to fetch user progress' }, 500)
  }
})

// Add new course (admin endpoint)
app.post('/make-server-9180a2e7/courses', async (c) => {
  try {
    const newCourse = await c.req.json()
    
    // Validate required fields
    if (!newCourse.title || !newCourse.instructor) {
      return c.json({ success: false, error: 'Missing required fields (title, instructor)' }, 400)
    }

    // Insert into database
    const { data: course, error } = await supabase
      .from('courses')
      .insert([newCourse])
      .select()
      .single()
    
    if (error) {
      console.error('Database error adding course:', error)
      return c.json({ success: false, error: 'Failed to add course' }, 500)
    }

    const enhancedCourse = enhanceCourseData(course)
    return c.json({ success: true, message: 'Course added successfully', course: enhancedCourse })
  } catch (error) {
    console.error('Error adding course:', error)
    return c.json({ success: false, error: 'Failed to add course' }, 500)
  }
})

// Search courses
app.get('/make-server-9180a2e7/courses/search/:query', async (c) => {
  try {
    const query = c.req.param('query')
    console.log(`🔍 Searching courses for: "${query}"`)
    
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .or(`title.ilike.%${query}%,instructor.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Database error searching courses:', error)
      return c.json({ success: false, error: 'Failed to search courses' }, 500)
    }

    // Enhance courses with frontend fields
    const enhancedCourses = courses?.map(enhanceCourseData) || []
    
    console.log(`✅ Found ${enhancedCourses.length} courses matching "${query}"`)
    return c.json({ success: true, courses: enhancedCourses, query })
  } catch (error) {
    console.error('Error searching courses:', error)
    return c.json({ success: false, error: 'Failed to search courses' }, 500)
  }
})

Deno.serve(app.fetch)