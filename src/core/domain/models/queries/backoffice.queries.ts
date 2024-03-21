export const fetchCoursesByCampusIdQuery = (): string => `
    select 

    cmp.id as "campusId",
    cmp.campus_name as "campusName",
    cmp.address,
    cmp.email,
    cmp.phones,
    json_agg(json_build_object('id', crs.id, 'course', crs.course_name)) AS courses

    from develop.campus cmp
    inner join develop.campus_has_course chc on chc.campus_id = cmp.id 
    inner join  develop.course crs on crs.id = chc.course_id 

    where cmp.id = :campusId

    group by
        cmp.id,
        cmp.campus_name,
        cmp.address,
        cmp.email,
        cmp.phones
`

export const fetchCoursesByOrganizationIdQuery = (): string => `
    select 

    json_agg(json_build_object(
        'id', crs.id, 
        'courseName', crs.course_name,
        'reference', crs.reference,
        'isActive', crs.is_active,
        'createdAt', crs.created_at,
        'updatedAt', crs.updated_at
    )) AS courses

    from develop.organizational_unit ou
    inner join develop.course crs on crs.unit_id = ou.id

    where ou.id = :unitId

    group by
        ou.id

`
