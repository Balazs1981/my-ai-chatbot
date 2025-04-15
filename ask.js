const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.VITE_OPENROUTER_KEY;
console.log("Kulcs:", API_KEY);

async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const responseEl = document.getElementById("response");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct:free",
        messages: [{ role: "user", content: userInput }]
      })
    });

    if (!response.ok) throw new Error("Hiba a válasz során");

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Nincs válasz";
    responseEl.innerText = aiReply;

  } catch (error) {
    console.error(error);
    responseEl.innerText = "Hiba történt a válasz során.";
  }
}

window.askAI = askAI;
