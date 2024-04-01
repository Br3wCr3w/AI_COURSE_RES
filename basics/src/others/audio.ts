import { OpenAI } from 'openai'
import { writeFileSync, createReadStream } from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})


async function createTranscription() {
    const response = await openai.audio.transcriptions.create({
        file: createReadStream('AudioSample.mp3'),
        model: 'whisper-1',
        language: 'en'
    });
    console.log(response);
}

async function translate() {
    const reponse = await openai.audio.transcriptions.create({
        file: createReadStream('frenchsample.mp3'),
        model: 'whisper-1'
    })
}

async function textToSpeech() {
    const sampleText = `
    In the heart of an ancient cave system, carved by the passage of eons, lies a vast cavern that exudes an atmosphere of deep, palpable foreboding. The ground, transitioning to a smooth, almost polished stone, suggests the presence of something unnatural, something that belies the otherwise rough-hewn passages that have led here. The air within this expanse is markedly cooler, heavy with the weight of undisturbed millennia, and carries an unsettling silence that seems to muffle even the softest whispers of the adventurers as they enter. Above, the ceiling stretches into darkness, lost to shadows that swallow any light cast upwards, while the far reaches of the cavern extend beyond the reach of their torches, hinting at hidden depths and unseen corners. The walls themselves are adorned with ancient, enigmatic markings that speak of a time long forgotten, their meanings obscured by the passage of time. This cavern, with its eerie quiet and the sense of something lurking just beyond the edge of vision, stands as a silent guardian to secrets untold, waiting for the unwary to uncover what lies within.
    `;
    const response = await openai.audio.speech.create({
        input: sampleText,
        voice: 'fable',
        model: 'tts-1',
        response_format: 'mp3'
    })
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync('QuitSmoking.mp3', buffer);
}

textToSpeech()