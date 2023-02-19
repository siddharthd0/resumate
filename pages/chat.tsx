import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${question}\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    setAnswer(response.choices[0].text);
  };

  return (
    <div>
      <h1>Ask the AI</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ask a question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <button type="submit">Ask</button>
      </form>
      {answer && (
        <>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}
