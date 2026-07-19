// Generate a clean, professional security team image to replace the watermarked one.
// Run with: bun run scripts/gen-security-image.ts
import ZAI from "z-ai-web-dev-sdk";
import { writeFileSync } from "fs";

async function main() {
  const zai = await ZAI.create();

  const prompt =
    "Professional African security team in dark navy uniforms standing alert at a modern corporate building entrance in Dar es Salaam Tanzania, diverse team of men and women, crisp uniforms with epaulettes, professional posture, warm golden hour lighting, high-end corporate photography, sharp focus, no text, no watermark, no logos";

  console.log("Generating security image...");
  const res = await zai.images.generations.create({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1792x1024",
  });

  // SDK returns { data: [{ base64 | url }] }
  const item = res?.data?.[0];
  if (!item) {
    console.error("No image data returned");
    process.exit(1);
  }

  const b64 = item.b64_json || item.base64;
  if (b64) {
    const buf = Buffer.from(b64, "base64");
    writeFileSync("public/images/subsidiaries/security.jpg", buf);
    console.log("Saved security.jpg from base64");
  } else if (item.url) {
    console.log("Fetching from URL:", item.url.slice(0, 80) + "...");
    const r = await fetch(item.url);
    if (!r.ok) throw new Error(`fetch failed: ${r.status}`);
    const ab = await r.arrayBuffer();
    writeFileSync("public/images/subsidiaries/security.jpg", Buffer.from(ab));
    console.log("Saved security.jpg from URL");
  } else {
    console.error("No url or base64 in response");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
