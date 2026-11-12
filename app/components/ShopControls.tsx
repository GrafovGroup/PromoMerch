"use client";
import {useEffect,useState} from "react";
import {Check,Plus,Search,SlidersHorizontal} from "lucide-react";
import {products,categories,productPath,type Product} from "../../lib/catalog";
import {t,type Locale,route} from "../../lib/site";
export const QUOTE_KEY="promomerch-quote-v1";
export type QuoteLine={id:string,quantity:number};
export function readQuote():QuoteLine[]{
 try {const value=JSON.parse(localStorage.getItem(QUOTE_KEY)||"[]");return Array.isArray(value)?value.filter(x=>x&&products.some(p=>p.id===x.id)&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=100000):[];}catch{return [];}
}
export function addToQuote(id:string,quantity=1) {
 try {
 if(!products.some(p=>p.id===id))return false;
 quantity=Math.max(1,Math.min(100000,Math.floor(quantity)||1));
 const items=readQuote();const existing=items.find(x=>x.id===id);
 if(existing)existing.quantity=Math.min(100000,existing.quantity+quantity);
 else items.push({id,quantity});
 localStorage.setItem(QUOTE_KEY,JSON.stringify(items));
 window.dispatchEvent(new Event("promomerch-quote-change"));
 return true;
 }catch{return false;}
}
export function AddToQuote({id,locale,large=false}:{id:string,locale:Locale,large?:boolean}) {
 const [added,setAdded]=useState(false),[quantity,setQuantity]=useState(50),[storageError,setStorageError]=useState(false);
 useEffect(()=>{if(!added)return;const timer=setTimeout(()=>setAdded(false),2400);return()=>clearTimeout(timer);},[added]);
 return <div className={large?"add-quote-large":"add-quote-small"}>
  {large&&<label className="quantity-field">{t(locale,"Approximate quantity","Quantité approximative")}<input type="number" min={1} max={100000} step={1} value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(100000,Math.floor(Number(e.target.value))||1)))}/></label>}
  <button type="button" className={large?"button button-primary":"button-add"} onClick={()=>{const saved=addToQuote(id,large?quantity:50);setAdded(saved);setStorageError(!saved);}}>{added?<Check size={17}/>:<Plus size={17}/>} {added?t(locale,"ADDED TO YOUR QUOTE","AJOUTÉ À LA SOUMISSION"):t(locale,"ADD TO QUOTE","AJOUTER À LA SOUMISSION")}</button>
  {storageError&&<p className="form-note" role="alert">{t(locale,"Your browser could not save the list. You can include this item in your project brief.","Votre navigateur n’a pas pu enregistrer la sélection. Indiquez cet article dans la description du projet.")} <a href={route(locale,"quote")}>{t(locale,"Start a quote","Demander une soumission")}</a></p>}
  {large&&<a className="text-link" href={route(locale,"quote")}>{t(locale,"Review your quote list","Voir votre sélection")}</a>}
  <span className="sr-only" aria-live="polite">{added?t(locale,"Item added to quote list.","Article ajouté à votre sélection."):""}</span>
 </div>;
}
export function ProductCard({product,locale}:{product:Product,locale:Locale}) {
 const category=categories.find(x=>x.id===product.category);
 return <article className="product-card">
  <a className="product-image" href={productPath(product,locale)}><img src={product.image} srcSet={`${product.image.replace(".webp","-640.webp")} 640w, ${product.image} 1200w`} sizes="(max-width: 760px) 45vw, (max-width: 1100px) 46vw, 30vw" alt={t(locale,"Collection inspiration for ","Idées de collection : ")+product.name[locale]} width={640} height={480} loading="lazy"/><span className="image-tag">{t(locale,"MAKE IT YOURS","À VOTRE IMAGE")}</span></a>
  <div className="product-info"><span className="eyebrow">{category?.name[locale]}</span><h3><a href={productPath(product,locale)}>{product.name[locale]}</a></h3><p>{product.summary[locale]}</p><AddToQuote id={product.id} locale={locale}/></div>
 </article>;
}
export default function Catalog({locale,categoryId}:{locale:Locale,categoryId?:string}) {
 const [search,setSearch]=useState(""),[selected,setSelected]=useState(categoryId||"all"),[sort,setSort]=useState("curated");
 let filtered=products.filter(p=>(selected==="all"||p.category===selected)&&[p.name[locale],p.summary[locale],p.description[locale]].join(" ").toLocaleLowerCase(locale).includes(search.toLocaleLowerCase(locale)));
 if(sort==="az")filtered=[...filtered].sort((a,b)=>a.name[locale].localeCompare(b.name[locale],locale));
 return <div className="catalog-experience">
  <div className="catalog-toolbar"><label className="catalog-search"><Search size={20}/><span className="sr-only">{t(locale,"Search merchandise ideas","Rechercher des idées")}</span><input type="search" placeholder={t(locale,"Find your next favourite…","Trouvez votre prochain favori…")} value={search} onChange={e=>setSearch(e.target.value)}/></label>
   <label className="catalog-sort"><SlidersHorizontal size={17}/><span className="sr-only">{t(locale,"Sort products","Trier les articles")}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="curated">{t(locale,"Our selection","Notre sélection")}</option><option value="az">{t(locale,"Name A–Z","Nom A–Z")}</option></select></label>
  </div>
  <div className="filter-pills" aria-label={t(locale,"Filter by category","Filtrer par catégorie")}><button aria-pressed={selected==="all"} onClick={()=>setSelected("all")}>{t(locale,"All ideas","Toutes les idées")}</button>{categories.map(c=><button key={c.id} aria-pressed={selected===c.id} onClick={()=>setSelected(c.id)}>{c.name[locale]}</button>)}</div>
  <div className="catalog-results"><span aria-live="polite">{filtered.length} {t(locale,"merchandise ideas","idées d’articles")}</span><span>{t(locale,"Styles and branding selected with your quote.","Styles et personnalisation précisés dans votre soumission.")}</span></div>
  {filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p} locale={locale}/>)}</div>:<div className="empty-state"><h2>{t(locale,"Let’s try a different search.","Essayons une autre recherche.")}</h2><p>{t(locale,"Try a broader term or tell us what you have in mind.","Essayez un terme plus général ou décrivez-nous votre idée.")}</p><div className="empty-state-actions"><a className="button button-primary" href={route(locale,"quote")}>{t(locale,"TELL US WHAT YOU NEED","DÉCRIVEZ VOTRE BESOIN")}</a><button className="button button-secondary" onClick={()=>{setSearch("");setSelected("all");}}>{t(locale,"CLEAR FILTERS","EFFACER LES FILTRES")}</button></div></div>}
 </div>;
}

