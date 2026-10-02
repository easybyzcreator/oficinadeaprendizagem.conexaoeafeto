export interface Workshop {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  skills: string[];
  tagColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconName: string;
  ageRecommendation?: string;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface WeekCycle {
  week: number;
  title: string;
  description: string;
  badge: string;
  color: string;
}

export interface Lead {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  workshop: string;
  preferredShift?: string;
  notes?: string;
  createdAt: string;
}

export interface Specialist {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  imageKey: string;
}
