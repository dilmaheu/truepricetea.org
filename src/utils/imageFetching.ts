import { writeFileSync } from "fs";
import * as http from "http";
import * as https from "https";
import * as stream from "stream";
import fetch from "node-fetch";

import { Content } from "./api";

const Stream = stream.Transform;

// Download Image Helper Function
const downloadImageFromURL = (url: string, filename: string) => {
  let client: typeof http | typeof https = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client
    .request(url, function (response) {
      let data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        writeFileSync("./public/assets/cms/" + filename, data.read());
      });
    })
    .end();
};

type langT = "en" | "de" | "nl";

const url = "https://cms.truepricetea.org";

async function getSiteContent(lang: langT = "en"): Promise<Content> {
  const response = await fetch(
    `${url}/api/site-information?populate=conclusions&populate=table.table_row&populate=graph.graph_data&populate=circle_graphs.circle_graph_group&populate=footer.footer_logos&populate=teacup_graph.teacup_graph_item&locale=${lang}`
  );
  return (await response.json()) as Promise<Content>;
}

const langs: langT[] = ["en", "de", "nl"];
for (let i = 0; i < langs.length; i++) {
  const lang = langs[i];
  const res = await getSiteContent(lang);
  const footerImgLinks = res.data.attributes.footer.footer_logos.data;
  for (let i = 0; i < footerImgLinks.length; i++) {
    const link = url + footerImgLinks[i].attributes.url;
    const name = footerImgLinks[i].attributes.name;
    downloadImageFromURL(link, name);
  }
}
