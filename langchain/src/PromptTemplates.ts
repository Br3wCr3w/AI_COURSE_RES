import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_API_KEY,
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7
});

async function fromTemplate() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Write a short description for the following product: {product_name}'
    )
    // const wholePrompt = await prompt.format({
    //     product_name: 'bicycle'
    // });

    // creating a chain: connecting the prompt to the model
    const chain = prompt.pipe(model);

    const reponse = await chain.invoke({
        product_name: 'bicycle',
    });

    console.log(reponse)
};

async function fromMessage() {
    const prompt = ChatPromptTemplate.fromMessages([
        ['system', 'Write a short description for the product provided by the user'],
        ['human', '{product_name}']
    ])
    // creating a chain: connecting the prompt to the mode
    const chain = prompt.pipe(model);

    const result = await chain.invoke({
        product_name: 'bicycle'
    })

    console.log(result);
}

fromMessage();

