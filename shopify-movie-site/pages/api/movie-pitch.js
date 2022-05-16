import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.MOVIE_KEY,
});
const openai = new OpenAIApi(configuration);

//request, aka "req" - When the page pings movie-pitch it has whatever info they send along with it, in our case it'll have the suggestion from user
//response, aka "res" - what is being sent back
export default async (req, res) => {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: "I want a movie description for " + req.body.suggestion,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  // response.data.pitch
  res.status(200).json({ pitch: completion.data.choices[0].text });
};
