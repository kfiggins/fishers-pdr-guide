import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/" }, { userAgent: "OAI-SearchBot", allow: "/" }, { userAgent: "GPTBot", allow: "/" }], sitemap: "https://fishersdentrepair.com/sitemap.xml" }; }
