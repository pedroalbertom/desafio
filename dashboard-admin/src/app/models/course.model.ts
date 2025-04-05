// src/app/models/course.model.ts
export interface User {
    userId: string;
    courseId: string;
    name: string;
    email: string;
  }
  
  export interface Course {
    courseId: string;
    name: string;
    description: string;
    durationInHours: number;
    users: User[];
  }
  