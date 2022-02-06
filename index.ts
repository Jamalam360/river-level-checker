import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  parse as parseCsv,
} from "https://deno.land/std@0.125.0/encoding/csv.ts";

const env = config();
const csvText = await fetch(env.DATA_SOURCE).then((r) => r.text());
const csv = await parseCsv(csvText);

const height = csv[csv.length - 1];

let content;

if (Number.parseInt(height[1]) > Number.parseInt(env.MAX_HEIGHT)) {
  content = `We cannot row, the height is ${height[1]}m as of ${
    new Date(height[0]).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }`;
} else {
  content = `We can row, the height is ${height[1]}m as of ${
    new Date(height[0]).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }`;
}

const req = await fetch(env.WEBHOOK_URL, {
  method: "POST",
  body: JSON.stringify({
    content: content,
  }),
  headers: {
    "Content-Type": "application/json",
  },
});
