const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // ── Pass-through: existing static files ─────────────────────────────────
  // All 40 existing HTML pages — copied as-is, no template processing
  eleventyConfig.addPassthroughCopy("*.html");
  // Assets
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon");
  eleventyConfig.addPassthroughCopy("fonts");
  // Root-level files
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.webp");
  eleventyConfig.addPassthroughCopy("*.txt");
  eleventyConfig.addPassthroughCopy("*.xml");
  eleventyConfig.addPassthroughCopy("*.json");
  // CMS admin
  eleventyConfig.addPassthroughCopy("admin");
  // Netlify identity redirect snippet (needed for CMS login)
  eleventyConfig.addPassthroughCopy("_redirects");

  // ── Filters ─────────────────────────────────────────────────────────────
  // Romanian date: "12 martie 2026"
  eleventyConfig.addFilter("dateRO", (dateVal) => {
    return DateTime.fromJSDate(new Date(dateVal), { zone: "utc" })
      .setLocale("ro")
      .toFormat("d MMMM yyyy");
  });

  // ISO date for <time datetime="">
  eleventyConfig.addFilter("dateISO", (dateVal) => {
    return DateTime.fromJSDate(new Date(dateVal), { zone: "utc" })
      .toFormat("yyyy-MM-dd");
  });

  // Reading time estimate (200 words/min)
  eleventyConfig.addFilter("readingTime", (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min citire`;
  });

  // ── Only process Nunjucks and Markdown ─────────────────────────────────
  return {
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: false,          // don't re-process .html files
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "_data",
    },
  };
};
