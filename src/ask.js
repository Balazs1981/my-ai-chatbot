const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

console.log("Kulcs:", API_KEY);
console.log("Teszt:", "kulcs" + import.meta.env.VITE_OPENROUTER_KEY);  // Csak teszteléshez

async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const responseEl = document.getElementById("response");

  // Ellenőrizzük, hogy a felhasználó valóban beírt valamit
  console.log("User Input:", userInput);

  try {
    // Helyes kérés küldése
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct:free", // Ellenőrizd, hogy helyes a modell neve
        messages: [{ role: "user", content: userInput }]  // Itt a felhasználó inputját küldjük el
      })
    });

    if (!response.ok) throw new Error("Hiba a válasz során: " + response.status); // További hiba részletezés

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Nincs válasz"; // Kivonjuk a választ
    responseEl.innerText = aiReply; // Válasz megjelenítése a weboldalon

  } catch (error) {
    console.error(error);
    responseEl.innerText = "Hiba történt a válasz során: " + error.message; // Tovább specifikáljuk a hibaüzenetet
  }
}

window.askAI = askAI;
