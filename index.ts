import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  parse as parseCsv,
} from "https://deno.land/std@0.125.0/encoding/csv.ts";
import { post } from "https://deno.land/x/dishooks@v1.0.0/mod.ts";

const env = config();
const csvText = await fetch(env.DATA_SOURCE).then((r) => r.text());
const csv = await parseCsv(csvText);

const height = csv[csv.length - 1];

let title;

if (Number.parseInt(height[1]) > Number.parseInt(env.MAX_HEIGHT)) {
  title = "Down to the rowing room!";
} else {
  title = "To the river!";
}

await post(env.WEBHOOK_URL, {
  embeds: [
    {
      title: title,
      fields: [
        {
          name: "Height",
          value: `${height[1]}m`,
          inline: true,
        },
        {
          name: "Date",
          value: new Date(height[0]).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
          inline: true,
        },
      ],
    },
  ],
});
