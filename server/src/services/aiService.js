import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

// High quality food image mapper for AI recipes based on cuisine/ingredients
function getAiFoodImage(cuisine, title, ingredients) {
  const text = `${cuisine} ${title} ${ingredients}`.toLowerCase();
  if (text.includes('palak') || text.includes('spinach')) {
    return '/images/recipes/palak-paneer.jpg';
  } else if (text.includes('paneer')) {
    return '/images/recipes/paneer-butter-masala.jpg';
  } else if (text.includes('biryani') || text.includes('pulao') || text.includes('rice')) {
    return '/images/recipes/hyderabadi-dum-veg-biryani.jpg';
  } else if (text.includes('dosa')) {
    return '/images/recipes/crispy-masala-dosa.jpg';
  } else if (text.includes('idli')) {
    return '/images/recipes/fluffy-idli-sambar.jpg';
  } else if (text.includes('pav bhaji')) {
    return '/images/recipes/mumbai-pav-bhaji.jpg';
  } else if (text.includes('vada pav')) {
    return '/images/recipes/mumbai-vada-pav.jpg';
  } else if (text.includes('sabudana') || text.includes('farali') || text.includes('vrat')) {
    return '/images/recipes/sabudana-khichdi.jpg';
  } else if (text.includes('dhokla') || text.includes('khandvi')) {
    return '/images/recipes/khaman-dhokla.jpg';
  } else if (text.includes('paratha') || text.includes('thepla') || text.includes('roti') || text.includes('bread')) {
    return '/images/recipes/classic-aloo-paratha.jpg';
  } else if (text.includes('dal') || text.includes('curry') || text.includes('sambar')) {
    return '/images/recipes/dal-makhani.jpg';
  } else if (text.includes('chaat') || text.includes('pani puri') || text.includes('bhel')) {
    return '/images/recipes/classic-pani-puri.jpg';
  } else if (text.includes('sweet') || text.includes('halwa') || text.includes('kheer') || text.includes('dessert') || text.includes('jamun')) {
    return '/images/recipes/classic-gulab-jamun.jpg';
  }
  return '/images/recipes/paneer-butter-masala.jpg';
}

/**
 * Intelligent culinary synthesis engine that produces authentic Indian recipe
 * when Gemini API key is not configured or as instant fallback.
 */
