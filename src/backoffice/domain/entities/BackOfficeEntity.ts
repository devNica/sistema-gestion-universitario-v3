export interface ServicePhonesVO {
  tel: string
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
    public courses?: Omit<CourseEntity, 'unitId'>
  ) {}
}

export class OrganizationalUnitEntity {
  constructor (
    public unitId: string,
    public unitName: string,
    public reference: string,
    public courses?: Array<Omit<CourseEntity, 'courseId'>>
  ) {}
}
