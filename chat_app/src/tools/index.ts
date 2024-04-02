import OpenAI from "openai";
import { parse } from "path";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

function getTimeOfDay() {
    return '5:45';
}

function getOrderStatus(orderId: string) {
    console.log(`Order status for order ${orderId}`);
    const orderAsNumber = parseInt(orderId);
    if (orderAsNumber % 2 === 0) {
        return 'IN_PROGRESS';
    } else {
        return 'COMPLETED';
    }
}


async function callOpenAIWithTools() {
    const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: "You are a helpful assistant that gives information about the time and order status.",
        },
        {
            role: "user",
            content: "What is the status of order 1234?",
        }
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: context,
        tools: [
            {
                type: "function",
                function: {
                    name: "getTimeOfDay",
                    description: "Get the current time of day.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getOrderStatus",
                    description: "Get the status of an order.",
                    parameters: {
                        type: 'object',
                        properties: {
                            orderId: {
                                type: 'string',
                                description: 'The order ID to check the status of.',
                            },
                        },
                        required: ['orderId'],
                    },
                },
            }
        ],
        tool_choice: 'auto', // allow the model to decide if the tool should be used
    
    });

    // determine if the tool was used
    const willInvokeFunction = response.choices[0].finish_reason === 'tool_calls';
    const toolCall = response.choices[0].message.tool_calls![0];
    if (willInvokeFunction) {
        const toolName = toolCall.function.name;
        if(toolName === "getTimeOfDay") {
            const toolResponse = getTimeOfDay();
            context.push(response.choices[0].message);
            context.push({
                role: "tool",
                content: toolResponse,
                tool_call_id: toolCall.id,
            });
        }
        if(toolName === "getOrderStatus") {
            const rawArgument = toolCall.function.arguments;
            const parsedArguments = JSON.parse(rawArgument);
            const toolResponse = getOrderStatus(parsedArguments.orderId);
            context.push(response.choices[0].message);
            context.push({
                role: "tool",
                content: toolResponse,
                tool_call_id: toolCall.id,
            });
        }
    }
    const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: context,
    });

    console.log(secondResponse.choices[0].message.content);
}

callOpenAIWithTools();
// configure chat tools (first openAI call)
// decide if tool call is required
// invoke the tool
// make a second openAI call