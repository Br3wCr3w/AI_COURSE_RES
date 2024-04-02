import { OpenAI } from "openai";
import { writeFileSync, createReadStream } from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

async function createTranscription() {
  const response = await openai.audio.transcriptions.create({
    file: createReadStream("AudioSample.mp3"),
    model: "whisper-1",
    language: "en",
  });
  console.log(response);
}

async function translate() {
  const reponse = await openai.audio.transcriptions.create({
    file: createReadStream("frenchsample.mp3"),
    model: "whisper-1",
  });
}

async function textToSpeech() {
  const sampleText = `
  Eli, sometimes in life, you have to do things you don't want to do.
    `;
  const response = await openai.audio.speech.create({
    input: sampleText,
    voice: "onyx",
    model: "tts-1",
    response_format: "mp3",
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync("QuitSmoking.mp3", buffer);
}

textToSpeech();
