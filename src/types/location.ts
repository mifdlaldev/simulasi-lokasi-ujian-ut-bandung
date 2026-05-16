export interface StudentIdentity {
  nim: string;
  name: string;
  programStudy: string;
  email: string;
  phone: string;
}

export interface ExamRegion {
  id: string;
  name: string;
}

export interface ExamLocation {
  id: string;
  regionId: string;
  schoolName: string;
  examDate: string;
  examTime: string;
  availableRooms: number;
  address: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  photoUrl: string;
  galleryPhotoUrls: string[];
  description: string;
}

export interface ExamLocationSelection {
  region: ExamRegion | null;
  location: ExamLocation | null;
}
