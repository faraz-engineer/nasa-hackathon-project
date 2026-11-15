import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Earth Trend Detective | Team TECH MAVERICKS - NASA Space Apps",
  description:
    "Empirical 20-Year Earth System Trend Detection Platform by Team TECH MAVERICKS for NASA Space Apps Challenge. Decoding Land Surface Temperature, deforestation, and orbital sustainability with mathematical precision.",
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
      <head suppressHydrationWarning>
        {/*
          Neutralise browser-extension attribute injection (e.g. Browsec bis_skin_checked)
          BEFORE React hydrates so the server HTML and client DOM stay in sync.
          Three layers of defence:
            1. Monkey-patch setAttribute to silently swallow extension attrs
            2. Strip already-present attrs immediately
            3. MutationObserver watches the whole document and removes attrs in real-time
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  var BAD = ['bis_skin_checked','data-bis_skin_checked'];
  /* 1 — Block future setAttribute calls for these attrs */
  var origSet = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n,v){
    if(BAD.indexOf(n) !== -1 || (typeof n === 'string' && n.startsWith('bis_'))) return;
    return origSet.apply(this, arguments);
  };
  /* 2 — Strip attrs already in the DOM right now */
  function strip(){
    for(var i=0;i<BAD.length;i++){
      var els = document.querySelectorAll('['+BAD[i]+']');
      for(var j=0;j<els.length;j++) els[j].removeAttribute(BAD[i]);
    }
  }
  strip();
  /* 3 — MutationObserver: continuous real-time removal before React sees the DOM */
  if(typeof MutationObserver !== 'undefined'){
    var mo = new MutationObserver(function(muts){
      for(var m=0;m<muts.length;m++){
        var t = muts[m].target;
        if(t && t.removeAttribute){
          for(var i=0;i<BAD.length;i++) t.removeAttribute(BAD[i]);
        }
      }
    });
    mo.observe(document.documentElement,{
      subtree: true,
      attributes: true,
      attributeFilter: BAD
    });
  }
  /* 4 — Also strip on DOMContentLoaded for any late injections */
  document.addEventListener('DOMContentLoaded', strip, {once:true});
}catch(e){}})();`,
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
          <div suppressHydrationWarning className="min-h-screen flex flex-col">
            <Navbar />
            <main suppressHydrationWarning className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
