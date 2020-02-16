const GhostAdminApi = require('@tryghost/admin-api');

(async function main() {
    try {
        const api = new GhostAdminApi({
            url: process.env.url,
            key: process.env.key,
            version: 'canary'
        });

        await api.themes.upload({file: process.env.path});
        console.log(`${process.env.path} successfully uploaded.`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}());
