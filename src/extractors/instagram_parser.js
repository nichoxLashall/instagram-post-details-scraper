import axios from 'axios';
import { extractTimestamp } from './utils_time.js';

/**
* This simulates scraping by calling a sample Instagram oEmbed API.
* In real scraping, you would replace this with HTML parsing / API logic.
*/
export default async function parseInstagramPost(postUrl) {
try {
const oembedUrl = `https://graph.facebook.com/v12.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=IGQVJW`;
const { data } = await axios.get(oembedUrl);

return {
post_id: data.media_id || null,
short_code: data.thumbnail_url ? extractCode(postUrl) : null,
username: data.author_name || null,
thumbnail_url: data.thumbnail_url || null,
is_affiliate: false,
is_paid_partnership: false,
is_ad: false,
like_count: null,
comment_count: null,
video_view_count: null,
post_date: extractTimestamp(data.upload_date),
display_url: data.thumbnail_url || null,
alt: data.title || null,
caption: data.title || null,
owner: {
username: data.author_name || "",
is_verified: false
},
latest_comments: []
};
} catch (err) {
console.error("Parsing failed:", err.message);
return { error: true, url: postUrl };
}
}

function extractCode(url) {
const parts = url.split('/');
return parts.filter(Boolean).pop();
}