export interface ServicePhonesVO {
  tel: string
}

export interface CourseVO {
  courseId: string
  courseName: string
  reference: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class CourseEntity {
  constructor (
    public courseId: string,
    public courseName: string,
    public reference: string,
    public unitId: string,
    public isActive?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

export class AcademicCampusEntity {
  constructor (
    public campusId: string,
    public campusName: string,
    public address: string,
    public email: string,
    public phones: ServicePhonesVO[],
    public linkCourses: Array<Pick<CourseEntity, 'courseId'>>,
    public courses: CourseVO[]
  ) {}
}

export class OrganizationalUnitEntity {
  constructor (
    public unitId: string,
    public unitName: string,
    public reference: string,
    public courses: CourseVO[]
  ) {}
}
