import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "Esther Moon",
  description: "Esther Moon",
  // canonical: "",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "",
    title: "Esther Moon",
    site_name: "Esther Moon",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "Esther Moon",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "Esther Moon",
    },
    {
      name: "msapplication-tooltip",
      content: "Esther Moon",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
