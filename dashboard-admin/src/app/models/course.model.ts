import { User } from "./user.model";

export interface Course {
    courseId: string;
    name: string;
    description: string;
    durationInHours: number;
    users: User[];
  }
  