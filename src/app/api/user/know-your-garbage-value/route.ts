import { systemPromt } from "@/constants/prompts";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ImageAnalysis = z.object({
  productTitle: z.string(),
  treesSaved: z.number(),
  benefitsOfRecycling: z.string(),
  estimatedRecycledValue: z.number(),
  creditPoints: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const category = formData.get("category");
    const weight = formData.get("weight");
    const description = formData.get("description");

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: systemPromt,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and provide a detailed description.
                    category: ${category}
                    weight: ${weight}                
                    description: ${description}
                    `,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],

      response_format: zodResponseFormat(ImageAnalysis, "details"),
    });

    return NextResponse.json({ analysis: response.choices[0].message.parsed });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
