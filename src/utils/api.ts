export const url = "https://cms.truepricetea.org";

export async function getSiteContent(lang: "en" | "de" | "nl" = "en") {
  const response = await fetch(
    `${url}/api/site-information?populate=conclusions&populate=table.table_row&populate=graph.graph_data&populate=circle_graphs.circle_graph_group&populate=footer.footer_logos&populate=teacup_graph.teacup_graph_item&locale=${lang}`
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

export interface Content {
  // LOCAL VARS
  url: string;
  lang: string;
  // FROM API
  data: {
    id: number;
    attributes: {
      title: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      conclusions_title: string;
      conclusion_description: string;
      teacup_description: string;
      conclusions: conclusion[];
      table: table[];
      graph: { id: number; title: string; graph_data: graph[] };
      circle_graphs: {
        id: number;
        circle_graph_group: circle_graph[];
      }[];
      footer: {
        id: number;
        text: string;
        footer_logos: {
          data: {
            id: number;
            attributes: imgAttributes;
          }[];
        };
      };
      teacup_graph: TeacupGraph[];
    };
  };
}

export type TeacupGraph = {
  id: number;
  description: string;
  teacup_graph_item: teacup_graph_item[];
};

export type imgAttributes = {
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

export type teacup_graph_item = {
  id: number;
  text: string;
  percentage: number;
  color: string;
};

export type circle_graph = {
  id: number;
  title: string;
  percentage: number;
  description: string;
  color: string;
};

export type conclusion = {
  id: number;
  conclusion: string;
};

export type table = {
  id: number;
  table_row: {
    id: number;
    externality: string;
    true_cost: number;
    unit: string;
    true_cost_percentage: number;
    color: string;
  }[];
};

export type graph = {
  id: number;
  title: string;
  true_cost_percentage: number;
  color: string;
};

export interface Metatags {
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
          attributes: imgAttributes;
        };
      };
      favicon: {
        data: {
          id: number;
          attributes: imgAttributes;
        };
      };
    };
  };
}
