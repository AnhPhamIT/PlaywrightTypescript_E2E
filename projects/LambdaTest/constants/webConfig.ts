export const WEB_CONFIG = {
    QA: {
        WEBAPP: process.env.WEBAPP,
        TESTAPP: process.env.TESTAPP,
        API_URL: process.env.API_URL,
        UserLOGIN: [
            {
                USERNAME: process.env.USERNAME,
                PASSWORD: process.env.PASSWORD
            }
        ]

    },
    PREPROD: {
        WEBAPP: process.env.PREPROD_WEBAPP,
        API_URL: process.env.PREPROD_API_URL,
    }
}