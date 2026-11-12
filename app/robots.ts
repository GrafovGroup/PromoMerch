import {site} from "../lib/site";
// Quote/reorder pages must remain crawlable for their noindex metadata to be read.
export default function robots(){return {rules:site.publicLaunch?{userAgent:"*",allow:"/",disallow:["/api/"]}:{userAgent:"*",disallow:"/"},sitemap:site.origin+"/sitemap.xml"};}
