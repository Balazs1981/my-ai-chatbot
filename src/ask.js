const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

console.log("Kulcs:", API_KEY);
console.log("Teszt:", "kulcs" + API_KEY);

async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const responseEl = document.getElementById("response");

  console.log("User Input:", userInput);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct", // Groq egyik támogatott modellje
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(`Hiba a válasz során: ${response.status} - ${data.error?.message || "Ismeretlen hiba"}`);
    }

    const aiReply = data.choices?.[0]?.message?.content || "Nincs válasz";
    responseEl.innerText = aiReply;

  } catch (error) {
    console.error(error);
    responseEl.innerText = "Hiba történt a válasz során.";
  }
}

window.askAI = askAI;
