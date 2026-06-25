const urlstore = new Map();

const shorturl = async (req, res) => {
    try {
        const { url, validity, shortcode } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "URL required"
            });
        }

        let shortid = shortcode || Math.random().toString(36).substring(2, 7);

        if (urlstore.has(shortid)) {
            return res.status(409).json({
                error: "Shortcode already exists"
            });
        }

        const expiryd = new Date(
            Date.now() + (validity || 30) * 60 * 1000
        );

        urlstore.set(shortid, {
            url,
            expiry: expiryd
        });

        return res.status(201).json({
            shortlink: `http://localhost:3000/url/${shortid}`,
            expiry: expiryd.toISOString()
        });

    } catch (err) {
        return res.status(500).json({
            error: "Error occurred while creating URL"
        });
    }
};
const redirectUrl = async (req, res) => {
    const { shortcode } = req.params;

    if (!urlstore.has(shortcode)) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    const data = urlstore.get(shortcode);

    res.redirect(data.url);
}
module.exports = { shorturl,redirectUrl };