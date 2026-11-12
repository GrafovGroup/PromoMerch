import type {Metadata} from "next";
import {headers} from "next/headers";
import {site} from "../lib/site";
import "./globals.css";
export const metadata:Metadata={
 metadataBase:new URL(site.origin),
 title:{default:"PromoMerch | Branded merchandise for Canadian teams",template:"%s | PromoMerch"},
 description:"Branded apparel, promotional products and gift kits for Canadian businesses, teams and events.",
 robots:site.publicLaunch?{index:true,follow:true}:{index:false,follow:false},
 icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon.ico",sizes:"any"},{url:"/icon-192.png",type:"image/png",sizes:"192x192"}],apple:"/apple-touch-icon.png",shortcut:"/favicon.ico"},
 manifest:"/site.webmanifest",
 openGraph:{siteName:"PromoMerch",type:"website",images:[{url:"/images/hero-merch.webp",width:1536,height:1024,alt:"PromoMerch merchandise collection"}]},
};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const h=await headers();const locale=h.get("x-promomerch-locale")==="fr"?"fr-CA":"en-CA";
 return <html lang={locale}><body>{children}</body></html>;
}
