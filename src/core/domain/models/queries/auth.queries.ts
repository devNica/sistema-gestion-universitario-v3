export const fetchAccountByUsernameQuery = (): string => `
    SELECT 

        uac.id,
        uac.username,
        uac.password as "passwordHashed",
        uac.state,
        uac.expires_in as "expiresIn",
        uac.personal_info as "personalInfo",
        rol.rol,
        rol.id as "rolId"

    FROM develop.user_account as uac
    INNER JOIN develop.user_has_role as uhr on uhr.user_id = uac.id
    INNER JOIN develop.rol as rol on rol.id = uhr.rol_id
    WHERE uac.username = :username or uac.id = :userId
`

export const verifyUserRolQuery = (): string => `
    SELECT 

        CASE
            WHEN COUNT(*) = 0 then 'false'
            else 'true'
        END AS verify

    FROM develop.user_has_role uhr 
    INNER JOIN develop.rol r on r.id = uhr.rol_id
    WHERE r.rol = :rol and uhr.user_id = :userId
`