function synthesizeLocalRecipe({ ingredients, cuisine, mealType, dietaryPreference, cookingTime, difficulty }) {
  const ingList = (ingredients || 'mixed vegetables, spices')
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);

  const mainIng = ingList[0] || 'Vegetables';
  const secIng = ingList[1] || '';
  const selectedCuisine = cuisine || 'Indian';
  const selectedMeal = mealType || 'Dinner';
  const selectedDiet = dietaryPreference || 'Vegetarian';
  const selectedDiff = difficulty || 'Medium';

  // Capitalize helpers
  const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  // Generate authentic title
  let title = '';
  if (selectedDiet.toLowerCase().includes('farali') || selectedDiet.toLowerCase().includes('fasting')) {
    title = `Farali ${cap(mainIng)} ${secIng ? cap(secIng) + ' ' : ''}Special`;
  } else if (selectedCuisine.toLowerCase() === 'gujarati') {
    title = `Kathiyawadi ${cap(mainIng)} ${secIng ? '& ' + cap(secIng) + ' ' : ''}Shaak`;
  } else if (selectedCuisine.toLowerCase() === 'punjabi') {
    title = `Dhaba Style ${cap(mainIng)} ${secIng ? cap(secIng) + ' ' : ''}Masala`;
  } else if (selectedCuisine.toLowerCase() === 'south indian') {
    title = `Chettinad ${cap(mainIng)} ${secIng ? '& ' + cap(secIng) + ' ' : ''}Karuveppilai Roast`;
  } else if (selectedCuisine.toLowerCase() === 'rajasthani') {
    title = `Marwadi ${cap(mainIng)} ${secIng ? cap(secIng) + ' ' : ''}Mughlai Korma`;
  } else {
    title = `Aromatic ${selectedCuisine} ${cap(mainIng)} ${secIng ? '& ' + cap(secIng) + ' ' : ''}${selectedMeal}`;
  }

  // Parse cooking minutes
  let cookMin = 25;
  if (cookingTime && cookingTime.includes('15')) cookMin = 15;
  else if (cookingTime && cookingTime.includes('30')) cookMin = 25;
  else if (cookingTime && cookingTime.includes('60')) cookMin = 45;

  const prepMin = Math.max(10, Math.round(cookMin * 0.5));

  // Build ingredient objects
  const recipeIngredients = ingList.map((item, idx) => ({
    name: cap(item),
    quantity: idx === 0 ? "2" : idx === 1 ? "1" : "1/2",
    unit: idx === 0 ? "cups" : idx === 1 ? "cup" : "tbsp"
  }));

  // Add staple spices & aromatics
  if (!selectedDiet.toLowerCase().includes('farali')) {
    recipeIngredients.push(
      { name: "Cumin seeds (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Turmeric powder & Red chilli powder", quantity: "1", unit: "tsp each" },
      { name: "Garam masala & Coriander powder", quantity: "1", unit: "tsp each" },
      { name: "Fresh green chillies & ginger", quantity: "1", unit: "tbsp minced" },
      { name: "Cooking oil or Desi Ghee", quantity: "2", unit: "tbsp" },
      { name: "Fresh coriander leaves", quantity: "2", unit: "tbsp chopped" }
    );
  } else {
    recipeIngredients.push(
      { name: "Sendha Namak (Rock Salt)", quantity: "1", unit: "tsp" },
      { name: "Roasted Cumin powder (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Green chillies (finely minced)", quantity: "2", unit: "pieces" },
      { name: "Pure Desi Ghee", quantity: "2", unit: "tbsp" },
      { name: "Fresh coriander & Lemon juice", quantity: "1", unit: "tbsp each" }
    );
  }

  const steps = [
    {
      step_number: 1,
      title: "Preparation & Mise en Place",
      instruction: `Rinse and dice the primary ingredients (${ingList.join(', ')}). Measure all ground spices and keep aromatics finely chopped.`,
      timer_seconds: 300,
      tip: "Pre-chopping ensures spices don't burn while cooking."
    },
    {
      step_number: 2,
      title: "Aromatics & Tempering",
      instruction: `Heat oil or ghee in a heavy pan over medium heat. Crackle cumin seeds and sauté green chillies and ginger until fragrant for 2 minutes.`,
      timer_seconds: 120,
      tip: "Sauté on medium flame so whole spices release their essential oils without blackening."
    },
    {
      step_number: 3,
      title: `Cook ${cap(mainIng)} with Spices`,
      instruction: `Add ${ingList.join(' and ')} to the tempering. Sprinkle turmeric, red chilli powder, coriander powder, and salt. Stir to coat evenly.`,
      timer_seconds: 180,
      tip: "Tossing on high heat for 1 minute locks in moisture and caramelizes edges."
    },
    {
      step_number: 4,
      title: "Simmer to Perfection",
      instruction: `Add 1/2 cup of warm water, cover with a tight lid, and reduce the heat. Simmer gently for ${cookMin - 10} minutes until tender and flavours meld.`,
      timer_seconds: (cookMin - 10) * 60,
      tip: "Simmering on low heat allows spices to permeate thoroughly."
    },
    {
      step_number: 5,
      title: "Garnish and Finish",
      instruction: `Uncover, stir in garam masala and lemon juice. Garnish generously with freshly chopped coriander leaves. Serve hot.`,
      timer_seconds: 60,
      tip: "Always add fresh lemon juice at the end after turning off heat to preserve vitamin C and bright taste."
    }
  ];

  return {
    name: title,
    image: getAiFoodImage(selectedCuisine, title, ingredients),
    description: `A fragrant, chef-inspired ${selectedCuisine} dish featuring ${ingList.join(', ')} thoughtfully prepared in under ${cookMin + prepMin} minutes.`,
    cuisine: selectedCuisine,
    region: "AI Kitchen Studio",
    servings: 3,
    prep_time: prepMin,
    cook_time: cookMin,
    difficulty: selectedDiff,
    dietary_tags: [selectedDiet, "AI Generated"],
    rating: 4.8,
    calories: 280,
    protein: 9,
    carbs: 34,
    fat: 11,
    is_ai_generated: true,
    disclaimer: "AI Generated Recipe. Please verify allergen and fasting rules before cooking according to personal dietary traditions.",
    tips: "For richer texture, consider adding a tablespoon of roasted cashew paste or whisked curd during simmering.",
    serving_suggestions: "Pair with hot phulkas, jeera rice, or crispy papad.",
    ingredients: recipeIngredients,
    steps: steps
  };
}

