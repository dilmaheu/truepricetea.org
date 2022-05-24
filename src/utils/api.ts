export const url = "https://cms.truepricetea.nl";

export async function getSiteContent(lang: "en" | "de" | "nl" = "en") {
  const response = await fetch(
    `${url}/api/site-information?populate=conclusions&populate=table.table_row&locale=${lang}`
  );
  const res = await response.json();
  return { ...res, lang, url };
}

export async function getSiteMetatags(lang: "en" | "de" | "nl" = "en") {
  const response = await fetch(
    `${url}/api/site-metatag?populate=thumbnail&populate=favicon&locale=${lang}`
  );
  const res = await response.json();
  return { ...res, lang, url };
}

export interface MetatagsProps {
  metatags: {
    // LOCAL VARS
    url: string;
    lang: string;
    // FROM API
    data: {
      id: number;
      attributes: {
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string;
        thumbnail: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              caption: string;
              width: any;
              height: any;
              formats: any;
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: any;
              provider: string;
              provider_metadata: any;
              createdAt: string;
              updatedAt: string;
            };
          };
        };
        favicon: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              caption: string;
              width: any;
              height: any;
              formats: any;
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: any;
              provider: string;
              provider_metadata: any;
              createdAt: string;
              updatedAt: string;
            };
          };
        };
      };
    };
  };
}
