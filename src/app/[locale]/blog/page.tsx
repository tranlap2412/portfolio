import BlurFade from "@/components/magicui/blur-fade";
import React from "react";
import BlogSectionLarge from "@/components/blog/blog-section-large";
import { initLingui } from "@/i18n/init";
import { resolveLocale } from "@/i18n/locales";
import { t } from "@/i18n/t";

const BLUR_FADE_DELAY = 0.04;

export default function Page({ params }: { params: { locale: string } }) {
  const i18n = initLingui(resolveLocale(params.locale));
  return (
    <main>
      <section id="blog">
        <div className="space-y-12 w-full pb-12">
          {/* Header */}
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {t(i18n, "Blockchain & Web3 News")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t(i18n, "Explore the Latest in Crypto")}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl mx-auto">
                  {t(
                    i18n,
                    "Stay informed with the newest stories and developments in blockchain, Web3, and decentralized finance — curated in real time from trusted sources across the crypto ecosystem.",
                  )}
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Blog list (with filter + pagination) */}
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <BlogSectionLarge />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
