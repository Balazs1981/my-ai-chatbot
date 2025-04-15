const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

console.log("Kulcs:", API_KEY);
console.log("Teszt:", "kulcs" + import.meta.env.VITE_OPENROUTER_KEY); // Teszteléshez

async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const responseEl = document.getElementById("response");

  // Ellenőrizzük, hogy a felhasználó valóban beírt valamit
  console.log("User Input:", userInput);

  try {
    // API kérés elküldése
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct", // Győződjünk meg róla, hogy ez a helyes modell neve!
        messages: [
          {
            role: "user", // Felhasználói szerepkör
            content: userInput // A felhasználó beírt kérdése
          }
        ],
        temperature: 0.7, // Beállítható paraméterek (pl. random válaszok)
        max_tokens: 150 // Max. tokenek a válaszra (opcionális)
      })
    });

    // Hibák kezelése a válasz alapján
    if (!response.ok) {
      const errorData = await response.json(); // A hiba részletezése
      console.error("API Error:", errorData); // Hibák kiírása a konzolra
      throw new Error(`Hiba a válasz során: ${response.status} - ${errorData.error?.message || 'Ismeretlen hiba'}`);
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Nincs válasz"; // AI válasz feldolgozása
    responseEl.innerText = aiReply; // Válasz megjelenítése

  } catch (error) {
    console.error(error);
    responseEl.innerText = "Hiba történt a válasz során: " + error.message; // Hibát részletesebben
  }
}

window.askAI = askAI;
