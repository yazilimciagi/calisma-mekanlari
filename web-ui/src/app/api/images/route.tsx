import cheerio from "cheerio";
import NodeURL from "url";
import { isValidUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    let image;

    if (url) {
      const res = await fetch(url, {
        cache: "force-cache",
        next: { revalidate: 7200 },
      });
      const html = await res.text();
      const $ = cheerio.load(html);

      const { host, protocol } = NodeURL.parse(url);

      const openGraphImage = $(`meta[property="og:image"]`).attr("content");

      if (openGraphImage) {
        if (openGraphImage.startsWith("data:")) image = null;
        else if (isValidUrl(openGraphImage)) image = openGraphImage;
        else {
          image = openGraphImage.replace("..", "");

          if (image[0] !== "/") image = `/${image}`;

          image = `${protocol}//${host}${image}`;
        }
      }
    }

    return NextResponse.json({ image: image });
  } catch (error) {
    return NextResponse.json({ image: "/fallback-image.png" });
  }
};
