export const fetchAccountByUsernameQuery = (): string => `
    SELECT 

        uac.id,
        uac.username,
        uac.password,
        uac.state,
        uac.expires_in as "expiresIn",
        pif.firstname,
        pif.lastname,
        pif.phone_number,
        rol.rol

    FROM develop.user_account as uac
    INNER JOIN develop.personal_info as pif on pif.id = uac.profile_id
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
