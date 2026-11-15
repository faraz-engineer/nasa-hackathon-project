import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "TerraMetrics: Earth System Trend Detective",
  description:
    "Analyze 20 years of satellite data. Compare global environmental shifts, track deforestation, and decode regional heatwaves with mathematical precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var o=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(typeof n==='string'&&(n==='bis_skin_checked'||n.indexOf('bis_')===0)){return}return o.apply(this,arguments)};if(typeof document!=='undefined'){var c=function(){var e=document.querySelectorAll('[bis_skin_checked]');for(var i=0;i<e.length;i++){e[i].removeAttribute('bis_skin_checked')}};c();if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',c,{once:true})}}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
