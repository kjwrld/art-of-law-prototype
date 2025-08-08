import { projectId, publicAnonKey } from '../utils/supabase/info'

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7`

class CourseService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Get all courses
  async getAllCourses() {
    return this.makeRequest('/courses')
  }

  // Get courses by category (maps to selection-based system)
  async getCoursesByCategory(category: string) {
    console.log(`🌐 CourseService: Requesting courses from database for category: "${category}"`)
    const result = await this.makeRequest(`/courses/category/${encodeURIComponent(category)}`)
    console.log(`📦 CourseService: Received ${result.courses?.length || 0} courses from database for "${category}"`)
    return result
  }

  // Get single course
  async getCourse(courseId: string) {
    return this.makeRequest(`/courses/${courseId}`)
  }

  // Get all learning tracks
  async getLearningTracks() {
    return this.makeRequest('/learning-tracks')
  }

  // Update course progress
  async updateCourseProgress(courseId: string, progress: number, userId: string) {
    return this.makeRequest(`/courses/${courseId}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ progress, userId }),
    })
  }

  // Get user progress
  async getUserProgress(userId: string) {
    return this.makeRequest(`/users/${userId}/progress`)
  }

  // Search courses
  async searchCourses(query: string) {
    return this.makeRequest(`/courses/search/${encodeURIComponent(query)}`)
  }

  // Add new course (admin)
  async addCourse(courseData: any) {
    return this.makeRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    })
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health')
  }

  // Debug endpoint to check course data
  async debugCourses() {
    return this.makeRequest('/debug/courses')
  }
}

export const courseService = new CourseService()