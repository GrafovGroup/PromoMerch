import {site} from "../lib/site";
import {categories,products,categoryPath,productPath} from "../lib/catalog";
import {contentPages} from "../lib/content";
export default function sitemap(){
 if(!site.publicLaunch)return [];
 const urls:string[]=[];
 for(const locale of ["en","fr"] as const){
 urls.push(`/${locale}/`,`/${locale}/${locale==="en"?"products":"produits"}/`,`/${locale}/contact/`);
 categories.forEach(c=>urls.push(categoryPath(c,locale)));
 products.forEach(p=>urls.push(productPath(p,locale)));
 contentPages.forEach(p=>urls.push(`/${locale}/${p.slug[locale]}/`));
 }return [...new Set(urls)].map(path=>({url:site.origin+path}));
}
