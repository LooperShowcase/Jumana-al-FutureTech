let conversationhistory;
conversationhistory = [
  { role: "user", content: "hi will always give you  how happy i am out of 10 but you use this number only when it is relevent " },
  
  { role: "assistant", content: " hi, how can i help you" },
];

async function conversationUserAdd(question, happiness) {
  conversationhistory.push({ role: "user", content: "My Happiness out of 10: " + (happiness) + " . " + "My input is: " + question });
}

async function conversationAssistantAdd(answer) {
  conversationhistory.push({ role: "assistant", content: answer });
}

async function GTP_talk(question) {
  var data = {
    model: "gpt-3.5-turbo",
    messages: conversationhistory,
  };
  var url = "https://api.openai.com/v1/chat/completions";
  var apikey1 = "sk-jewzlrJimdKCWoNC";
  var apikey2 = "x6CUT3BlbkFJ7rh";
  var apikey3 = "AWckdyi3eQRL4AA4w";
  var apiKey = apikey1 + apikey2 + apikey3;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      conversationAssistantAdd(message); // Add GPT's response to the conversation history

      const utterance = new SpeechSynthesisUtterance(message); // Create the audio object
      speechSynthesis.speak(utterance); // Play the audio
      console.log(message);
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}
