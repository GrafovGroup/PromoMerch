import {site} from "../lib/site";
export default function robots(){return {rules:site.publicLaunch?{userAgent:"*",allow:"/",disallow:["/api/","/en/quote/","/fr/soumission/"]}:{userAgent:"*",disallow:"/"},sitemap:site.origin+"/sitemap.xml"};}
