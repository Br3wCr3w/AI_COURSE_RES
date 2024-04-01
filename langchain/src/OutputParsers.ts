import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser, CommaSeparatedListOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7
});

async function stringParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Write a short description for the following product: {product_name}'
    )
    
    const parser = new StringOutputParser();

    // creating a chain: connecting the prompt to the model
    const chain = prompt.pipe(model).pipe(parser);

    const reponse = await chain.invoke({
        product_name: 'bicycle',
    });

    console.log(reponse)
};

async function commaSeperatedParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Provide the first 5 ingredients, seperated by commas, for: {word}'
    )
    
    const parser = new CommaSeparatedListOutputParser();

    // creating a chain: connecting the prompt to the model
    const chain = prompt.pipe(model).pipe(parser);

    const reponse = await chain.invoke({
        word: 'bread',
    });

    console.log(reponse)
};


commaSeperatedParser();

