import { NextResponse } from "next/server";

interface RequestBody {
  dish?: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Act like an experienced chef who knows everything about cuisine in the world.Give me step-by-step instructions to prepare ${body.dish}. If that is not a cuisine,tell me that it is not a cuisine and don't give further explanation.`,
        max_output_tokens: 550,
      }),
    });

    const aiResponse = await response.json();

    return NextResponse.json({ message: "Success", aiResponse });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return NextResponse.json({ message: "Request failed" }, { status: 500 });
  }
}




// {
//   "model": "gpt-4o-mini",
//   "input": "most dangerous animal in india."
// }

// {
//   "model": "gpt-4o-mini",
//   "input": "most dangerous animal in india.",
//   "temperature": 0.7,
//   "max_output_tokens": 17
// }

// https://api.openai.com/v1/responses

// Act like an experienced chef who knows everything about cuisine in the world.Give me step-by-step instructions to prepare dosa. If that is not a cuisine,tell me that it is not a cuisine and don't give further explanation.