/**
 * Generate Recipe using Gemini API or Local Synthesis Engine
 */
export async function generateRecipe(params) {
  if (GEMINI_API_KEY) {
    try {
      const prompt = `You are a Master Indian Chef for RasoiVerse. Create an authentic, mouth-watering Indian recipe in strict JSON format based on:
- Available Ingredients: ${params.ingredients || 'vegetables, spices'}
- Preferred Cuisine: ${params.cuisine || 'Indian'}
- Meal Type: ${params.mealType || 'Dinner'}
- Dietary Preference: ${params.dietaryPreference || 'Vegetarian'}
- Max Cooking Time: ${params.cookingTime || 'Under 30 minutes'}
- Difficulty: ${params.difficulty || 'Medium'}

Return ONLY a valid JSON object matching this structure (no markdown fences, no extra text):
{
  "name": "Recipe Name",
  "description": "2-3 sentence enticing description",
  "cuisine": "${params.cuisine || 'Indian'}",
  "region": "Region name",
  "servings": 4,
  "prep_time": 15,
  "cook_time": 25,
  "difficulty": "Easy|Medium|Hard",
  "dietary_tags": ["Vegetarian", "Farali if applicable", "AI Generated"],
  "calories": 320,
  "protein": 10,
  "carbs": 40,
  "fat": 12,
  "tips": "Chef secret cooking tip",
  "serving_suggestions": "What to serve with",
  "ingredients": [
    { "name": "Ingredient name", "quantity": "1", "unit": "cup/tsp/tbsp" }
  ],
  "steps": [
    {
      "step_number": 1,
      "title": "Step Title",
      "instruction": "Detailed instruction",
      "timer_seconds": 180,
      "tip": "Step tip"
    }
  ]
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          parsed.image = getAiFoodImage(parsed.cuisine || params.cuisine, parsed.name, params.ingredients);
          parsed.is_ai_generated = true;
          parsed.disclaimer = "AI Generated Recipe. Please verify allergen and fasting rules before cooking according to personal dietary traditions.";
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Gemini API call failed, falling back to local synthesis engine:', error.message);
    }
  }

  // Fallback synthesis
  return synthesizeLocalRecipe(params);
}

/**
 * Parse Natural Language Ingredients
 * e.g. "I have potato and curd. What can I make?" -> ["potato", "curd"]
 */
export async function parseNaturalLanguageIngredients(text) {
  if (!text) return [];

  // If Gemini is available
  if (GEMINI_API_KEY) {
    try {
      const prompt = `Extract all cooking food ingredients from this sentence as a JSON array of clean lowercase strings (e.g. ["potato", "curd"]): "${text}". Return ONLY JSON array.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (response.ok) {
        const data = await response.json();
        const resText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (resText) {
          const parsed = JSON.parse(resText);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
  }

  // Rule-based NLP extraction
  const lower = text.toLowerCase();
  const knownIngredients = [
    'potato', 'potatoes', 'aloo', 'batata',
    'tomato', 'tomatoes', 'tamatar',
    'onion', 'onions', 'pyaz',
    'paneer', 'cottage cheese',
    'rice', 'chawal', 'basmati',
    'curd', 'dahi', 'yoghurt',
    'sabudana', 'sago', 'tapioca',
    'peanuts', 'sing', 'moongphali',
    'besan', 'gram flour',
    'spinach', 'palak',
    'garlic', 'lasun', 'ginger', 'adrak',
    'chilli', 'chilli', 'mirchi',
    'coriander', 'dhaniya',
    'lemon', 'nimbu',
    'rajma', 'kidney beans',
    'chana', 'chickpeas', 'chole',
    'moong dal', 'urad dal', 'toor dal',
    'rava', 'suji', 'semolina',
    'ghee', 'butter', 'makhan',
    'milk', 'doodh',
    'cashew', 'kaju',
    'fenugreek', 'methi',
    'mustard', 'sarson',
    'cumin', 'jeera',
    'capsicum', 'bell pepper',
    'sweet potato', 'shakarkandi',
    'makhana', 'foxnut',
    'rajgira', 'amaranth', 'singhara',
    'papad', 'sev', 'murmura', 'bhel', 'bread', 'pav'
  ];

  const extracted = new Set();
  for (const item of knownIngredients) {
    const regex = new RegExp(`\\b${item}\\b`, 'i');
    if (regex.test(lower)) {
      // Map synonyms
      if (item === 'potatoes' || item === 'aloo' || item === 'batata') extracted.add('potato');
      else if (item === 'tomatoes' || item === 'tamatar') extracted.add('tomato');
      else if (item === 'onions' || item === 'pyaz') extracted.add('onion');
      else if (item === 'dahi' || item === 'yoghurt') extracted.add('curd');
      else if (item === 'cottage cheese') extracted.add('paneer');
      else if (item === 'chawal') extracted.add('rice');
      else if (item === 'chole' || item === 'chana') extracted.add('chickpeas');
      else extracted.add(item);
    }
  }

  return Array.from(extracted);
}

/**
 * Rasoi Voice Assistant Query Answering - Multilingual (English, Hindi, Gujarati)
 */
export async function answerVoiceAssistantQuery({ recipeTitle, currentStepNumber, currentStepInstruction, command, language = 'en' }) {
  const raw = command || '';
  const cmd = raw.toLowerCase().trim();

  // 1. NEXT STEP COMMANDS
  const isNext = 
    cmd.includes('next') || cmd.includes('forward') || cmd.includes('continue') ||
    cmd.includes('aage') || cmd.includes('agla') || cmd.includes('agle') ||
    raw.includes('अगला') || raw.includes('आगे') || raw.includes('नेक्स्ट') || raw.includes('अगले चरण') || raw.includes('आगे बढ़ो') ||
    cmd.includes('aagal') || cmd.includes('pachhi') ||
    raw.includes('આગળ') || raw.includes('આગળનું') || raw.includes('આગળ વધો') || raw.includes('પછીનું');

  if (isNext) {
    return {
      action: 'NEXT_STEP',
      reply: language === 'hi' 
        ? 'अगले चरण पर जा रहे हैं।' 
        : language === 'gu' 
        ? 'આગળના પગલા પર જઈ રહ્યા છીએ.' 
        : 'Moving to the next step.'
    };
  }

  // 2. PREVIOUS STEP COMMANDS
  const isPrev = 
    cmd.includes('previous') || cmd.includes('back') || cmd.includes('last step') ||
    cmd.includes('piche') || cmd.includes('pichhla') || cmd.includes('pichla') ||
    raw.includes('पिछला') || raw.includes('पीछे') || raw.includes('प्रीवियस') || raw.includes('पिछले चरण') || raw.includes('पीछे जाओ') ||
    cmd.includes('pachhal') || cmd.includes('paachhal') ||
    raw.includes('પાછળ') || raw.includes('પાછળનું') || raw.includes('પાછલા પગલા') || raw.includes('પાછળ જાઓ');

  if (isPrev) {
    return {
      action: 'PREVIOUS_STEP',
      reply: language === 'hi' 
        ? 'पिछले चरण पर लौट रहे हैं।' 
        : language === 'gu' 
        ? 'પાછલા પગલા પર પાછા જઈ રહ્યા છીએ.' 
        : 'Going back to the previous step.'
    };
  }

  // 3. REPEAT STEP COMMANDS
  const isRepeat = 
    cmd.includes('repeat') || cmd.includes('again') || cmd.includes('say again') ||
    cmd.includes('dobara') || cmd.includes('phir se') || cmd.includes('fir se') ||
    raw.includes('दोबारा') || raw.includes('फिर से') || raw.includes('रिपीट') || raw.includes('यह चरण दोबारा बताओ') || raw.includes('फिर से बोलो') || raw.includes('सुनाओ') ||
    cmd.includes('fari') || cmd.includes('farithi') ||
    raw.includes('ફરીથી') || raw.includes('ફરી બોલો') || raw.includes('આ પગલું ફરીથી') || raw.includes('રિપીટ') || raw.includes('ફરીથી સમજાવો');

  if (isRepeat) {
    return {
      action: 'REPEAT_STEP',
      reply: language === 'hi' 
        ? `चरण ${currentStepNumber}: ${currentStepInstruction}` 
        : language === 'gu' 
        ? `પગલું ${currentStepNumber}: ${currentStepInstruction}` 
        : `Step ${currentStepNumber}: ${currentStepInstruction}`
    };
  }

  // 4. TIMER COMMANDS
  const isTimer = 
    cmd.includes('timer') || cmd.includes('time') ||
    raw.includes('टाइमर') || raw.includes('समय') ||
    raw.includes('ટાઈમર') || raw.includes('સમય');

  if (isTimer) {
    // Detect numbers in English digits, Hindi numbers, or Gujarati numbers
    const numMatch = raw.match(/(\d+|एक|दो|तीन|चार|पांच|छह|सात|आठ|नौ|दस|એક|બે|ત્રણ|ચાર|પાંચ|છ|સાત|આઠ|નવ|દસ)/i);
    let seconds = 300;
    if (numMatch) {
      const valStr = numMatch[1];
      const parsed = parseInt(valStr, 10);
      if (!isNaN(parsed)) {
        if (cmd.includes('sec') || raw.includes('सेकंड') || raw.includes('સેકન્ડ')) {
          seconds = parsed;
        } else {
          seconds = parsed * 60;
        }
      }
    }
    const mins = Math.max(1, Math.round(seconds / 60));
    return {
      action: 'START_TIMER',
      timer_seconds: seconds,
      reply: language === 'hi' 
        ? `${mins} मिनट का टाइमर शुरू कर दिया है!` 
        : language === 'gu' 
        ? `${mins} મિનિટનું ટાઈમર શરૂ કર્યું છે!` 
        : `Starting a ${mins} minute timer for you!`
    };
  }

  // 5. SALT QUERY
  const isSalt = 
    cmd.includes('salt') || cmd.includes('namak') ||
    raw.includes('नमक') || cmd.includes('mithu') || raw.includes('મીઠું');

  if (isSalt) {
    return {
      action: 'SPEAK',
      reply: language === 'hi' 
        ? 'इस रेसिपी के लिए आमतौर पर 1 छोटा चम्मच नमक पर्याप्त होता है। आप अपने स्वादानुसार थोड़ा कम या ज्यादा कर सकते हैं।' 
        : language === 'gu' 
        ? 'સામાન્ય રીતે આ માપ માટે ૧ નાની ચમચી મીઠું પૂરતું છે, તમે તમારા સ્વાદ મુજબ મેળવી શકો છો.' 
        : 'Usually 1 level teaspoon of salt works best for this portion, adjust to your personal taste.'
    };
  }

  // 6. OIL / GHEE QUERY
  const isOil = 
    cmd.includes('oil') || cmd.includes('ghee') || cmd.includes('butter') ||
    cmd.includes('tel') || raw.includes('तेल') || raw.includes('घी') || raw.includes('मक्खन') ||
    raw.includes('તેલ') || raw.includes('ઘી') || raw.includes('માખણ');

  if (isOil) {
    return {
      action: 'SPEAK',
      reply: language === 'hi' 
        ? 'तड़के और भूनने के लिए 2 बड़े चम्मच तेल या शुद्ध देसी घी का उपयोग करें ताकि सुगंध और स्वाद भरपूर आए।' 
        : language === 'gu' 
        ? 'વઘાર અને સાંતળવા માટે ૨ મોટી ચમચી તેલ અથવા શુદ્ધ ઘી વાપરો જેથી સરસ સોડમ મળે.' 
        : 'Use approximately 2 tablespoons of oil or pure desi ghee for the perfect aromatic tempering and roasting.'
    };
  }

  // 7. HEAT / FLAME LEVEL QUERY
  const isHeat = 
    cmd.includes('flame') || cmd.includes('heat') || cmd.includes('gas') ||
    cmd.includes('aanch') || raw.includes('आंच') || raw.includes('गैस') || raw.includes('तावा') ||
    cmd.includes('taap') || raw.includes('આંચ') || raw.includes('તાપ');

  if (isHeat) {
    return {
      action: 'SPEAK',
      reply: language === 'hi' 
        ? 'इस चरण में गैस को मध्यम आंच (Medium Flame) पर रखें ताकि मसाले और सब्जियां जले बिना अच्छी तरह पकें।' 
        : language === 'gu' 
        ? 'આ સ્ટેપ પર ગેસને મધ્યમ આંચ (Medium Flame) પર રાખો જેથી મસાલા બળ્યા વગર સરસ સંતળાય.' 
        : 'Keep the stove on Medium Flame for this step to allow even cooking without scorching the spices.'
    };
  }

  // 8. DURATION / TIME QUERY
  const isDuration = 
    cmd.includes('how long') || cmd.includes('how many minutes') || cmd.includes('duration') ||
    cmd.includes('kitna samay') || cmd.includes('kitni der') || raw.includes('कितना समय') || raw.includes('कितनी देर') ||
    cmd.includes('ketlo samay') || cmd.includes('ketli var') || raw.includes('કેટલો સમય') || raw.includes('કેટલી વાર');

  if (isDuration) {
    return {
      action: 'SPEAK',
      reply: language === 'hi' 
        ? 'इस चरण को लगभग 3 से 5 मिनट तक मध्यम आंच पर पकने दें।' 
        : language === 'gu' 
        ? 'આ પગલા માટે લગભગ ૩ થી ૫ મિનિટ મધ્યમ તાપે થવા દો.' 
        : 'Cook this step for approximately 3 to 5 minutes on medium heat.'
    };
  }

  // 9. INGREDIENTS QUERY
  const isIng = 
    cmd.includes('ingredients') || cmd.includes('samagri') || cmd.includes('what do i need') ||
    raw.includes('सामग्री') || raw.includes('सामग्री क्या है') ||
    raw.includes('સામગ્રી') || raw.includes('શું જોઈશે');

  if (isIng) {
    return {
      action: 'SPEAK',
      reply: language === 'hi' 
        ? 'सामग्री की पूरी सूची और सही माप देखने के लिए रेसिपी की सामग्री चेकलिस्ट देखें।' 
        : language === 'gu' 
        ? 'સામગ્રીની સંપૂર્ણ યાદી અને ચોક્કસ માપ માટે રેસીપીની સામગ્રી યાદી જુઓ.' 
        : 'You can view the full interactive ingredients checklist and scaled quantities at the top of the page.'
    };
  }

  // 10. LLM fallback for general cooking questions
  if (GEMINI_API_KEY) {
    try {
      const prompt = `You are Rasoi Voice Assistant, a friendly Indian cooking expert.
User is cooking: "${recipeTitle}", Step ${currentStepNumber}: "${currentStepInstruction}".
User asks: "${command}".
Provide a concise, helpful 1-2 sentence spoken reply in ${language === 'hi' ? 'Hindi (Devanagari script)' : language === 'gu' ? 'Gujarati script' : 'English'}. Keep it friendly and practical for kitchen use.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (response.ok) {
        const data = await response.json();
        const ans = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (ans) {
          return { action: 'SPEAK', reply: ans.trim() };
        }
      }
    } catch (e) {}
  }

  return {
    action: 'SPEAK',
    reply: language === 'hi' 
      ? `रसोई सहायक तैयार है! "${recipeTitle}" के लिए मध्यम आंच रखें और चम्मच से हल्के हाथों से चलाएं। आप "अगला चरण", "पिछला चरण" या "टाइमर" कह सकते हैं।` 
      : language === 'gu' 
      ? `રસોઈ સહાયક તૈયાર છે! "${recipeTitle}" માટે મધ્યમ તાપ રાખો અને હળવેથી હલાવો. તમે "આગળનું પગલું", "પાછળનું પગલું" કે "ટાઈમર" કહી શકો છો.` 
      : `Chef Rasoi here! For "${recipeTitle}", keep heat on medium and stir gently. You can say "Next step", "Previous step", or ask any cooking question.`
  };
}

export default {
  generateRecipe,
  parseNaturalLanguageIngredients,
  answerVoiceAssistantQuery
};
