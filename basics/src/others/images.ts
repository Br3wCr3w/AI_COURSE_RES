import { writeFileSync } from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

async function generateFreeImage() {
  const response = await openai.images.generate({
    prompt: "A serene image of a mountain lake at sunset",
    model: "dall-e-2",
    style: "vivid",
    size: "256x256",
    quality: "standard",
    n: 1,
  });
  console.log(response);
}

async function generateFreeLocalImage() {
  const response = await openai.images.generate({
    prompt: "A serene image of a mountain lake at sunset",
    model: "dall-e-2",
    style: "vivid",
    size: "256x256",
    quality: "standard",
    n: 1,
    response_format: "b64_json",
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    const buffer = Buffer.from(rawImage, "base64");
    writeFileSync("mountainLake.png", buffer);
  }
}

async function generateAdvancedLocalImage() {
  const response = await openai.images.generate({
    prompt: "A serene image of a mountain lake at sunset",
    model: "dall-e-3",
    style: "vivid",
    size: "256x256",
    quality: "standard",
    n: 1,
    response_format: "b64_json",
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    const buffer = Buffer.from(rawImage, "base64");
    writeFileSync("mountainLakeAdvanced.png", buffer);
  }
}
generateFreeLocalImage();
