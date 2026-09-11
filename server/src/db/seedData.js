export const categoriesData = [
  {
    name: "Gujarati",
    slug: "gujarati",
    description: "Subtle blend of sweet, salty, and spicy flavours with rich steamed snacks and heritage curries.",
    image: "/images/recipes/khaman-dhokla.jpg"
  },
  {
    name: "Punjabi",
    slug: "punjabi",
    description: "Robust, hearty flavours, fragrant tandoor specialties, rich gravies and wholesome rotis.",
    image: "/images/recipes/paneer-butter-masala.jpg"
  },
  {
    name: "South Indian",
    slug: "south-indian",
    description: "Crispy dosas, fluffy idlis, aromatic sambar, coconut-laced curries and fragrant tempering.",
    image: "/images/recipes/crispy-masala-dosa.jpg"
  },
  {
    name: "Farali / Vrat",
    slug: "farali-vrat",
    description: "Fasting-friendly satvik delicacies prepared with rock salt, sabudana, rajgira and fresh fruits.",
    image: "/images/recipes/sabudana-khichdi.jpg"
  },
  {
    name: "Street Food",
    slug: "street-food",
    description: "Tangy, spicy, crunchy chaats, rolls, pav dishes, and beloved Indian street snacks.",
    image: "/images/recipes/mumbai-pav-bhaji.jpg"
  },
  {
    name: "Desserts & Sweets",
    slug: "desserts",
    description: "Traditional mithai, rich halwas, aromatic kheer, and cardamom-scented festive treats.",
    image: "/images/recipes/classic-gulab-jamun.jpg"
  },
  {
    name: "North Indian & Regional",
    slug: "regional",
    description: "Royal Mughlai, Kashmiri wazwan-style veg curries, Rajasthani feasts and Bengali heritage.",
    image: "/images/recipes/hyderabadi-dum-veg-biryani.jpg"
  }
];

export const recipesData = [
  // ==========================================
  // 10 GUJARATI RECIPES
  // ==========================================
  {
    name: "Khaman Dhokla",
    slug: "khaman-dhokla",
    description: "Soft, juicy, and fluffy steamed gram flour savoury cakes tempered with mustard seeds, sesame, and green chillies.",
    image: "/images/recipes/khaman-dhokla.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Vegan", "Jain"],
    servings: 4,
    prep_time: 15,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.9,
    calories: 220,
    protein: 8,
    carbs: 32,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Gram flour (Besan)", quantity: "1.5", unit: "cups" },
      { name: "Semolina (Rava)", quantity: "1", unit: "tbsp" },
      { name: "Lemon juice", quantity: "2", unit: "tbsp" },
      { name: "Sugar", quantity: "1.5", unit: "tbsp" },
      { name: "Ginger green chilli paste", quantity: "1", unit: "tsp" },
      { name: "Fruit salt (Eno)", quantity: "1", unit: "tsp" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Curry leaves", quantity: "10-12", unit: "leaves" },
      { name: "Green chillies (slit)", quantity: "3", unit: "whole" },
      { name: "Fresh coriander (chopped)", quantity: "2", unit: "tbsp" },
      { name: "Fresh grated coconut", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare the Batter",
        instruction: "In a mixing bowl, combine besan, semolina, sugar, lemon juice, ginger-chilli paste, salt, and 1 cup of water. Whisk vigorously for 3-4 minutes to create a smooth, lump-free batter.",
        timer_seconds: 240,
        tip: "Whisking incorporates air, giving the dhokla its famous spongy texture."
      },
      {
        step_number: 2,
        title: "Steam Preparation",
        instruction: "Grease a round steaming tin with oil. Boil water in the steamer on high heat.",
        timer_seconds: 180,
        tip: "Ensure the steamer is actively boiling before adding fruit salt to batter."
      },
      {
        step_number: 3,
        title: "Add Eno & Steam",
        instruction: "Sprinkle 1 tsp Eno fruit salt into the batter with 1 tsp water on top. Stir gently in one direction until foamy. Immediately pour into greased tin and steam on medium-high heat for 15-18 minutes.",
        timer_seconds: 1020,
        tip: "Do not overmix after adding Eno or bubbles will escape."
      },
      {
        step_number: 4,
        title: "Prepare the Tempering & Sugar Water",
        instruction: "Heat oil in a pan. Crackle mustard seeds, sesame, curry leaves, and green chillies. Add 1/2 cup water and 1 tbsp sugar; bring to a boil.",
        timer_seconds: 180,
        tip: "Pouring warm sugar-mustard water over the dhokla keeps it juicy and melt-in-the-mouth."
      },
      {
        step_number: 5,
        title: "Garnish and Serve",
        instruction: "Pour the warm tempering evenly over the sliced dhokla squares. Garnish with fresh grated coconut and finely chopped coriander.",
        timer_seconds: 0,
        tip: "Serve with spicy green chutney and sweet date-tamarind chutney."
      }
    ]
  },
  {
    name: "Gujarati Khandvi",
    slug: "gujarati-khandvi",
    description: "Delicate, velvety rolls made from cooked gram flour and buttermilk, tempered with mustard and sesame seeds.",
    image: "/images/recipes/gujarati-khandvi.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 25,
    difficulty: "Hard",
    rating: 4.8,
    calories: 190,
    protein: 7,
    carbs: 24,
    fat: 7,
    fasting_info: null,
    ingredients: [
      { name: "Besan (gram flour)", quantity: "1", unit: "cup" },
      { name: "Sour buttermilk", quantity: "2", unit: "cups" },
      { name: "Turmeric powder", quantity: "1/4", unit: "tsp" },
      { name: "Ginger green chilli paste", quantity: "1", unit: "tsp" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Sesame seeds", quantity: "1", unit: "tsp" },
      { name: "Grated coconut", quantity: "3", unit: "tbsp" },
      { name: "Coriander leaves", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Whisk the Batter",
        instruction: "Whisk besan, sour buttermilk, turmeric, ginger-chilli paste and salt together until completely smooth without any lumps.",
        timer_seconds: 180,
        tip: "Strain batter through a sieve to guarantee zero lumps."
      },
      {
        step_number: 2,
        title: "Cook the Paste",
        instruction: "Cook the batter in a heavy-bottom pan on medium-low flame, stirring continuously to prevent sticking. Cook for 8-10 minutes until thick and glossy.",
        timer_seconds: 540,
        tip: "Test by spreading a small amount on an inverted plate; if it rolls without sticking, it is done."
      },
      {
        step_number: 3,
        title: "Spread and Roll",
        instruction: "Quickly spread the hot mixture thinly onto greased inverted thalis or granite counter using a flat spatula. Let cool for 5 minutes.",
        timer_seconds: 300,
        tip: "Work quickly before the mixture cools and sets."
      },
      {
        step_number: 4,
        title: "Cut and Roll",
        instruction: "Cut into 2-inch wide strips. Sprinkle coconut and coriander, then roll each strip gently into tight cylinders.",
        timer_seconds: 240,
        tip: "Roll smoothly with light fingertip pressure."
      },
      {
        step_number: 5,
        title: "Tempering",
        instruction: "Heat oil, crackle mustard seeds, sesame seeds, and hing. Pour over the rolled khandvi.",
        timer_seconds: 120,
        tip: "Serve immediately with mint chutney."
      }
    ]
  },
  {
    name: "Methi Thepla",
    slug: "methi-thepla",
    description: "Wholesome Gujarati flatbread infused with fresh fenugreek leaves, yoghurt, sesame seeds, and aromatic spices.",
    image: "/images/recipes/methi-thepla.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 160,
    protein: 5,
    carbs: 22,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Whole wheat flour", quantity: "2", unit: "cups" },
      { name: "Fresh fenugreek leaves (Methi)", quantity: "1.5", unit: "cups" },
      { name: "Yoghurt (Curd)", quantity: "3", unit: "tbsp" },
      { name: "Sesame seeds (Til)", quantity: "1", unit: "tbsp" },
      { name: "Carom seeds (Ajwain)", quantity: "1/2", unit: "tsp" },
      { name: "Red chilli powder", quantity: "1", unit: "tsp" },
      { name: "Turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "Oil or Ghee", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead the Dough",
        instruction: "Mix wheat flour, cleaned chopped methi, curd, spices, ajwain, sesame seeds, and 1 tbsp oil. Knead into a soft, pliable dough using minimal water.",
        timer_seconds: 300,
        tip: "Adding curd ensures the theplas stay soft for days during travel."
      },
      {
        step_number: 2,
        title: "Roll Thin",
        instruction: "Divide dough into equal lemon-sized balls. Dust with flour and roll each ball into thin, even rounds.",
        timer_seconds: 240,
        tip: "Theplas are rolled thinner than standard parathas."
      },
      {
        step_number: 3,
        title: "Roast on Tawa",
        instruction: "Cook on a hot tawa with a drizzle of oil on both sides until light golden brown spots appear.",
        timer_seconds: 120,
        tip: "Do not overcook or press too hard, or they will turn crispy rather than soft."
      }
    ]
  },
  {
    name: "Fafda & Jalebi",
    slug: "fafda-jalebi",
    description: "Iconic Sunday breakfast combo of crispy spiced chickpea flour ribbons paired with crunchy saffron-infused sweet jalebis.",
    image: "/images/recipes/fafda-jalebi.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 30,
    cook_time: 30,
    difficulty: "Hard",
    rating: 5.0,
    calories: 380,
    protein: 6,
    carbs: 58,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Besan (coarse)", quantity: "2", unit: "cups" },
      { name: "Carom seeds (Ajwain)", quantity: "1", unit: "tsp" },
      { name: "Papadhara / Baking soda", quantity: "1/2", unit: "tsp" },
      { name: "Black pepper (crushed)", quantity: "1", unit: "tsp" },
      { name: "All-purpose flour (Maida for Jalebi)", quantity: "1", unit: "cup" },
      { name: "Sugar for syrup", quantity: "1.5", unit: "cups" },
      { name: "Saffron strands", quantity: "10-12", unit: "strands" },
      { name: "Oil for frying", quantity: "500", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Make Fafda Dough",
        instruction: "Mix besan, ajwain, black pepper, soda, oil and water into a smooth medium-firm dough. Knead for 5 minutes.",
        timer_seconds: 300,
        tip: "Traditional papadhara salt gives authentic street texture."
      },
      {
        step_number: 2,
        title: "Drag Fafda Strips",
        instruction: "Take a small cylindrical dough portion, place on wooden board, and press and drag forward using the base of your palm.",
        timer_seconds: 180,
        tip: "Use a sharp flat knife held flat against the board to lift the fafda strip cleanly."
      },
      {
        step_number: 3,
        title: "Deep Fry Fafda",
        instruction: "Deep fry in medium-hot oil for 1-2 minutes until crispy but light yellow.",
        timer_seconds: 120,
        tip: "Keep oil at medium heat so fafda stays crisp and does not brown."
      },
      {
        step_number: 4,
        title: "Prepare Jalebi & Sugar Syrup",
        instruction: "Piped fermented batter in spirals directly into hot ghee/oil. Soak fried crisp jalebis in warm saffron sugar syrup for 1 minute.",
        timer_seconds: 240,
        tip: "Serve hot along with raw papaya sambharo and spicy fried green chillies."
      }
    ]
  },
  {
    name: "Gujarati Handvo",
    slug: "gujarati-handvo",
    description: "Nutritious savory mixed lentil and vegetable cake baked or pan-crisped with a fragrant sesame-mustard crust.",
    image: "/images/recipes/gujarati-handvo.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 20,
    cook_time: 40,
    difficulty: "Medium",
    rating: 4.8,
    calories: 260,
    protein: 10,
    carbs: 38,
    fat: 8,
    fasting_info: null,
    ingredients: [
      { name: "Handvo flour mix (rice, chana dal, toor dal, urad dal)", quantity: "2", unit: "cups" },
      { name: "Grated bottle gourd (Lauki/Doodhi)", quantity: "1", unit: "cup" },
      { name: "Yoghurt", quantity: "1/2", unit: "cup" },
      { name: "Ginger chilli paste", quantity: "1", unit: "tbsp" },
      { name: "Sesame seeds", quantity: "2", unit: "tbsp" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Turmeric and red chilli powder", quantity: "1", unit: "tsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Ferment the Batter",
        instruction: "Mix handvo flour and sour yoghurt with warm water into thick batter. Ferment for 6-8 hours.",
        timer_seconds: 0,
        tip: "Fermentation provides natural tanginess and makes the cake light."
      },
      {
        step_number: 2,
        title: "Mix Vegetables and Spices",
        instruction: "Fold grated lauki, ginger-chilli paste, spices, salt, and 1 tsp baking soda or fruit salt into the batter.",
        timer_seconds: 180,
        tip: "Lauki keeps the cake interior moist while exterior gets crunchy."
      },
      {
        step_number: 3,
        title: "Cook with Sesame Tempering",
        instruction: "Heat oil in a pan, crackle mustard seeds and sesame seeds. Pour batter, cover and slow-cook on low flame for 15-20 minutes until golden crust forms, then flip.",
        timer_seconds: 1200,
        tip: "A thick iron skillet yields the crunchiest crust."
      }
    ]
  },
  {
    name: "Kathiyawadi Undhiyu",
    slug: "kathiyawadi-undhiyu",
    description: "Traditional winter Gujarati one-pot stew of surti papdi, root vegetables, baby eggplants, and fenugreek muthias.",
    image: "/images/recipes/kathiyawadi-undhiyu.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 6,
    prep_time: 30,
    cook_time: 45,
    difficulty: "Hard",
    rating: 4.9,
    calories: 340,
    protein: 9,
    carbs: 45,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Surti Papdi & Tuvar Lilva", quantity: "1.5", unit: "cups" },
      { name: "Baby Brinjals (slit)", quantity: "6", unit: "pieces" },
      { name: "Baby Potatoes (slit)", quantity: "6", unit: "pieces" },
      { name: "Purple Yam (Kand)", quantity: "1", unit: "cup cubed" },
      { name: "Sweet Potato", quantity: "1", unit: "cup cubed" },
      { name: "Methi Muthias (fried)", quantity: "10-12", unit: "pieces" },
      { name: "Green garlic & coriander paste", quantity: "1/2", unit: "cup" },
      { name: "Fresh grated coconut", quantity: "1/2", unit: "cup" },
      { name: "Ground spices and sesame", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Green Masala",
        instruction: "Blend green garlic, fresh coriander, green chillies, coconut, sesame, and spices with a little oil and sugar.",
        timer_seconds: 300,
        tip: "Green garlic is the hallmark of authentic seasonal Undhiyu."
      },
      {
        step_number: 2,
        title: "Stuff Vegetables",
        instruction: "Stuff slit baby brinjals and potatoes with part of the aromatic green coconut masala.",
        timer_seconds: 300,
        tip: "Stuffing ensures every bite of root veg is bursting with flavor."
      },
      {
        step_number: 3,
        title: "Slow Cook Undhiyu",
        instruction: "Layer surti papdi at the bottom, then hard root veg, then stuffed brinjals and fried muthias on top. Cover and simmer on low heat for 35-40 minutes.",
        timer_seconds: 2400,
        tip: "Traditionally cooked upside down in earthen pots buried under hot coal."
      }
    ]
  },
  {
    name: "Traditional Khichu",
    slug: "traditional-khichu",
    description: "Warm, gooey steamed rice flour dough seasoned with cumin seeds, green chillies, and drizzled with raw groundnut oil.",
    image: "/images/recipes/traditional-khichu.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Jain"],
    servings: 2,
    prep_time: 5,
    cook_time: 10,
    difficulty: "Easy",
    rating: 4.8,
    calories: 180,
    protein: 3,
    carbs: 35,
    fat: 4,
    fasting_info: null,
    ingredients: [
      { name: "Rice flour", quantity: "1", unit: "cup" },
      { name: "Water", quantity: "2.5", unit: "cups" },
      { name: "Cumin seeds (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Carom seeds (Ajwain)", quantity: "1/2", unit: "tsp" },
      { name: "Green chilli paste", quantity: "1", unit: "tsp" },
      { name: "Papad kharo (alkaline salt)", quantity: "1/2", unit: "tsp" },
      { name: "Groundnut oil & methia masala", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Boil Spiced Water",
        instruction: "In a deep pan, boil water with cumin, ajwain, chilli paste, papad kharo, and salt for 3 minutes.",
        timer_seconds: 180,
        tip: "Papad kharo gives khichu its authentic street-vendor softness."
      },
      {
        step_number: 2,
        title: "Whisk in Rice Flour",
        instruction: "Lower flame and gradually pour rice flour while stirring vigorously with a rolling pin (velan) to prevent lumps.",
        timer_seconds: 120,
        tip: "Use the base of a wooden rolling pin in circular motions."
      },
      {
        step_number: 3,
        title: "Cover & Steam",
        instruction: "Cover tightly and let it steam on very low flame for 6-8 minutes until glossy and cooked through.",
        timer_seconds: 420,
        tip: "Serve piping hot with raw cold-pressed groundnut oil and spicy pickle masala."
      }
    ]
  },
  {
    name: "Gujarati Kadhi",
    slug: "gujarati-kadhi",
    description: "A sweet and tangy yoghurt and gram flour soup infused with cinnamon, cloves, ginger, and fresh curry leaves.",
    image: "/images/recipes/gujarati-kadhi.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 10,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 140,
    protein: 5,
    carbs: 16,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Sour Curd (Yoghurt)", quantity: "1.5", unit: "cups" },
      { name: "Besan (Gram flour)", quantity: "2", unit: "tbsp" },
      { name: "Water", quantity: "3", unit: "cups" },
      { name: "Jaggery or Sugar", quantity: "1.5", unit: "tbsp" },
      { name: "Ginger green chilli paste", quantity: "1", unit: "tsp" },
      { name: "Mustard seeds & Cumin seeds", quantity: "1/2", unit: "tsp each" },
      { name: "Cinnamon stick & Cloves", quantity: "1 inch & 3", unit: "whole" },
      { name: "Curry leaves & Hing", quantity: "8", unit: "leaves" },
      { name: "Ghee for tempering", quantity: "1.5", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Whisk Curd & Besan",
        instruction: "Whisk sour curd and besan together until lump-free. Add water, jaggery, ginger-chilli paste, and salt.",
        timer_seconds: 180,
        tip: "Sour curd is essential for the signature Gujarati sweet-tart balance."
      },
      {
        step_number: 2,
        title: "Simmer the Kadhi",
        instruction: "Bring the mixture to a gentle boil on medium heat, stirring continuously until it thickens slightly and bubbles for 8 minutes.",
        timer_seconds: 480,
        tip: "Stirring prevents the yoghurt from curdling."
      },
      {
        step_number: 3,
        title: "Ghee Tadka",
        instruction: "Heat ghee in a tadka ladle, crackle mustard, cumin, cloves, cinnamon, hing, and curry leaves. Pour sizzling into kadhi.",
        timer_seconds: 120,
        tip: "Cover immediately with lid to trap the smoky aromatic spices."
      }
    ]
  },
  {
    name: "Sev Tameta Nu Shaak",
    slug: "sev-tameta-nu-shaak",
    description: "Tangy sweet Kathiyawadi tomato curry cooked with jaggery and spices, topped with generous crispy spicy sev.",
    image: "/images/recipes/sev-tameta-nu-shaak.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian", "Jain", "Vegan"],
    servings: 3,
    prep_time: 10,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.8,
    calories: 210,
    protein: 6,
    carbs: 22,
    fat: 11,
    fasting_info: null,
    ingredients: [
      { name: "Ripe tomatoes (chopped)", quantity: "4", unit: "medium" },
      { name: "Ratlami / Gujarati Spicy Sev", quantity: "1", unit: "cup" },
      { name: "Jaggery (Gud)", quantity: "1.5", unit: "tbsp" },
      { name: "Ginger green chilli paste", quantity: "1", unit: "tsp" },
      { name: "Cumin seeds & Mustard seeds", quantity: "1/2", unit: "tsp each" },
      { name: "Kashmiri red chilli & coriander powder", quantity: "1", unit: "tsp each" },
      { name: "Oil", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Tempering & Cook Tomatoes",
        instruction: "Heat oil, add cumin and mustard seeds. Add ginger-chilli paste and chopped tomatoes. Cook until soft and pulpy.",
        timer_seconds: 300,
        tip: "Use ripe red country tomatoes for best natural sweetness and tang."
      },
      {
        step_number: 2,
        title: "Add Spices & Jaggery",
        instruction: "Stir in turmeric, chilli powder, coriander powder, salt, jaggery, and 1/2 cup water. Simmer for 5 minutes.",
        timer_seconds: 300,
        tip: "Jaggery rounds out the sharp acidity of the tomatoes."
      },
      {
        step_number: 3,
        title: "Add Sev and Serve",
        instruction: "Turn off heat, add crunchy sev just before serving so it retains a bite.",
        timer_seconds: 60,
        tip: "Serve with piping hot bajra rotla or theplas."
      }
    ]
  },
  {
    name: "Dal Dhokli",
    slug: "dal-dhokli",
    description: "Comforting one-pot Gujarati stew of spiced wheat flour ribbons simmered in a sweet, sour, and spicy toor dal soup.",
    image: "/images/recipes/dal-dhokli.jpg",
    cuisine: "Gujarati",
    region: "Gujarat",
    categorySlug: "gujarati",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 20,
    cook_time: 30,
    difficulty: "Medium",
    rating: 4.9,
    calories: 310,
    protein: 12,
    carbs: 52,
    fat: 7,
    fasting_info: null,
    ingredients: [
      { name: "Toor dal (pigeon peas)", quantity: "1", unit: "cup" },
      { name: "Whole wheat flour", quantity: "1", unit: "cup" },
      { name: "Jaggery & Kokum or tamarind", quantity: "2", unit: "tbsp" },
      { name: "Raw peanuts", quantity: "2", unit: "tbsp" },
      { name: "Ghee for tadka", quantity: "2", unit: "tbsp" },
      { name: "Mustard seeds, cumin, fenugreek seeds", quantity: "1", unit: "tsp combined" },
      { name: "Carom seeds & turmeric", quantity: "1/2", unit: "tsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook the Dal",
        instruction: "Pressure cook toor dal with peanuts and turmeric until mushy. Blend with hand blender and add kokum, jaggery, and salt.",
        timer_seconds: 600,
        tip: "Add boiled peanuts for authentic Gujarati texture."
      },
      {
        step_number: 2,
        title: "Roll and Cut Dhokli",
        instruction: "Knead wheat flour with spices into medium dough. Roll thin like roti and cut into diamond shapes.",
        timer_seconds: 300,
        tip: "Dust lightly with flour so dhokli pieces don't stick to each other."
      },
      {
        step_number: 3,
        title: "Simmer Dhokli in Dal",
        instruction: "Drop dhokli pieces one by one into the boiling dal. Simmer on low heat for 12-15 minutes until cooked.",
        timer_seconds: 900,
        tip: "Keep dal slightly watery initially as dhokli will absorb liquid as it cooks."
      },
      {
        step_number: 4,
        title: "Aromatic Tadka",
        instruction: "Heat ghee, crackle whole spices, cloves, curry leaves, and pour over the dal dhokli. Serve with dollop of ghee.",
        timer_seconds: 120,
        tip: "Enjoy hot with raw onion salad and papad."
      }
    ]
  },

  // ==========================================
  // 10 PUNJABI RECIPES
  // ==========================================
  {
    name: "Amritsari Chole Bhature",
    slug: "amritsari-chole-bhature",
    description: "Dark, robust spiced chickpea curry infused with tea liquor and anardana, paired with deep-fried puffy bhature.",
    image: "/images/recipes/amritsari-chole-bhature.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 30,
    cook_time: 40,
    difficulty: "Medium",
    rating: 5.0,
    calories: 520,
    protein: 16,
    carbs: 68,
    fat: 20,
    fasting_info: null,
    ingredients: [
      { name: "Kabuli Chana (Chickpeas soaked overnight)", quantity: "2", unit: "cups" },
      { name: "Tea bags (for dark color)", quantity: "2", unit: "bags" },
      { name: "Dried Pomegranate Seeds (Anardana)", quantity: "1.5", unit: "tbsp" },
      { name: "Chopped onions & ginger garlic paste", quantity: "1", unit: "cup" },
      { name: "Chopped tomatoes", quantity: "1", unit: "cup" },
      { name: "Amritsari Chole Masala", quantity: "2", unit: "tbsp" },
      { name: "Maida (Flour for Bhatura)", quantity: "2", unit: "cups" },
      { name: "Curd & semolina for bhatura", quantity: "3", unit: "tbsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Boil Chickpeas with Tea Bag",
        instruction: "Pressure cook chickpeas with 2 tea bags, bay leaf, black cardamom, and salt for 6-7 whistles until completely tender.",
        timer_seconds: 900,
        tip: "Tea bags impart the signature authentic deep-dark Amritsari hue."
      },
      {
        step_number: 2,
        title: "Cook the Masala Gravy",
        instruction: "Sauté onions, ginger, garlic until deep brown. Add tomatoes, anardana powder, and chole masala. Cook until oil separates.",
        timer_seconds: 600,
        tip: "Slow browning the onions creates deep flavor foundation."
      },
      {
        step_number: 3,
        title: "Simmer Chole",
        instruction: "Add boiled chickpeas and mash a ladleful to thicken the gravy. Simmer for 15 minutes.",
        timer_seconds: 900,
        tip: "A final tadka of julienned ginger, green chillies, and ghee takes it to restaurant level."
      },
      {
        step_number: 4,
        title: "Fry Puffy Bhature",
        instruction: "Roll fermented bhatura dough into ovals and deep fry in smoking hot oil until ballooned and golden.",
        timer_seconds: 180,
        tip: "Press gently with slotted spoon to help bhatura puff up immediately."
      }
    ]
  },
  {
    name: "Dal Makhani",
    slug: "dal-makhani",
    description: "Velvety slow-cooked whole black lentils and kidney beans simmered overnight with butter, cream, and Kashmiri chillies.",
    image: "/images/recipes/dal-makhani.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 20,
    cook_time: 60,
    difficulty: "Medium",
    rating: 4.9,
    calories: 360,
    protein: 14,
    carbs: 42,
    fat: 16,
    fasting_info: null,
    ingredients: [
      { name: "Whole Black Urad Dal", quantity: "1.5", unit: "cups" },
      { name: "Rajma (Red Kidney Beans)", quantity: "1/4", unit: "cup" },
      { name: "Tomato Puree", quantity: "1.5", unit: "cups" },
      { name: "White Butter (Makhan)", quantity: "4", unit: "tbsp" },
      { name: "Fresh Heavy Cream", quantity: "4", unit: "tbsp" },
      { name: "Ginger garlic paste", quantity: "2", unit: "tbsp" },
      { name: "Kasuri methi (crushed)", quantity: "1", unit: "tbsp" },
      { name: "Kashmiri red chilli powder", quantity: "1.5", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Boil Lentils",
        instruction: "Pressure cook soaked urad and rajma with salt and 1 tbsp ginger-garlic paste for 8 whistles until soft and creamy.",
        timer_seconds: 1200,
        tip: "Wash the lentils thoroughly in warm water until water runs clear."
      },
      {
        step_number: 2,
        title: "Simmer with Tomato and Spices",
        instruction: "In a heavy handi, melt butter, add tomato puree, chilli powder, and remaining ginger paste. Add dal and simmer on low heat for 45 minutes.",
        timer_seconds: 2700,
        tip: "The longer dal makhani simmers, the creamier its consistency becomes."
      },
      {
        step_number: 3,
        title: "Finish with Cream & Kasuri Methi",
        instruction: "Swirl in fresh cream and crushed kasuri methi. Garnish with a cube of white butter.",
        timer_seconds: 180,
        tip: "Optional: Use dhungar method (charcoal smoke) for authentic dhaba aroma."
      }
    ]
  },
  {
    name: "Paneer Butter Masala",
    slug: "paneer-butter-masala",
    description: "Cottage cheese cubes bathed in a velvety, rich tomato, cashew, and butter makhani gravy with aromatic spices.",
    image: "/images/recipes/paneer-butter-masala.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 25,
    difficulty: "Medium",
    rating: 4.9,
    calories: 420,
    protein: 18,
    carbs: 22,
    fat: 28,
    fasting_info: null,
    ingredients: [
      { name: "Fresh Paneer (cubed)", quantity: "300", unit: "grams" },
      { name: "Ripe tomatoes (boiled & pureed)", quantity: "5", unit: "large" },
      { name: "Cashews (soaked & ground)", quantity: "15", unit: "pieces" },
      { name: "Butter", quantity: "3", unit: "tbsp" },
      { name: "Fresh cream", quantity: "3", unit: "tbsp" },
      { name: "Ginger garlic paste", quantity: "1.5", unit: "tbsp" },
      { name: "Kasuri methi & Garam masala", quantity: "1", unit: "tsp each" },
      { name: "Honey or sugar", quantity: "1", unit: "tsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Makhani Base",
        instruction: "Cook boiled tomato puree and cashew paste in 2 tbsp melted butter until reduced and glossy.",
        timer_seconds: 600,
        tip: "Straining the tomato puree creates an ultra-silky restaurant texture."
      },
      {
        step_number: 2,
        title: "Spice & Simmer",
        instruction: "Add Kashmiri chilli powder, garam masala, salt, and honey. Simmer for 8 minutes on medium flame.",
        timer_seconds: 480,
        tip: "Cashew paste thickens quickly, so stir often."
      },
      {
        step_number: 3,
        title: "Add Paneer & Cream",
        instruction: "Gently fold in paneer cubes, fresh cream, and toasted kasuri methi. Simmer for 3 minutes and remove from heat.",
        timer_seconds: 180,
        tip: "Do not overcook paneer or it will turn rubbery."
      }
    ]
  },
  {
    name: "Punjabi Rajma Chawal",
    slug: "punjabi-rajma-chawal",
    description: "Classic red kidney beans simmered in a spiced onion-tomato gravy, served over steaming fragrant basmati rice.",
    image: "/images/recipes/punjabi-rajma-chawal.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Vegan"],
    servings: 4,
    prep_time: 20,
    cook_time: 40,
    difficulty: "Easy",
    rating: 4.9,
    calories: 380,
    protein: 15,
    carbs: 65,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Kashmiri Rajma (soaked overnight)", quantity: "1.5", unit: "cups" },
      { name: "Onions (finely chopped)", quantity: "2", unit: "large" },
      { name: "Tomatoes (pureed)", quantity: "3", unit: "medium" },
      { name: "Ginger garlic paste", quantity: "1.5", unit: "tbsp" },
      { name: "Garam masala & Rajma masala", quantity: "1", unit: "tbsp each" },
      { name: "Basmati rice (cooked)", quantity: "3", unit: "cups" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook Rajma",
        instruction: "Pressure cook soaked rajma with bay leaf, black cardamom, and salt for 6 whistles until melt-in-mouth soft.",
        timer_seconds: 900,
        tip: "Kashmiri chitra rajma cooks faster and yields a thicker naturally sweet gravy."
      },
      {
        step_number: 2,
        title: "Prepare Onion-Tomato Bhuna",
        instruction: "Heat ghee/oil, brown chopped onions deeply. Add ginger-garlic and pureed tomatoes. Cook until oil leaves masala.",
        timer_seconds: 600,
        tip: "Deep caramelization is key to dhaba style rajma."
      },
      {
        step_number: 3,
        title: "Combine and Simmer",
        instruction: "Pour cooked rajma into masala. Lightly crush some beans with the ladle to thicken gravy. Simmer for 15 minutes.",
        timer_seconds: 900,
        tip: "Serve piping hot over fragrant jeera basmati rice with pickled onions."
      }
    ]
  },
  {
    name: "Classic Aloo Paratha",
    slug: "classic-aloo-paratha",
    description: "Golden griddled whole wheat flatbread stuffed with spiced mashed potatoes, green chillies, and fresh herbs.",
    image: "/images/recipes/classic-aloo-paratha.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.9,
    calories: 280,
    protein: 6,
    carbs: 42,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Boiled potatoes (peeled & mashed)", quantity: "4", unit: "medium" },
      { name: "Whole wheat flour", quantity: "2", unit: "cups" },
      { name: "Green chillies (finely chopped)", quantity: "2", unit: "pieces" },
      { name: "Roasted cumin powder & Amchur (dry mango)", quantity: "1", unit: "tsp each" },
      { name: "Ajwain (carom seeds)", quantity: "1/2", unit: "tsp" },
      { name: "Fresh coriander & chopped mint", quantity: "3", unit: "tbsp" },
      { name: "Butter or Ghee", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Aloo Filling",
        instruction: "Mash boiled potatoes thoroughly. Mix in chopped green chillies, coriander, roasted jeera, amchur, garam masala, and salt.",
        timer_seconds: 300,
        tip: "Ensure boiled potatoes are completely cooled before mashing so filling doesn't get sticky."
      },
      {
        step_number: 2,
        title: "Stuff and Roll Paratha",
        instruction: "Roll a ball of dough into a 4-inch disc. Place a generous ball of aloo filling inside, pleat the edges to seal, and roll out gently.",
        timer_seconds: 240,
        tip: "Dust with flour and roll with light pressure from center outwards to prevent bursting."
      },
      {
        step_number: 3,
        title: "Roast with Butter",
        instruction: "Roast on hot tawa until golden spots appear on both sides. Smear generously with butter or ghee.",
        timer_seconds: 180,
        tip: "Serve with thick sweet yoghurt, Punjabi mango pickle, and extra homemade white butter."
      }
    ]
  },
  {
    name: "Tandoori Paneer Tikka",
    slug: "tandoori-paneer-tikka",
    description: "Marinated cubes of paneer, bell peppers, and red onions charred to perfection with smoky tandoori spices and mustard oil.",
    image: "/images/recipes/tandoori-paneer-tikka.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 25,
    cook_time: 15,
    difficulty: "Medium",
    rating: 4.9,
    calories: 310,
    protein: 16,
    carbs: 12,
    fat: 22,
    fasting_info: null,
    ingredients: [
      { name: "Paneer (cut into large cubes)", quantity: "350", unit: "grams" },
      { name: "Hung Curd (Greek yoghurt)", quantity: "1", unit: "cup" },
      { name: "Bell peppers & Onions (cut into squares)", quantity: "1.5", unit: "cups" },
      { name: "Mustard oil (heated)", quantity: "2", unit: "tbsp" },
      { name: "Kashmiri red chilli powder", quantity: "1.5", unit: "tbsp" },
      { name: "Kasuri methi & Chaat masala", quantity: "1", unit: "tsp each" },
      { name: "Ginger garlic paste", quantity: "1", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Whisk Marinade",
        instruction: "Mix hung curd, hot mustard oil, Kashmiri chilli powder, ginger-garlic paste, kasuri methi, and salt into a vibrant red paste.",
        timer_seconds: 300,
        tip: "Smoking mustard oil first gives the distinctive restaurant tandoor aroma."
      },
      {
        step_number: 2,
        title: "Marinate Skewers",
        instruction: "Coat paneer, peppers, and onions thoroughly. Thread onto skewers and rest for 20 minutes.",
        timer_seconds: 1200,
        tip: "If using bamboo skewers, soak in water for 30 minutes to prevent burning."
      },
      {
        step_number: 3,
        title: "Grill / Bake",
        instruction: "Roast in oven at 220°C (430°F) or grill on hot tawa for 10-12 minutes until nicely charred on edges.",
        timer_seconds: 720,
        tip: "Baste with melted butter and sprinkle with lemon juice and chaat masala before serving."
      }
    ]
  },
  {
    name: "Amritsari Kulcha",
    slug: "amritsari-kulcha",
    description: "Crispy, layered tandoori flatbread stuffed with spiced potatoes, onions, and coriander seeds, brushed with melted ghee.",
    image: "/images/recipes/amritsari-kulcha.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 30,
    cook_time: 20,
    difficulty: "Hard",
    rating: 4.8,
    calories: 340,
    protein: 7,
    carbs: 48,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Maida (All purpose flour)", quantity: "2", unit: "cups" },
      { name: "Butter or Ghee for layering", quantity: "4", unit: "tbsp" },
      { name: "Boiled mashed potatoes & chopped onion", quantity: "1.5", unit: "cups" },
      { name: "Crushed coriander seeds & anardana", quantity: "1", unit: "tbsp each" },
      { name: "Green chillies & fresh coriander", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Laminate Dough",
        instruction: "Knead soft dough. Roll out, spread butter, fold like an envelope, and repeat twice to create flaky layers.",
        timer_seconds: 600,
        tip: "Layering with butter gives the signature flaky crunch."
      },
      {
        step_number: 2,
        title: "Stuff and Shape",
        instruction: "Fill with seasoned potato-onion-coriander seed mixture. Flatten by hand or gentle rolling pin.",
        timer_seconds: 240,
        tip: "Crushed coriander seeds on top add great crunch."
      },
      {
        step_number: 3,
        title: "Bake on Tawa or Tandoor",
        instruction: "Apply water on one side, stick to hot iron tawa, flip tawa upside down directly over gas flame until charred and crisp.",
        timer_seconds: 240,
        tip: "Crush gently between palms right after cooking to reveal flaky layers, then pour melted butter."
      }
    ]
  },
  {
    name: "Sarson Ka Saag & Makki Di Roti",
    slug: "sarson-ka-saag-makki-di-roti",
    description: "Hearty winter Punjabi mustard greens stew slow-cooked with bathua, spinach, and makki aata, served with cornmeal flatbread.",
    image: "/images/recipes/sarson-ka-saag-makki-di-roti.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 25,
    cook_time: 50,
    difficulty: "Medium",
    rating: 5.0,
    calories: 320,
    protein: 10,
    carbs: 44,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Mustard Greens (Sarson leaves)", quantity: "500", unit: "grams" },
      { name: "Spinach (Palak) & Bathua leaves", quantity: "250", unit: "grams" },
      { name: "Maize flour (Makki ka atta)", quantity: "2", unit: "cups" },
      { name: "Ginger, garlic, and green chillies", quantity: "3", unit: "tbsp chopped" },
      { name: "White butter and Ghee", quantity: "4", unit: "tbsp" },
      { name: "Jaggery (Gud) for serving", quantity: "4", unit: "small cubes" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook the Greens",
        instruction: "Pressure cook washed mustard, spinach, and bathua with ginger, garlic, and chillies for 15 minutes.",
        timer_seconds: 900,
        tip: "Traditional blending is done using a wooden masher (madhani)."
      },
      {
        step_number: 2,
        title: "Whisk Makki Atta into Saag",
        instruction: "Sprinkle 2 tbsp makki flour into the simmered greens while stirring to thicken and bind the saag.",
        timer_seconds: 300,
        tip: "Makki flour removes any natural bitterness of mustard leaves."
      },
      {
        step_number: 3,
        title: "Make Makki Di Roti",
        instruction: "Knead warm water into makki flour. Pat into flat rounds between damp plastic sheets or palms and cook on medium tawa with ghee.",
        timer_seconds: 300,
        tip: "Serve saag swimming in homemade white butter with a block of jaggery."
      }
    ]
  },
  {
    name: "Palak Paneer",
    slug: "palak-paneer",
    description: "Fresh cottage cheese cubes nestled in a vibrant, creamy, garlic-spiced smooth spinach sauce.",
    image: "/images/recipes/palak-paneer.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.8,
    calories: 290,
    protein: 16,
    carbs: 11,
    fat: 20,
    fasting_info: null,
    ingredients: [
      { name: "Fresh spinach leaves (washed)", quantity: "500", unit: "grams" },
      { name: "Paneer (cubed)", quantity: "250", unit: "grams" },
      { name: "Garlic (finely minced)", quantity: "2", unit: "tbsp" },
      { name: "Onion & Green chillies", quantity: "1", unit: "cup chopped" },
      { name: "Fresh cream", quantity: "2", unit: "tbsp" },
      { name: "Cumin seeds & Garam masala", quantity: "1", unit: "tsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Blanch Spinach",
        instruction: "Blanch spinach in boiling water for 2 minutes, then immediately plunge into ice-cold water. Puree with green chillies.",
        timer_seconds: 180,
        tip: "Ice water bath preserves the vibrant bright green color."
      },
      {
        step_number: 2,
        title: "Sauté Aromatics",
        instruction: "Heat ghee, sauté cumin seeds and lots of minced garlic until fragrant. Add onions and cook until translucent.",
        timer_seconds: 300,
        tip: "Garlic pairs phenomenally with spinach."
      },
      {
        step_number: 3,
        title: "Simmer with Paneer",
        instruction: "Add spinach puree, garam masala, salt, and paneer cubes. Simmer for 3-4 minutes. Stir in fresh cream.",
        timer_seconds: 240,
        tip: "Do not over-boil or the spinach will lose its bright color."
      }
    ]
  },
  {
    name: "Kadai Paneer",
    slug: "kadai-paneer",
    description: "Cottage cheese and crunchy bell peppers tossed in a spicy, freshly ground coriander and red chilli kadai masala.",
    image: "/images/recipes/kadai-paneer.jpg",
    cuisine: "Punjabi",
    region: "Punjab",
    categorySlug: "punjabi",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 20,
    difficulty: "Medium",
    rating: 4.9,
    calories: 330,
    protein: 17,
    carbs: 14,
    fat: 23,
    fasting_info: null,
    ingredients: [
      { name: "Paneer cubes", quantity: "300", unit: "grams" },
      { name: "Bell peppers (cut into cubes)", quantity: "1.5", unit: "cups" },
      { name: "Onions (cubed petals)", quantity: "1", unit: "cup" },
      { name: "Whole coriander seeds & dried red chillies (roasted & coarsely crushed)", quantity: "2", unit: "tbsp" },
      { name: "Tomato puree", quantity: "1.5", unit: "cups" },
      { name: "Kasuri methi & Ginger juliennes", quantity: "1", unit: "tbsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Make Kadai Masala",
        instruction: "Dry roast coriander seeds, fennel seeds, and whole dry red chillies until fragrant. Coarsely crush in a mortar.",
        timer_seconds: 240,
        tip: "Freshly ground kadai masala gives restaurant flavor."
      },
      {
        step_number: 2,
        title: "Toss Peppers and Onions",
        instruction: "In a hot kadai, toss onion petals and capsicum in 1 tbsp oil on high flame for 2 minutes so they stay crunchy.",
        timer_seconds: 120,
        tip: "High heat keeps vegetables crisp and smoky."
      },
      {
        step_number: 3,
        title: "Cook Gravy & Paneer",
        instruction: "Cook tomato puree with spices, add paneer, tossed vegetables, and fresh kadai masala. Simmer 4 minutes and serve.",
        timer_seconds: 240,
        tip: "Garnish with ginger juliennes and fresh coriander."
      }
    ]
  },

  // ==========================================
  // 10 SOUTH INDIAN RECIPES
  // ==========================================
  {
    name: "Fluffy Idli Sambar",
    slug: "fluffy-idli-sambar",
    description: "Steamed fermented rice and black gram lentil cakes served with piping hot vegetable sambar and fresh coconut chutney.",
    image: "/images/recipes/fluffy-idli-sambar.jpg",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Jain"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.9,
    calories: 210,
    protein: 8,
    carbs: 42,
    fat: 2,
    fasting_info: null,
    ingredients: [
      { name: "Idli Rice (parboiled)", quantity: "3", unit: "cups" },
      { name: "Whole Urad Dal (skinned)", quantity: "1", unit: "cup" },
      { name: "Fenugreek seeds (Methi)", quantity: "1", unit: "tsp" },
      { name: "Toor dal for sambar", quantity: "1", unit: "cup" },
      { name: "Drumsticks, carrots & shallots", quantity: "2", unit: "cups chopped" },
      { name: "Sambar powder & Tamarind pulp", quantity: "2", unit: "tbsp each" },
      { name: "Fresh grated coconut for chutney", quantity: "1", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Ferment the Batter",
        instruction: "Grind soaked urad dal to a fluffy cloud, and rice to a slightly coarse paste. Combine with salt and ferment 8-12 hours.",
        timer_seconds: 0,
        tip: "Grinding urad dal with ice-cold water keeps it cool and yields pillow-soft idlis."
      },
      {
        step_number: 2,
        title: "Steam Idlis",
        instruction: "Grease idli moulds, pour batter, and steam on high heat for 10-12 minutes. Rest 2 minutes before unmoulding.",
        timer_seconds: 720,
        tip: "Dip a spoon in water to slide idlis out effortlessly without tearing."
      },
      {
        step_number: 3,
        title: "Prepare Sambar",
        instruction: "Cook toor dal with drumsticks, carrots, tamarind, and sambar powder. Temper with mustard seeds, curry leaves, and hing in ghee.",
        timer_seconds: 600,
        tip: "Serve steaming idlis submerged in a bowl of hot sambar."
      }
    ]
  },
  {
    name: "Crispy Masala Dosa",
    slug: "crispy-masala-dosa",
    description: "Golden, paper-thin crispy fermented crepe folded over a spiced mustard-tempered potato masala.",
    image: "/images/recipes/crispy-masala-dosa.jpg",
    cuisine: "South Indian",
    region: "Karnataka",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 5.0,
    calories: 290,
    protein: 7,
    carbs: 48,
    fat: 8,
    fasting_info: null,
    ingredients: [
      { name: "Dosa batter (fermented)", quantity: "3", unit: "cups" },
      { name: "Boiled potatoes (coarsely mashed)", quantity: "3", unit: "large" },
      { name: "Sliced onions & green chillies", quantity: "1", unit: "cup" },
      { name: "Mustard seeds, urad dal, chana dal", quantity: "1/2", unit: "tsp each" },
      { name: "Curry leaves & turmeric powder", quantity: "1", unit: "tsp" },
      { name: "Butter or Sesame oil for roasting", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Potato Masala",
        instruction: "Heat oil, crackle mustard seeds, chana dal, urad dal, curry leaves, and green chillies. Sauté onions until soft, add turmeric, mashed potatoes, and water. Cook 4 minutes.",
        timer_seconds: 300,
        tip: "Keep potato masala moist so it spreads easily."
      },
      {
        step_number: 2,
        title: "Spread Batter on Tawa",
        instruction: "Pour a ladle of batter in center of hot cast iron tawa and spread outward in concentric circles with back of ladle.",
        timer_seconds: 60,
        tip: "Wipe tawa with an onion half dipped in oil before pouring batter."
      },
      {
        step_number: 3,
        title: "Roast and Fold",
        instruction: "Drizzle butter or ghee along edges. Cook until bottom turns deep golden and crisp. Place potato masala in center and fold.",
        timer_seconds: 180,
        tip: "Serve immediately while steaming hot with coconut and tomato chutneys."
      }
    ]
  },
  {
    name: "Crispy Medu Vada",
    slug: "crispy-medu-vada",
    description: "Deep-fried golden doughnut-shaped lentil fritters, super crunchy outside and airy soft inside.",
    image: "/images/recipes/crispy-medu-vada.jpg",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 4.8,
    calories: 240,
    protein: 9,
    carbs: 26,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Whole Urad Dal (soaked 3 hours)", quantity: "1.5", unit: "cups" },
      { name: "Whole black peppercorns", quantity: "1", unit: "tsp" },
      { name: "Fresh coconut bits & curry leaves", quantity: "2", unit: "tbsp each" },
      { name: "Green chillies & ginger (chopped)", quantity: "1", unit: "tbsp each" },
      { name: "Oil for deep frying", quantity: "500", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Grind Fluffy Batter",
        instruction: "Grind soaked urad dal with minimal ice water into a thick, aerated, fluffy white paste. Aerate with your hand for 3 minutes.",
        timer_seconds: 300,
        tip: "Drop a small ball in water; if it floats, batter is perfectly aerated."
      },
      {
        step_number: 2,
        title: "Mix Seasonings",
        instruction: "Fold in peppercorns, cumin, chopped ginger, green chillies, curry leaves, coconut bits, and salt.",
        timer_seconds: 120,
        tip: "Coconut bits give a delightful crunch inside the soft vada."
      },
      {
        step_number: 3,
        title: "Shape & Fry",
        instruction: "Wet palms, shape into a ball, make a hole in center with thumb, and slide gently into medium-hot oil. Fry until golden and crispy.",
        timer_seconds: 360,
        tip: "Maintain medium oil heat so inside cooks completely without over-browning."
      }
    ]
  },
  {
    name: "Rava Onion Uttapam",
    slug: "rava-onion-uttapam",
    description: "Thick, soft fermented pancake studded with sweet caramelized onions, green chillies, and fresh coriander.",
    image: "/images/recipes/rava-onion-uttapam.jpg",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.8,
    calories: 230,
    protein: 6,
    carbs: 38,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Dosa or Rava batter", quantity: "3", unit: "cups" },
      { name: "Finely chopped red onions", quantity: "1.5", unit: "cups" },
      { name: "Green chillies & ginger (minced)", quantity: "1", unit: "tbsp each" },
      { name: "Curry leaves & fresh coriander", quantity: "3", unit: "tbsp" },
      { name: "Ghee or oil", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Pour Thick Pancake",
        instruction: "Pour a thick ladle of batter onto hot greased tawa. Do not spread thin like dosa; keep it thick.",
        timer_seconds: 60,
        tip: "A thick base yields a soft, spongy honeycomb interior."
      },
      {
        step_number: 2,
        title: "Top with Onions & Spices",
        instruction: "Immediately press chopped onions, chillies, and coriander into the wet surface. Drizzle oil around edges.",
        timer_seconds: 120,
        tip: "Press gently with spatula so toppings adhere while cooking."
      },
      {
        step_number: 3,
        title: "Flip and Crisp",
        instruction: "Flip over and cook for 2 minutes until onions are golden caramelized.",
        timer_seconds: 120,
        tip: "Serve hot with tangy red tomato chutney."
      }
    ]
  },
  {
    name: "Mysore Masala Dosa",
    slug: "mysore-masala-dosa",
    description: "Legendary Karnataka dosa smeared with spicy garlic red chilli chutney, loaded with potato saagu and butter.",
    image: "/images/recipes/mysore-masala-dosa.jpg",
    cuisine: "South Indian",
    region: "Karnataka",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 5.0,
    calories: 330,
    protein: 7,
    carbs: 46,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Fermented Dosa Batter", quantity: "3", unit: "cups" },
      { name: "Spicy Red Garlic Chutney", quantity: "1/2", unit: "cup" },
      { name: "Mysore Potato Saagu", quantity: "2", unit: "cups" },
      { name: "Salted Butter", quantity: "4", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Spread Batter",
        instruction: "Pour batter on hot tawa and spread into an even circular crepe.",
        timer_seconds: 60,
        tip: "Drizzle butter over surface."
      },
      {
        step_number: 2,
        title: "Smear Red Chutney",
        instruction: "When halfway cooked, spread a generous tablespoon of spicy red garlic chutney all over the dosa.",
        timer_seconds: 90,
        tip: "Chutney cooked directly onto the crepe gives the signature Mysore aroma."
      },
      {
        step_number: 3,
        title: "Fill & Serve",
        instruction: "Add potato filling in center, fold in half, and serve with extra butter melting on top.",
        timer_seconds: 60,
        tip: "Serve with cool coconut chutney to balance the fiery red paste."
      }
    ]
  },
  {
    name: "South Indian Curd Rice (Thayir Sadam)",
    slug: "south-indian-curd-rice",
    description: "Cool, creamy mashed rice folded with fresh yoghurt, tempered with mustard, ginger, curry leaves, and pomegranate arils.",
    image: "/images/recipes/south-indian-curd-rice.jpg",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Jain"],
    servings: 4,
    prep_time: 10,
    cook_time: 10,
    difficulty: "Easy",
    rating: 4.8,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 5,
    fasting_info: null,
    ingredients: [
      { name: "Cooked soft rice", quantity: "2", unit: "cups" },
      { name: "Fresh thick curd", quantity: "1.5", unit: "cups" },
      { name: "Milk", quantity: "1/2", unit: "cup" },
      { name: "Mustard seeds & urad dal", quantity: "1/2", unit: "tsp each" },
      { name: "Ginger & green chillies (minced)", quantity: "1", unit: "tbsp each" },
      { name: "Curry leaves & Hing", quantity: "8", unit: "leaves" },
      { name: "Pomegranate pearls & grapes", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Mash the Rice",
        instruction: "Mash hot cooked rice while warm with the back of a spoon. Let cool completely.",
        timer_seconds: 180,
        tip: "Adding a splash of milk prevents the curd rice from turning sour over hours."
      },
      {
        step_number: 2,
        title: "Mix Curd & Milk",
        instruction: "Fold in thick fresh curd, milk, and salt until smooth and luscious.",
        timer_seconds: 120,
        tip: "Use homemade fresh set curd for best flavor."
      },
      {
        step_number: 3,
        title: "Tempering & Fruit Topping",
        instruction: "Heat oil, crackle mustard, urad dal, ginger, chillies, and curry leaves. Pour over rice. Top with juicy pomegranate seeds.",
        timer_seconds: 120,
        tip: "Pomegranate seeds add a burst of sweet freshness."
      }
    ]
  },
  {
    name: "Tangy Lemon Rice (Chitranna)",
    slug: "tangy-lemon-rice",
    description: "Fragrant turmeric-infused basmati rice tempered with crunchy peanuts, curry leaves, mustard seeds, and fresh lemon juice.",
    image: "/images/recipes/tangy-lemon-rice.jpg",
    cuisine: "South Indian",
    region: "Karnataka",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Jain"],
    servings: 4,
    prep_time: 10,
    cook_time: 10,
    difficulty: "Easy",
    rating: 4.8,
    calories: 250,
    protein: 5,
    carbs: 44,
    fat: 7,
    fasting_info: null,
    ingredients: [
      { name: "Cooked fluffy rice (cooled)", quantity: "3", unit: "cups" },
      { name: "Fresh lemon juice", quantity: "3", unit: "tbsp" },
      { name: "Roasted peanuts", quantity: "3", unit: "tbsp" },
      { name: "Chana dal & Urad dal", quantity: "1", unit: "tsp each" },
      { name: "Mustard seeds & Turmeric", quantity: "1/2", unit: "tsp each" },
      { name: "Curry leaves & green chillies", quantity: "8", unit: "leaves" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Tempering",
        instruction: "Heat sesame oil in a pan. Add mustard seeds, chana dal, urad dal, and raw peanuts. Fry until golden and nutty.",
        timer_seconds: 180,
        tip: "Frying lentils on low heat makes them super crunchy."
      },
      {
        step_number: 2,
        title: "Add Aromatics & Turmeric",
        instruction: "Add slit green chillies, ginger, curry leaves, hing, and turmeric. Sauté for 30 seconds and turn off heat.",
        timer_seconds: 60,
        tip: "Turn off heat before adding lemon juice to prevent bitterness."
      },
      {
        step_number: 3,
        title: "Toss with Lemon & Rice",
        instruction: "Stir in fresh lemon juice and salt. Gently toss with cooled cooked rice until grains are uniformly golden.",
        timer_seconds: 180,
        tip: "Serve with crispy potato chips and pickle."
      }
    ]
  },
  {
    name: "Classic Tomato Rasam",
    slug: "classic-tomato-rasam",
    description: "Soothing, fiery, and aromatic South Indian soup of crushed country tomatoes, tamarind, black pepper, and garlic.",
    image: "/images/recipes/classic-tomato-rasam.jpg",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    servings: 4,
    prep_time: 10,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 85,
    protein: 3,
    carbs: 14,
    fat: 2,
    fasting_info: null,
    ingredients: [
      { name: "Ripe country tomatoes (mashed)", quantity: "3", unit: "large" },
      { name: "Tamarind extract", quantity: "2", unit: "tbsp" },
      { name: "Cooked toor dal water", quantity: "1", unit: "cup" },
      { name: "Black pepper & Cumin (crushed)", quantity: "1.5", unit: "tsp each" },
      { name: "Garlic cloves (crushed with skin)", quantity: "6", unit: "cloves" },
      { name: "Curry leaves & fresh coriander", quantity: "2", unit: "tbsp" },
      { name: "Ghee & mustard seeds for tempering", quantity: "1", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Boil Tomato Tamarind Broth",
        instruction: "Boil mashed tomatoes, tamarind extract, turmeric, crushed garlic, and curry leaves with 2 cups water for 8 minutes.",
        timer_seconds: 480,
        tip: "Crushing garlic with its skin yields maximum aroma."
      },
      {
        step_number: 2,
        title: "Add Rasam Powder & Dal Water",
        instruction: "Add crushed pepper-cumin rasam powder, cooked dal water, and salt. Bring to a gentle frothy simmer.",
        timer_seconds: 240,
        tip: "Do not let rasam boil violently; turn off heat as soon as foam forms on top."
      },
      {
        step_number: 3,
        title: "Ghee Tempering",
        instruction: "Crackle mustard seeds, dry red chillies, and hing in ghee and pour on top. Garnish with coriander.",
        timer_seconds: 60,
        tip: "Sip warm like soup or pour over hot steamed rice."
      }
    ]
  },
  {
    name: "Kerala Appam with Veg Stew",
    slug: "kerala-appam-with-veg-stew",
    description: "Lacy bowl-shaped fermented rice pancakes with a soft spongy center, served with fragrant coconut milk vegetable stew.",
    image: "/images/recipes/kerala-appam-with-veg-stew.jpg",
    cuisine: "South Indian",
    region: "Kerala",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Jain"],
    servings: 4,
    prep_time: 20,
    cook_time: 30,
    difficulty: "Medium",
    rating: 4.9,
    calories: 280,
    protein: 5,
    carbs: 46,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Raw rice & cooked rice", quantity: "2", unit: "cups" },
      { name: "Coconut milk (thick & thin)", quantity: "2", unit: "cups" },
      { name: "Yeast or coconut water (for fermenting)", quantity: "1/2", unit: "tsp" },
      { name: "Mixed vegetables (potatoes, carrots, beans)", quantity: "2", unit: "cups" },
      { name: "Whole spices (cardamom, cloves, cinnamon)", quantity: "1", unit: "tsp" },
      { name: "Coconut oil", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Make Appam Batter",
        instruction: "Grind soaked rice and cooked rice with coconut milk and yeast into a smooth batter. Ferment for 6 hours.",
        timer_seconds: 0,
        tip: "Ferment until batter doubles and smells delightfully yeasty."
      },
      {
        step_number: 2,
        title: "Cook Vegetable Stew",
        instruction: "Simmer vegetables in thin coconut milk with ginger, green chillies, and whole spices until tender. Finish with thick coconut milk.",
        timer_seconds: 600,
        tip: "Never boil thick coconut milk or it will separate."
      },
      {
        step_number: 3,
        title: "Swirl Appam in Appachatti",
        instruction: "Pour a ladle in curved pan, swirl 360 degrees to create thin lacy edges, cover and steam 2 minutes.",
        timer_seconds: 120,
        tip: "The center remains pillowy while edges turn paper-thin and crisp."
      }
    ]
  },
  {
    name: "Karnataka Bisi Bele Bath",
    slug: "karnataka-bisi-bele-bath",
    description: "Rich, comforting one-pot rice and toor dal dish cooked with vegetables, tamarind, and aromatic stone-ground Bisi Bele Bath spice powder.",
    image: "/images/recipes/karnataka-bisi-bele-bath.jpg",
    cuisine: "South Indian",
    region: "Karnataka",
    categorySlug: "south-indian",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 20,
    cook_time: 35,
    difficulty: "Medium",
    rating: 4.8,
    calories: 340,
    protein: 11,
    carbs: 56,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Sona Masoori Rice & Toor Dal", quantity: "1", unit: "cup each" },
      { name: "Mixed vegetables (beans, carrot, peas, shallots)", quantity: "2", unit: "cups" },
      { name: "Bisi Bele Bath Masala powder", quantity: "3", unit: "tbsp" },
      { name: "Tamarind extract & Jaggery", quantity: "2", unit: "tbsp each" },
      { name: "Ghee & Cashews for tadka", quantity: "3", unit: "tbsp" },
      { name: "Boondi for garnish", quantity: "1/2", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook Rice and Dal Together",
        instruction: "Pressure cook rice and toor dal with vegetables, turmeric, and 5 cups water for 4 whistles until very soft.",
        timer_seconds: 600,
        tip: "A semi-liquid consistency is ideal as it thickens upon cooling."
      },
      {
        step_number: 2,
        title: "Simmer with Masala and Tamarind",
        instruction: "Mix tamarind pulp, jaggery, and Bisi Bele Bath powder with 1 cup water. Pour into cooked rice-dal pot and simmer for 10 minutes.",
        timer_seconds: 600,
        tip: "Kopra (dry coconut) and kapok buds (marathi moggu) in masala give authentic Mysore flavor."
      },
      {
        step_number: 3,
        title: "Rich Ghee Tempering",
        instruction: "Fry golden cashews, mustard seeds, curry leaves, and hing in generous ghee and pour over.",
        timer_seconds: 120,
        tip: "Top with crunchy khara boondi and potato chips."
      }
    ]
  },

  // ==========================================
  // 10 FARALI / VRAT RECIPES
  // ==========================================
  {
    name: "Farali Aloo Paratha",
    slug: "farali-aloo-paratha",
    description: "Fasting-friendly gluten-free flatbread made with rajgira and singhara flour, stuffed with spiced mashed potatoes and rock salt.",
    image: "/images/recipes/farali-aloo-paratha.jpg",
    cuisine: "Farali",
    region: "Pan-Indian",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 240,
    protein: 5,
    carbs: 38,
    fat: 8,
    fasting_info: "Made strictly with vrat-approved Rajgira/Singhara flour, Sendha Namak (rock salt), green chillies, and roasted cumin. Fasting rules vary by tradition—verify permissible ingredients for your specific vrat.",
    ingredients: [
      { name: "Rajgira flour (Amaranth) & Singhara flour", quantity: "1", unit: "cup each" },
      { name: "Boiled potatoes (mashed)", quantity: "3", unit: "medium" },
      { name: "Sendha Namak (Rock salt)", quantity: "1", unit: "tsp" },
      { name: "Roasted cumin powder (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Green chillies (finely minced)", quantity: "2", unit: "pieces" },
      { name: "Fresh coriander leaves", quantity: "2", unit: "tbsp" },
      { name: "Ghee for roasting", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Vrat Dough",
        instruction: "Combine rajgira flour, singhara flour, 1 mashed potato, sendha namak, and 1 tsp ghee. Knead with warm water into soft dough.",
        timer_seconds: 240,
        tip: "Adding one mashed potato to the flour makes gluten-free vrat dough pliable without cracking."
      },
      {
        step_number: 2,
        title: "Prepare Spiced Aloo Filling",
        instruction: "Mix remaining mashed potatoes with chopped green chillies, roasted cumin, rock salt, and chopped fresh coriander.",
        timer_seconds: 180,
        tip: "Keep the potato filling dry so paratha does not tear."
      },
      {
        step_number: 3,
        title: "Roll Between Plastic Sheets",
        instruction: "Place dough ball on parchment or plastic sheet, stuff potato mixture, seal, and gently pat or roll into round flatbread.",
        timer_seconds: 180,
        tip: "Rolling between greased plastic prevents sticking of gluten-free vrat flours."
      },
      {
        step_number: 4,
        title: "Roast with Pure Desi Ghee",
        instruction: "Cook on medium-hot tawa with ghee on both sides until golden brown and crispy.",
        timer_seconds: 240,
        tip: "Serve hot with cool farali peanut curd raita or green mint-coriander vrat chutney."
      }
    ]
  },
  {
    name: "Sabudana Khichdi",
    slug: "sabudana-khichdi",
    description: "Classic pearl tapioca sautéed with crunchy roasted crushed peanuts, green chillies, cumin, and soft potato cubes in ghee.",
    image: "/images/recipes/sabudana-khichdi.jpg",
    cuisine: "Farali",
    region: "Maharashtra & Gujarat",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 5.0,
    calories: 320,
    protein: 6,
    carbs: 54,
    fat: 10,
    fasting_info: "100% Vrat friendly. Prepared with Sendha Namak, roasted peanuts, and cumin. No onions or garlic.",
    ingredients: [
      { name: "Sabudana (Tapioca pearls, soaked overnight)", quantity: "2", unit: "cups" },
      { name: "Roasted peanuts (coarsely ground)", quantity: "3/4", unit: "cup" },
      { name: "Boiled potato (diced)", quantity: "1", unit: "large" },
      { name: "Green chillies (slit or chopped)", quantity: "3", unit: "whole" },
      { name: "Cumin seeds (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Sendha Namak & Sugar", quantity: "1", unit: "tsp each" },
      { name: "Lemon juice & Ghee", quantity: "2", unit: "tbsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Check Soaked Sabudana",
        instruction: "Ensure sabudana pearls are soft to the core when pressed between fingers, with zero excess moisture.",
        timer_seconds: 60,
        tip: "Soak in equal volume of water for 5 hours; drain well in a colander."
      },
      {
        step_number: 2,
        title: "Coat with Roasted Peanuts",
        instruction: "Gently toss soaked sabudana with coarse roasted peanut powder, salt, and sugar in a mixing bowl.",
        timer_seconds: 120,
        tip: "Coating pearls with peanut powder ensures they never clump or get mushy while cooking."
      },
      {
        step_number: 3,
        title: "Tempering & Sauté",
        instruction: "Heat ghee in pan. Crackle cumin seeds and green chillies. Add diced potatoes and cook 2 minutes.",
        timer_seconds: 180,
        tip: "Cook potatoes until lightly crisp."
      },
      {
        step_number: 4,
        title: "Toss Sabudana",
        instruction: "Add sabudana mix. Cook on low-medium flame, stirring gently for 4-5 minutes until pearls turn translucent. Finish with lemon juice.",
        timer_seconds: 300,
        tip: "Do not overcook or tapioca will turn gummy. Turn off heat once translucent."
      }
    ]
  },
  {
    name: "Crispy Sabudana Vada",
    slug: "crispy-sabudana-vada",
    description: "Golden, crisp fasting patties made with soaked tapioca pearls, mashed potatoes, crushed peanuts, and green chillies.",
    image: "/images/recipes/crispy-sabudana-vada.jpg",
    cuisine: "Farali",
    region: "Maharashtra",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 4.9,
    calories: 290,
    protein: 5,
    carbs: 42,
    fat: 12,
    fasting_info: "Prepared with sendha namak and permissible fasting ingredients.",
    ingredients: [
      { name: "Sabudana (soaked)", quantity: "2", unit: "cups" },
      { name: "Boiled potatoes (mashed smooth)", quantity: "3", unit: "medium" },
      { name: "Roasted crushed peanuts", quantity: "1/2", unit: "cup" },
      { name: "Green chillies & fresh ginger", quantity: "1", unit: "tbsp minced" },
      { name: "Sendha Namak & Lemon juice", quantity: "1", unit: "tsp each" },
      { name: "Oil for frying", quantity: "500", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Mix Vada Dough",
        instruction: "Thoroughly mash potatoes with soaked sabudana, peanut powder, green chillies, ginger, lemon juice, and sendha namak into a firm dough.",
        timer_seconds: 300,
        tip: "Mashed potatoes act as the essential binder preventing vadas from bursting in oil."
      },
      {
        step_number: 2,
        title: "Shape Patties",
        instruction: "Grease palms with oil and shape into smooth, flat round patties without cracks on edges.",
        timer_seconds: 240,
        tip: "Flat patties cook through the center faster than round balls."
      },
      {
        step_number: 3,
        title: "Deep Fry or Air Fry",
        instruction: "Deep fry in medium-hot oil until golden brown and super crunchy on both sides (about 4-5 minutes).",
        timer_seconds: 300,
        tip: "Do not overcrowd the pan or oil temperature drops, causing vadas to absorb oil."
      }
    ]
  },
  {
    name: "Rajgira Puri",
    slug: "rajgira-puri",
    description: "Puffed, golden amaranth flour pooris cooked with mashed potatoes and rock salt, perfect for Navratri fasting.",
    image: "/images/recipes/rajgira-puri.jpg",
    cuisine: "Farali",
    region: "Pan-Indian",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Medium",
    rating: 4.8,
    calories: 220,
    protein: 6,
    carbs: 32,
    fat: 9,
    fasting_info: "Pure amaranth flour and rock salt suitable for strict Hindu fasts.",
    ingredients: [
      { name: "Rajgira flour (Amaranth)", quantity: "1.5", unit: "cups" },
      { name: "Boiled potato (grated)", quantity: "1", unit: "cup" },
      { name: "Sendha Namak", quantity: "1", unit: "tsp" },
      { name: "Black pepper powder", quantity: "1/2", unit: "tsp" },
      { name: "Ghee or oil for frying", quantity: "300", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Dough",
        instruction: "Knead rajgira flour with warm mashed potatoes and rock salt without adding water.",
        timer_seconds: 180,
        tip: "Potato moisture is sufficient to bind rajgira flour."
      },
      {
        step_number: 2,
        title: "Flatten Pooris",
        instruction: "Pat small balls of dough between greased plastic sheets into small discs.",
        timer_seconds: 180,
        tip: "Keep pooris slightly thicker than regular wheat pooris."
      },
      {
        step_number: 3,
        title: "Fry until Puffed",
        instruction: "Fry in hot ghee until puffed like balloons and golden.",
        timer_seconds: 120,
        tip: "Serve with farali aloo ki sabzi or sweet shrikhand."
      }
    ]
  },
  {
    name: "Singhara Atta Paratha",
    slug: "singhara-atta-paratha",
    description: "Nutritious water chestnut flour flatbread seasoned with roasted jeera, rock salt, and pan-roasted with pure desi ghee.",
    image: "/images/recipes/singhara-atta-paratha.jpg",
    cuisine: "Farali",
    region: "Pan-Indian",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.7,
    calories: 210,
    protein: 4,
    carbs: 36,
    fat: 7,
    fasting_info: "Water chestnut flour is a traditional vrat grain rich in minerals.",
    ingredients: [
      { name: "Singhara Atta (Water chestnut flour)", quantity: "1.5", unit: "cups" },
      { name: "Boiled potato (finely grated)", quantity: "1", unit: "large" },
      { name: "Green chillies (chopped)", quantity: "2", unit: "pieces" },
      { name: "Cumin powder & Sendha Namak", quantity: "1", unit: "tsp each" },
      { name: "Desi Ghee", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Dough",
        instruction: "Mix singhara flour with grated boiled potato, cumin, and sendha namak into a workable dough.",
        timer_seconds: 180,
        tip: "Singhara flour has high starch and binds well when hot."
      },
      {
        step_number: 2,
        title: "Pat and Shape",
        instruction: "Pat onto a wet cloth or parchment into an even round disc.",
        timer_seconds: 120,
        tip: "Do not use a rolling pin directly without parchment."
      },
      {
        step_number: 3,
        title: "Griddle with Ghee",
        instruction: "Roast on hot tawa with pure ghee until crisp golden brown spots develop.",
        timer_seconds: 180,
        tip: "Best enjoyed with sweet curd or homemade makhan."
      }
    ]
  },
  {
    name: "Farali Pattice",
    slug: "farali-pattice",
    description: "Crispy potato croquettes with a sweet and spicy center filling of fresh coconut, crushed peanuts, raisins, and sesame seeds.",
    image: "/images/recipes/farali-pattice.jpg",
    cuisine: "Farali",
    region: "Gujarat",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 4,
    prep_time: 25,
    cook_time: 20,
    difficulty: "Medium",
    rating: 5.0,
    calories: 270,
    protein: 5,
    carbs: 38,
    fat: 11,
    fasting_info: "Signature Gujarati fasting delicacy coated with arrowroot or singhara flour.",
    ingredients: [
      { name: "Boiled potatoes (grated)", quantity: "4", unit: "large" },
      { name: "Arrowroot or Singhara flour (for binding)", quantity: "3", unit: "tbsp" },
      { name: "Fresh grated coconut", quantity: "1/2", unit: "cup" },
      { name: "Crushed roasted peanuts", quantity: "1/4", unit: "cup" },
      { name: "Raisins & Cashews (chopped)", quantity: "2", unit: "tbsp each" },
      { name: "Green chillies & lemon juice", quantity: "1", unit: "tbsp each" },
      { name: "Sendha Namak & Sugar", quantity: "1", unit: "tsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Make Sweet-Savory Stuffing",
        instruction: "Mix coconut, peanuts, cashews, raisins, minced chillies, sugar, lemon juice, and sendha namak.",
        timer_seconds: 180,
        tip: "This rich stuffing provides the delightful sweet and spicy contrast."
      },
      {
        step_number: 2,
        title: "Stuff Potato Shells",
        instruction: "Take potato dough with arrowroot flour, flatten into a cup, fill 1 tbsp coconut mixture, and seal into an oval ball.",
        timer_seconds: 300,
        tip: "Roll outer ball in dry arrowroot powder for an ultra-crisp crust."
      },
      {
        step_number: 3,
        title: "Deep Fry",
        instruction: "Fry in medium-hot oil until uniformly golden and crisp. Drain on paper towels.",
        timer_seconds: 300,
        tip: "Serve with spicy farali green chutney."
      }
    ]
  },
  {
    name: "Moraiyo Khichdi (Sama Rice)",
    slug: "moraiyo-khichdi",
    description: "Soothing barnyard millet khichdi cooked with diced potatoes, roasted peanuts, ginger, and cumin in pure desi ghee.",
    image: "/images/recipes/moraiyo-khichdi.jpg",
    cuisine: "Farali",
    region: "Gujarat & Rajasthan",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 10,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.8,
    calories: 220,
    protein: 6,
    carbs: 40,
    fat: 5,
    fasting_info: "Barnyard millet (Moraiyo/Sama/Varai) is widely revered as the sacred grain for Indian fasts.",
    ingredients: [
      { name: "Moraiyo / Sama ke chawal (Barnyard millet)", quantity: "1", unit: "cup" },
      { name: "Diced potatoes", quantity: "1", unit: "medium" },
      { name: "Crushed roasted peanuts", quantity: "3", unit: "tbsp" },
      { name: "Cumin seeds (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Green chillies & Ginger (finely chopped)", quantity: "1", unit: "tbsp" },
      { name: "Sendha Namak", quantity: "1", unit: "tsp" },
      { name: "Desi Ghee", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Wash Sama Rice",
        instruction: "Rinse moraiyo grains gently in water and drain.",
        timer_seconds: 120,
        tip: "Millet cooks quickly and absorbs 3 times its volume of water."
      },
      {
        step_number: 2,
        title: "Tempering",
        instruction: "Heat ghee in a pot, crackle cumin seeds, green chillies, and ginger. Sauté diced potatoes for 2 minutes.",
        timer_seconds: 180,
        tip: "Ghee brings out the nutty fragrance of barnyard millet."
      },
      {
        step_number: 3,
        title: "Simmer Khichdi",
        instruction: "Add washed moraiyo, 3 cups boiling water, peanuts, and rock salt. Cover and simmer on low for 8-10 minutes until fluffy.",
        timer_seconds: 540,
        tip: "Pair with Farali Kadhi made with sour curd and rajgira flour."
      }
    ]
  },
  {
    name: "Makhana Kheer",
    slug: "makhana-kheer",
    description: "Royal fasting pudding made with ghee-roasted foxnuts simmered in cardamom-infused saffron milk and dry fruits.",
    image: "/images/recipes/makhana-kheer.jpg",
    cuisine: "Farali",
    region: "Pan-Indian",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Farali"],
    servings: 4,
    prep_time: 10,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.9,
    calories: 230,
    protein: 6,
    carbs: 32,
    fat: 9,
    fasting_info: "Nutritious foxnuts (lotus seeds) are approved across all Hindu vrat guidelines.",
    ingredients: [
      { name: "Phool Makhana (Foxnuts)", quantity: "2", unit: "cups" },
      { name: "Full fat milk", quantity: "1", unit: "liter" },
      { name: "Sugar or Jaggery", quantity: "1/3", unit: "cup" },
      { name: "Cardamom powder (Elaichi)", quantity: "1/2", unit: "tsp" },
      { name: "Saffron strands (Kesar)", quantity: "10-12", unit: "strands" },
      { name: "Almonds & Pistachios (slivered)", quantity: "2", unit: "tbsp each" },
      { name: "Ghee", quantity: "1", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Roast Foxnuts",
        instruction: "Roast makhana in ghee on low flame until crunchy. Coarsely crush half of the makhanas and keep half whole.",
        timer_seconds: 300,
        tip: "Crushing half the makhanas helps naturally thicken the milk without cornstarch."
      },
      {
        step_number: 2,
        title: "Simmer in Milk",
        instruction: "Boil milk with saffron, reduce slightly, add roasted makhanas, and simmer for 10-12 minutes until soft and creamy.",
        timer_seconds: 720,
        tip: "Stir occasionally to prevent milk from sticking to bottom."
      },
      {
        step_number: 3,
        title: "Sweeten & Garnish",
        instruction: "Add sugar, cardamom powder, and nuts. Simmer for 2 more minutes. Serve warm or chilled.",
        timer_seconds: 120,
        tip: "Chilling turns this into a luxurious royal dessert."
      }
    ]
  },
  {
    name: "Farali Dosa",
    slug: "farali-dosa",
    description: "Crispy thin fasting crepes made with sama rice and sago batter, served with peanut-coconut vrat chutney.",
    image: "/images/recipes/farali-dosa.jpg",
    cuisine: "Farali",
    region: "Pan-Indian",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Farali"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Medium",
    rating: 4.8,
    calories: 210,
    protein: 4,
    carbs: 42,
    fat: 4,
    fasting_info: "Made with Sama (vrat rice) and Sabudana with rock salt.",
    ingredients: [
      { name: "Sama rice (Moraiyo)", quantity: "1", unit: "cup" },
      { name: "Sabudana", quantity: "1/4", unit: "cup" },
      { name: "Sour curd", quantity: "1/2", unit: "cup" },
      { name: "Sendha Namak", quantity: "1", unit: "tsp" },
      { name: "Ghee for roasting", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Grind Batter",
        instruction: "Grind soaked sama rice and sabudana with sour curd and water into smooth pouring batter.",
        timer_seconds: 180,
        tip: "Sour curd provides instant fermentation tang without overnight waiting."
      },
      {
        step_number: 2,
        title: "Spread on Hot Tawa",
        instruction: "Pour a ladle on hot tawa and spread outward quickly into a thin circular crepe.",
        timer_seconds: 60,
        tip: "Keep tawa at medium-high heat for crisp lacy texture."
      },
      {
        step_number: 3,
        title: "Roast with Ghee",
        instruction: "Drizzle ghee around edges and roast until golden crisp.",
        timer_seconds: 120,
        tip: "Fold and serve hot with farali coconut chutney."
      }
    ]
  },
  {
    name: "Shakarkandi Chaat (Sweet Potato Chaat)",
    slug: "shakarkandi-chaat",
    description: "Roasted spiced sweet potato cubes tossed with roasted cumin, rock salt, fresh lemon juice, and pomegranate arils.",
    image: "/images/recipes/shakarkandi-chaat.jpg",
    cuisine: "Farali",
    region: "Delhi & North India",
    categorySlug: "farali-vrat",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free", "Farali"],
    servings: 2,
    prep_time: 10,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 180,
    protein: 3,
    carbs: 38,
    fat: 2,
    fasting_info: "Permissible for all types of fasts; high energy and nutrient-dense.",
    ingredients: [
      { name: "Sweet potatoes (Shakarkandi, boiled or roasted)", quantity: "3", unit: "medium" },
      { name: "Roasted cumin powder (Jeera)", quantity: "1", unit: "tsp" },
      { name: "Sendha Namak & Amchur / Lemon juice", quantity: "1", unit: "tsp each" },
      { name: "Green chillies (minced)", quantity: "1", unit: "tsp" },
      { name: "Pomegranate pearls & fresh coriander", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Roast Sweet Potatoes",
        instruction: "Peel boiled sweet potatoes, cut into bite-sized chunks, and toss on a hot tawa with 1 tsp ghee until edges are golden and lightly crisped.",
        timer_seconds: 300,
        tip: "Roasting intensifies the natural sweetness."
      },
      {
        step_number: 2,
        title: "Toss with Spices",
        instruction: "Transfer to a bowl. Add roasted cumin powder, sendha namak, green chillies, and lots of fresh lemon juice.",
        timer_seconds: 60,
        tip: "Toss while hot so the spices cling to the potatoes."
      },
      {
        step_number: 3,
        title: "Garnish and Enjoy",
        instruction: "Top with vibrant pomegranate seeds and fresh coriander.",
        timer_seconds: 60,
        tip: "A delicious, guilt-free street style snack during fasting."
      }
    ]
  },

  // ==========================================
  // 10 STREET FOOD & FAST FOOD RECIPES
  // ==========================================
  {
    name: "Mumbai Vada Pav",
    slug: "mumbai-vada-pav",
    description: "The heartbeat of Mumbai street food: crispy spiced potato fritter sandwiched in soft pav smeared with fiery garlic chutney and green chutney.",
    image: "/images/recipes/mumbai-vada-pav.jpg",
    cuisine: "Street Food",
    region: "Maharashtra",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 5.0,
    calories: 310,
    protein: 7,
    carbs: 45,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Ladi Pav (Bread buns)", quantity: "8", unit: "pieces" },
      { name: "Boiled potatoes (mashed)", quantity: "4", unit: "large" },
      { name: "Besan (Gram flour batter)", quantity: "1.5", unit: "cups" },
      { name: "Mustard seeds, curry leaves, hing", quantity: "1", unit: "tsp each" },
      { name: "Ginger, garlic, green chilli paste", quantity: "2", unit: "tbsp" },
      { name: "Dry Red Garlic Chutney", quantity: "4", unit: "tbsp" },
      { name: "Spicy fried green chillies", quantity: "8", unit: "pieces" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Potato Batata Filling",
        instruction: "Heat oil, crackle mustard seeds, curry leaves, turmeric, and ginger-garlic-chilli paste. Sauté with mashed potatoes and salt. Cool and shape into balls.",
        timer_seconds: 300,
        tip: "Do not skimp on garlic and green chillies for the true Shivaji Park flavor."
      },
      {
        step_number: 2,
        title: "Dip in Besan & Fry",
        instruction: "Dip each potato ball in seasoned besan batter. Deep fry in hot oil until crisp and light golden.",
        timer_seconds: 300,
        tip: "Flick extra droplets of batter into the hot oil to make crispy chura for the chutney!"
      },
      {
        step_number: 3,
        title: "Assemble Vada Pav",
        instruction: "Slit pav, smear with green mint chutney, sweet tamarind chutney, and a heap of dry garlic powder. Place hot vada and press gently.",
        timer_seconds: 120,
        tip: "Serve with salted fried green chillies and cutting chai."
      }
    ]
  },
  {
    name: "Mumbai Pav Bhaji",
    slug: "mumbai-pav-bhaji",
    description: "Mashed mixed vegetables simmered on a huge flat iron griddle with tomatoes, Pav Bhaji masala, and an unapologetic mountain of butter.",
    image: "/images/recipes/mumbai-pav-bhaji.jpg",
    cuisine: "Street Food",
    region: "Maharashtra",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 20,
    cook_time: 25,
    difficulty: "Medium",
    rating: 5.0,
    calories: 440,
    protein: 9,
    carbs: 58,
    fat: 20,
    fasting_info: null,
    ingredients: [
      { name: "Boiled mixed veg (potatoes, peas, cauliflower, capsicum)", quantity: "3", unit: "cups" },
      { name: "Finely chopped tomatoes", quantity: "2", unit: "cups" },
      { name: "Finely chopped onions", quantity: "1.5", unit: "cups" },
      { name: "Amul Butter", quantity: "100", unit: "grams" },
      { name: "Pav Bhaji Masala", quantity: "2.5", unit: "tbsp" },
      { name: "Kashmiri red chilli paste", quantity: "2", unit: "tbsp" },
      { name: "Pav buns", quantity: "8", unit: "buns" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Sauté Aromatics with Butter",
        instruction: "Melt 50g butter on a flat tawa or wide pan. Sauté chopped onions and capsicum until soft. Add ginger-garlic paste and tomatoes.",
        timer_seconds: 360,
        tip: "Cooking on a flat iron tawa gives street-style caramelization."
      },
      {
        step_number: 2,
        title: "Mash Vegetables & Add Masala",
        instruction: "Add boiled veggies, Kashmiri chilli paste, Pav Bhaji masala, and salt. Use a potato masher vigorously while simmering with splashes of water.",
        timer_seconds: 600,
        tip: "Continuous mashing gives that seamless buttery street texture."
      },
      {
        step_number: 3,
        title: "Toast Pav with Butter",
        instruction: "Slit pavs, melt butter with a pinch of pav bhaji masala and coriander on tawa, and toast pav until golden and crisp.",
        timer_seconds: 180,
        tip: "Serve bhaji with a large cube of melting butter, finely diced onions, and lime wedges."
      }
    ]
  },
  {
    name: "Kutchi Dabeli",
    slug: "kutchi-dabeli",
    description: "Gujarat's favorite street snack: spiced potato mash packed inside pav buns with masala peanuts, sev, pomegranate, and sweet chutneys.",
    image: "/images/recipes/kutchi-dabeli.jpg",
    cuisine: "Street Food",
    region: "Gujarat",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.9,
    calories: 320,
    protein: 6,
    carbs: 48,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Pav buns", quantity: "6", unit: "buns" },
      { name: "Boiled mashed potatoes", quantity: "3", unit: "large" },
      { name: "Kutchi Dabeli Masala", quantity: "2", unit: "tbsp" },
      { name: "Spicy Masala Sing (Peanuts)", quantity: "1/2", unit: "cup" },
      { name: "Nylon Sev", quantity: "1/2", unit: "cup" },
      { name: "Pomegranate seeds & fresh coriander", quantity: "1/2", unit: "cup" },
      { name: "Sweet date tamarind chutney & Garlic chutney", quantity: "4", unit: "tbsp each" },
      { name: "Butter for toasting", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Dabeli Potato Masala",
        instruction: "Cook mashed potatoes with dabeli masala, tamarind chutney, and salt in a pan. Spread on a plate and decorate with masala peanuts, coconut, pomegranate, and sev.",
        timer_seconds: 300,
        tip: "Layering the plate makes scooping the filling beautiful and easy."
      },
      {
        step_number: 2,
        title: "Stuff the Pav",
        instruction: "Slit pav, apply garlic chutney on one side and sweet chutney on the other. Stuff generously with spiced potato mixture.",
        timer_seconds: 120,
        tip: "Press firmly so the filling holds together."
      },
      {
        step_number: 3,
        title: "Toast in Butter & Roll in Sev",
        instruction: "Toast both sides of stuffed pav in sizzling butter on a tawa. Roll the open edges in crunchy nylon sev.",
        timer_seconds: 120,
        tip: "The contrast between crispy sev, crunchy peanuts, and buttery warm pav is pure magic."
      }
    ]
  },
  {
    name: "Classic Pani Puri / Golgappa",
    slug: "classic-pani-puri",
    description: "Crispy hollow semolina puries filled with spiced ragda or potatoes, dunked into chilled tangy mint water and sweet tamarind saunth.",
    image: "/images/recipes/classic-pani-puri.jpg",
    cuisine: "Street Food",
    region: "Pan-Indian",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 25,
    cook_time: 15,
    difficulty: "Medium",
    rating: 5.0,
    calories: 210,
    protein: 4,
    carbs: 38,
    fat: 5,
    fasting_info: null,
    ingredients: [
      { name: "Pani Puri Puris (crisp hollow balls)", quantity: "30", unit: "pieces" },
      { name: "Boiled potatoes & white peas ragda", quantity: "2", unit: "cups" },
      { name: "Fresh mint & coriander leaves for teekha pani", quantity: "2", unit: "cups" },
      { name: "Green chillies & ginger", quantity: "2", unit: "tbsp" },
      { name: "Roasted cumin & Black salt (Kala namak)", quantity: "1.5", unit: "tbsp" },
      { name: "Sweet Tamarind Chutney", quantity: "1", unit: "cup" },
      { name: "Boondi", quantity: "1/2", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Blend Spicy Mint Water (Teekha Pani)",
        instruction: "Blend fresh mint, coriander, green chillies, ginger, black salt, cumin, and hing with ice-cold water. Strain and add boondi.",
        timer_seconds: 300,
        tip: "Keep teekha pani chilled in the refrigerator for minimum 1 hour."
      },
      {
        step_number: 2,
        title: "Prepare Filling",
        instruction: "Mash boiled potatoes with boiled chickpeas or warm ragda, roasted cumin powder, red chilli powder, and black salt.",
        timer_seconds: 180,
        tip: "Warm ragda inside chilled water is a delicious contrast."
      },
      {
        step_number: 3,
        title: "Assemble and Devour",
        instruction: "Crack the top of a puri with your thumb, fill with potato-ragda, add 1/2 tsp sweet tamarind chutney, dunk full with spicy mint water, and eat in one bite!",
        timer_seconds: 60,
        tip: "Eat immediately before the puri loses its crunch."
      }
    ]
  },
  {
    name: "Mumbai Sev Puri",
    slug: "mumbai-sev-puri",
    description: "Crispy flat puris layered with diced potatoes, onions, trio of chutneys (garlic, green, sweet), and a snowstorm of nylon sev.",
    image: "/images/recipes/mumbai-sev-puri.jpg",
    cuisine: "Street Food",
    region: "Maharashtra",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 3,
    prep_time: 15,
    cook_time: 0,
    difficulty: "Easy",
    rating: 4.9,
    calories: 240,
    protein: 4,
    carbs: 36,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Papdi / Flat puris", quantity: "24", unit: "pieces" },
      { name: "Boiled potatoes (finely cubed)", quantity: "1.5", unit: "cups" },
      { name: "Finely chopped onions & raw mango", quantity: "1", unit: "cup" },
      { name: "Nylon Sev", quantity: "1", unit: "cup" },
      { name: "Spicy Garlic Chutney", quantity: "3", unit: "tbsp" },
      { name: "Mint-Coriander Green Chutney", quantity: "4", unit: "tbsp" },
      { name: "Sweet Dates Tamarind Chutney", quantity: "4", unit: "tbsp" },
      { name: "Chaat Masala", quantity: "1", unit: "tsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Arrange Flat Puris",
        instruction: "Arrange flat papdis on a serving platter in neat rows.",
        timer_seconds: 60,
        tip: "Use crisp, fresh papdis for the perfect crunch."
      },
      {
        step_number: 2,
        title: "Layer Vegetables & Chutneys",
        instruction: "Top each papdi with diced potatoes, onions, and grated raw mango. Drizzle with spicy garlic chutney, green chutney, and sweet chutney.",
        timer_seconds: 180,
        tip: "Raw mango adds an unbeatable tang."
      },
      {
        step_number: 3,
        title: "Smother with Sev",
        instruction: "Bury the platter under a mountain of crisp nylon sev, chopped coriander, and a dusting of chaat masala.",
        timer_seconds: 60,
        tip: "Serve immediately so puris do not become soggy."
      }
    ]
  },
  {
    name: "Chowpatty Bhel Puri",
    slug: "chowpatty-bhel-puri",
    description: "Airy puffed rice tossed with sev, crushed papdis, diced onions, tomatoes, raw mango, and three signature chutneys.",
    image: "/images/recipes/chowpatty-bhel-puri.jpg",
    cuisine: "Street Food",
    region: "Maharashtra",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 15,
    cook_time: 0,
    difficulty: "Easy",
    rating: 4.8,
    calories: 195,
    protein: 4,
    carbs: 34,
    fat: 5,
    fasting_info: null,
    ingredients: [
      { name: "Crispy Puffed Rice (Kurmura / Murmura)", quantity: "4", unit: "cups" },
      { name: "Nylon Sev & crushed papdis", quantity: "1", unit: "cup each" },
      { name: "Finely chopped onions, tomatoes & boiled potatoes", quantity: "1.5", unit: "cups" },
      { name: "Tamarind-date chutney & Spicy green chutney", quantity: "3", unit: "tbsp each" },
      { name: "Roasted peanuts & Raw mango pieces", quantity: "3", unit: "tbsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Crisp the Puffed Rice",
        instruction: "Dry roast murmura on low flame for 2 minutes if needed to make it ultra-crisp.",
        timer_seconds: 120,
        tip: "Crispy murmura is the secret to a crunchy bhel."
      },
      {
        step_number: 2,
        title: "Mix Vegetables & Papdi",
        instruction: "In a large bowl, combine murmura, onions, tomatoes, boiled potatoes, roasted peanuts, and crushed papdis.",
        timer_seconds: 90,
        tip: "Add raw mango for authentic seasonal Chowpatty style."
      },
      {
        step_number: 3,
        title: "Toss Chutneys and Serve Fast",
        instruction: "Drizzle green and sweet chutneys, toss rapidly with two spoons, top with sev, and serve in paper cones.",
        timer_seconds: 60,
        tip: "Bhel must be consumed within 2 minutes of tossing."
      }
    ]
  },
  {
    name: "Delhi Samosa Chaat",
    slug: "delhi-samosa-chaat",
    description: "Flaky golden samosas crushed and smothered with spicy chole gravy, whipped sweet curd, chutneys, and crunchy sev.",
    image: "/images/recipes/delhi-samosa-chaat.jpg",
    cuisine: "Street Food",
    region: "Delhi",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian"],
    servings: 3,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 5.0,
    calories: 420,
    protein: 10,
    carbs: 55,
    fat: 18,
    fasting_info: null,
    ingredients: [
      { name: "Crispy Punjabi Samosas (hot)", quantity: "4", unit: "pieces" },
      { name: "Cooked Punjabi Chole (spicy chickpeas)", quantity: "1.5", unit: "cups" },
      { name: "Whisked sweetened yoghurt (Curd)", quantity: "1", unit: "cup" },
      { name: "Sweet Tamarind Chutney & Mint Chutney", quantity: "3", unit: "tbsp each" },
      { name: "Finely chopped onions & fresh coriander", quantity: "1/2", unit: "cup" },
      { name: "Chaat masala & Roasted cumin powder", quantity: "1", unit: "tsp each" },
      { name: "Nylon Sev", quantity: "1/2", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Crush Samosas",
        instruction: "Place 1 or 2 hot samosas in a shallow bowl and gently crush with a spoon into large chunks.",
        timer_seconds: 30,
        tip: "Crispy crust chunks absorb the hot chole gravy."
      },
      {
        step_number: 2,
        title: "Ladle Hot Chole",
        instruction: "Ladle generous spoonfuls of steaming hot chole over the samosas.",
        timer_seconds: 60,
        tip: "Ensure chole has enough gravy to soak into the samosa crust."
      },
      {
        step_number: 3,
        title: "Drizzle Curd and Chutneys",
        instruction: "Pour chilled sweetened curd, tangy tamarind chutney, and fiery mint chutney. Garnish with onions, sev, and chaat masala.",
        timer_seconds: 60,
        tip: "Enjoy hot and cold together for the ultimate Delhi street feast."
      }
    ]
  },
  {
    name: "Crispy Aloo Tikki Chaat",
    slug: "crispy-aloo-tikki-chaat",
    description: "Deep griddled crispy spiced potato patties topped with warm yellow peas or chole, curd, and zesty chutneys.",
    image: "/images/recipes/crispy-aloo-tikki-chaat.jpg",
    cuisine: "Street Food",
    region: "Delhi & Uttar Pradesh",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 3,
    prep_time: 20,
    cook_time: 20,
    difficulty: "Medium",
    rating: 4.9,
    calories: 360,
    protein: 8,
    carbs: 48,
    fat: 15,
    fasting_info: null,
    ingredients: [
      { name: "Boiled potatoes (grated)", quantity: "4", unit: "large" },
      { name: "Corn flour or rice flour for crispiness", quantity: "2", unit: "tbsp" },
      { name: "Soaked chana dal filling with spices", quantity: "1/2", unit: "cup" },
      { name: "Ghee for shallow frying", quantity: "4", unit: "tbsp" },
      { name: "Whisked curd, chutneys, and pomegranate", quantity: "1", unit: "cup total" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Shape Stuffed Tikkis",
        instruction: "Mix grated potato with corn flour and salt. Cup into balls, stuff with spiced chana dal, and flatten into thick discs.",
        timer_seconds: 300,
        tip: "Chana dal stuffing adds legendary old Delhi texture."
      },
      {
        step_number: 2,
        title: "Slow Fry on Tawa",
        instruction: "Shallow fry in ghee on medium-low flame for 8-10 minutes, flipping until both sides form an ultra-crunchy crust.",
        timer_seconds: 600,
        tip: "Press lightly with spatula while frying to maximize surface crispness."
      },
      {
        step_number: 3,
        title: "Assemble Chaat",
        instruction: "Break tikki slightly, top with beaten curd, sweet tamarind saunth, green chutney, and julienned ginger.",
        timer_seconds: 60,
        tip: "Serve piping hot."
      }
    ]
  },
  {
    name: "Mumbai Veg Frankie (Kathi Roll)",
    slug: "mumbai-veg-frankie",
    description: "Warm roti rolled with a spiced potato cutlet, crunchy vinegar-soaked onions, and secret Frankie masala spice mix.",
    image: "/images/recipes/mumbai-veg-frankie.jpg",
    cuisine: "Street Food",
    region: "Maharashtra",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Easy",
    rating: 4.8,
    calories: 290,
    protein: 6,
    carbs: 45,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Maida / Wheat rotis", quantity: "4", unit: "pieces" },
      { name: "Spiced potato rolls (pan-fried)", quantity: "4", unit: "cutlets" },
      { name: "Vinegar green chillies (soaked)", quantity: "2", unit: "tbsp" },
      { name: "Thinly sliced onions", quantity: "1", unit: "cup" },
      { name: "Frankie Masala powder", quantity: "2", unit: "tsp" },
      { name: "Butter for toasting", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Pan Fry Potato Cutlet",
        instruction: "Pan fry cylindrical spiced potato patties in butter until browned and crisp on exterior.",
        timer_seconds: 240,
        tip: "Shape cutlets to the length of the roti."
      },
      {
        step_number: 2,
        title: "Toast Roti",
        instruction: "Toast roti on hot tawa with a dab of butter.",
        timer_seconds: 60,
        tip: "Do not over-toast or the roti will become too stiff to roll."
      },
      {
        step_number: 3,
        title: "Assemble Roll",
        instruction: "Place cutlet in center, top with crunchy onions, splash with vinegar-chilli juice, dust heavily with Frankie masala, and wrap tightly in foil.",
        timer_seconds: 120,
        tip: "Vinegar green chilli juice is the signature Tibb's Frankie secret."
      }
    ]
  },
  {
    name: "Veg Manchurian Dry",
    slug: "veg-manchurian-dry",
    description: "Crispy fried minced vegetable dumplings tossed in a sizzling wok with garlic, ginger, spring onions, and dark soya sauce.",
    image: "/images/recipes/veg-manchurian-dry.jpg",
    cuisine: "Street Food",
    region: "Indo-Chinese",
    categorySlug: "street-food",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 20,
    cook_time: 15,
    difficulty: "Medium",
    rating: 4.9,
    calories: 260,
    protein: 5,
    carbs: 32,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Finely shredded cabbage & carrots", quantity: "3", unit: "cups" },
      { name: "Corn flour & all-purpose flour", quantity: "3", unit: "tbsp each" },
      { name: "Garlic (finely chopped)", quantity: "3", unit: "tbsp" },
      { name: "Ginger & Green chillies", quantity: "1.5", unit: "tbsp" },
      { name: "Dark Soya sauce & Chilli sauce", quantity: "2", unit: "tbsp each" },
      { name: "Spring onions (chopped greens & whites)", quantity: "1/2", unit: "cup" },
      { name: "Oil for frying", quantity: "400", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Manchurian Balls",
        instruction: "Squeeze excess water from shredded cabbage and carrots. Mix with flours, black pepper, and salt. Shape into bite-sized balls.",
        timer_seconds: 300,
        tip: "Squeezing water out keeps the balls crispy after frying."
      },
      {
        step_number: 2,
        title: "Deep Fry Balls",
        instruction: "Deep fry in hot oil on medium heat until dark golden and crispy.",
        timer_seconds: 360,
        tip: "Double fry for extra restaurant crispiness."
      },
      {
        step_number: 3,
        title: "Wok Toss in Sauce",
        instruction: "Sizzle garlic, ginger, and green chillies in hot wok. Add sauces, vinegar, and spring onion whites. Toss fried balls rapidly for 1 minute.",
        timer_seconds: 120,
        tip: "Serve immediately garnished with fresh green spring onion greens."
      }
    ]
  },

  // ==========================================
  // 10 DESSERT & MITHAI RECIPES
  // ==========================================
  {
    name: "Classic Gulab Jamun",
    slug: "classic-gulab-jamun",
    description: "Melt-in-the-mouth milk solid (khoya) dumplings fried to deep golden brown and soaked in warm rose and cardamom sugar syrup.",
    image: "/images/recipes/classic-gulab-jamun.jpg",
    cuisine: "Desserts",
    region: "Pan-Indian",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian"],
    servings: 6,
    prep_time: 20,
    cook_time: 25,
    difficulty: "Medium",
    rating: 5.0,
    calories: 320,
    protein: 6,
    carbs: 48,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Mawa / Khoya (crumbled soft)", quantity: "250", unit: "grams" },
      { name: "Maida (All purpose flour)", quantity: "50", unit: "grams" },
      { name: "Paneer (grated fine)", quantity: "50", unit: "grams" },
      { name: "Sugar for syrup", quantity: "2", unit: "cups" },
      { name: "Cardamom pods & Rose water", quantity: "1", unit: "tsp" },
      { name: "Ghee for deep frying", quantity: "400", unit: "ml" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Khoya Dough",
        instruction: "Knead khoya, grated paneer, and flour with the heel of your hand until completely smooth and oil begins to release.",
        timer_seconds: 420,
        tip: "Knead until dough is soft and free from cracks."
      },
      {
        step_number: 2,
        title: "Make Rose Syrup",
        instruction: "Boil sugar and water with crushed cardamom pods and rose water for 6-8 minutes to a sticky half-string consistency.",
        timer_seconds: 480,
        tip: "Keep syrup warm, never boiling, when soaking jamuns."
      },
      {
        step_number: 3,
        title: "Slow Fry in Ghee",
        instruction: "Roll dough into crack-free small spheres. Fry in medium-low ghee, swirling ghee gently so they cook evenly to dark mahogany.",
        timer_seconds: 600,
        tip: "Frying on very low heat prevents raw center."
      },
      {
        step_number: 4,
        title: "Soak in Warm Syrup",
        instruction: "Transfer directly into warm syrup. Soak for at least 1 hour until doubled in size and succulent.",
        timer_seconds: 3600,
        tip: "Serve warm with a scoop of vanilla ice cream."
      }
    ]
  },
  {
    name: "Bengali Spongy Rasgulla",
    slug: "bengali-spongy-rasgulla",
    description: "Pillowy, spongy cottage cheese spheres poached in light, fragrant cardamom sugar syrup.",
    image: "/images/recipes/bengali-spongy-rasgulla.jpg",
    cuisine: "Desserts",
    region: "Bengal",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 25,
    cook_time: 20,
    difficulty: "Hard",
    rating: 4.9,
    calories: 190,
    protein: 5,
    carbs: 38,
    fat: 3,
    fasting_info: null,
    ingredients: [
      { name: "Fresh Cow Milk Chhena (cottage cheese)", quantity: "250", unit: "grams" },
      { name: "Semolina or Maida", quantity: "1", unit: "tsp" },
      { name: "Sugar", quantity: "2", unit: "cups" },
      { name: "Water for boiling", quantity: "6", unit: "cups" },
      { name: "Cardamom pods", quantity: "4", unit: "crushed" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Fresh Chhena",
        instruction: "Knead freshly drained cow milk chhena for 6-8 minutes until non-sticky, smooth, and greasy.",
        timer_seconds: 480,
        tip: "Use cow's milk for the lightest, springiest rasgullas."
      },
      {
        step_number: 2,
        title: "Roll Smooth Balls",
        instruction: "Roll into small smooth balls with zero cracks. They will expand to double size in syrup.",
        timer_seconds: 240,
        tip: "If balls have cracks, knead for 2 more minutes."
      },
      {
        step_number: 3,
        title: "Boil on High Flame",
        instruction: "Drop chhena balls into boiling thin sugar syrup. Cover tightly and boil on high heat for 10-12 minutes without opening.",
        timer_seconds: 720,
        tip: "Drop a cooked rasgulla in a cup of water; if it sinks to bottom, it is cooked perfectly."
      }
    ]
  },
  {
    name: "Gajar Ka Halwa",
    slug: "gajar-ka-halwa",
    description: "Classic Punjabi winter pudding of tender red carrots slow-simmered in full cream milk, khoya, pure ghee, and nuts.",
    image: "/images/recipes/gajar-ka-halwa.jpg",
    cuisine: "Desserts",
    region: "Punjab",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 20,
    cook_time: 45,
    difficulty: "Medium",
    rating: 5.0,
    calories: 340,
    protein: 7,
    carbs: 45,
    fat: 16,
    fasting_info: null,
    ingredients: [
      { name: "Red Delhi Carrots (grated)", quantity: "1", unit: "kg" },
      { name: "Full cream milk", quantity: "1", unit: "liter" },
      { name: "Mawa / Khoya", quantity: "150", unit: "grams" },
      { name: "Sugar", quantity: "3/4", unit: "cup" },
      { name: "Pure Desi Ghee", quantity: "4", unit: "tbsp" },
      { name: "Cashews, almonds, and pistachios", quantity: "1/4", unit: "cup slivered" },
      { name: "Cardamom powder", quantity: "1", unit: "tsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Simmer Carrots in Milk",
        instruction: "Cook grated red carrots with milk in a heavy kadai on medium flame until milk reduces completely.",
        timer_seconds: 1800,
        tip: "Red Delhi winter carrots provide the best natural sweetness and ruby hue."
      },
      {
        step_number: 2,
        title: "Add Ghee & Sugar",
        instruction: "Add sugar and ghee. The mixture will loosen; continue to roast on medium heat until ghee glazes the carrots.",
        timer_seconds: 600,
        tip: "Roasting in ghee deepens the flavor profile."
      },
      {
        step_number: 3,
        title: "Fold Khoya and Nuts",
        instruction: "Stir in crumbled khoya, cardamom powder, and fried nuts. Cook for 5 more minutes and serve warm.",
        timer_seconds: 300,
        tip: "Serve hot, optionally with rabdi on top."
      }
    ]
  },
  {
    name: "Kaju Katli",
    slug: "kaju-katli",
    description: "Silky, melt-in-mouth diamond-shaped cashew fudge flavored with green cardamom and finished with edible silver leaf.",
    image: "/images/recipes/kaju-katli.jpg",
    cuisine: "Desserts",
    region: "Pan-Indian",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    servings: 8,
    prep_time: 15,
    cook_time: 15,
    difficulty: "Medium",
    rating: 5.0,
    calories: 160,
    protein: 4,
    carbs: 18,
    fat: 9,
    fasting_info: null,
    ingredients: [
      { name: "Whole Cashews (ground to fine powder)", quantity: "2", unit: "cups" },
      { name: "Sugar", quantity: "1", unit: "cup" },
      { name: "Water", quantity: "1/2", unit: "cup" },
      { name: "Cardamom powder", quantity: "1/4", unit: "tsp" },
      { name: "Ghee for greasing", quantity: "1", unit: "tsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Pulse Cashew Powder",
        instruction: "Pulse cashews in short bursts in a blender to make fine powder without releasing oil. Sieve to ensure no chunks remain.",
        timer_seconds: 180,
        tip: "Pulse cashews cold; over-blending makes cashew butter."
      },
      {
        step_number: 2,
        title: "Cook in One-String Syrup",
        instruction: "Boil sugar and water to single string consistency. Lower heat, add cashew powder, and stir continuously for 6-8 minutes into smooth dough.",
        timer_seconds: 480,
        tip: "Test by rolling a small piece into a non-sticky ball with your fingers."
      },
      {
        step_number: 3,
        title: "Knead and Roll",
        instruction: "Transfer dough onto greased parchment. Knead gently while warm, roll thin with rolling pin, and cut into iconic diamond shapes.",
        timer_seconds: 300,
        tip: "Kneading while warm gives that ultra-smooth glossy texture."
      }
    ]
  },
  {
    name: "Gujarati Basundi",
    slug: "gujarati-basundi",
    description: "Thick, caramelized reduced milk dessert simmered with saffron, crushed green cardamom, charoli nuts, and sliced pistachios.",
    image: "/images/recipes/gujarati-basundi.jpg",
    cuisine: "Desserts",
    region: "Gujarat",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 10,
    cook_time: 40,
    difficulty: "Medium",
    rating: 4.9,
    calories: 270,
    protein: 8,
    carbs: 32,
    fat: 13,
    fasting_info: null,
    ingredients: [
      { name: "Whole buffalo or full cream milk", quantity: "1.5", unit: "liters" },
      { name: "Sugar", quantity: "1/2", unit: "cup" },
      { name: "Saffron strands (Kesar)", quantity: "15", unit: "strands" },
      { name: "Charoli (Chironji) nuts", quantity: "2", unit: "tbsp" },
      { name: "Cardamom & Nutmeg powder", quantity: "1/2", unit: "tsp each" },
      { name: "Almond and pistachio slivers", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Slow Reduce Milk",
        instruction: "Boil milk in a wide heavy pan. Lower flame and simmer, stirring scraping malai from sides back into milk until reduced to half.",
        timer_seconds: 1800,
        tip: "Scraping the cream back into the milk creates luscious malai ribbons."
      },
      {
        step_number: 2,
        title: "Add Aromatics and Sugar",
        instruction: "Add soaked saffron, sugar, charoli nuts, and cardamom-nutmeg powder. Simmer for 8 more minutes.",
        timer_seconds: 480,
        tip: "A pinch of nutmeg is the signature Gujarati secret."
      },
      {
        step_number: 3,
        title: "Chill and Serve",
        instruction: "Let cool completely, then chill in refrigerator for 2 hours. Serve with warm pooris or jalebis.",
        timer_seconds: 120,
        tip: "Basundi thickens further when chilled."
      }
    ]
  },
  {
    name: "Kesar Pista Shrikhand",
    slug: "kesar-pista-shrikhand",
    description: "Luscious, velvety dessert made from hung yoghurt sweetened with sugar and infused with saffron, pistachios, and cardamom.",
    image: "/images/recipes/kesar-pista-shrikhand.jpg",
    cuisine: "Desserts",
    region: "Gujarat & Maharashtra",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 0,
    difficulty: "Easy",
    rating: 5.0,
    calories: 260,
    protein: 9,
    carbs: 34,
    fat: 10,
    fasting_info: "Vrat approved when made with pure hung yoghurt and permissible spices.",
    ingredients: [
      { name: "Hung Curd (Chakka / strained Greek yoghurt)", quantity: "500", unit: "grams" },
      { name: "Powdered Sugar", quantity: "3/4", unit: "cup" },
      { name: "Warm milk with soaked saffron", quantity: "2", unit: "tbsp" },
      { name: "Cardamom powder", quantity: "1/2", unit: "tsp" },
      { name: "Pistachios (slivers)", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Hang the Curd",
        instruction: "Tie fresh curd in a cheesecloth and hang overnight or 6 hours in refrigerator to drain all whey.",
        timer_seconds: 0,
        tip: "Straining in refrigerator prevents yoghurt from turning sour."
      },
      {
        step_number: 2,
        title: "Whisk until Glossy",
        instruction: "Pass chakka through a fine mesh sieve or whisk vigorously with powdered sugar, saffron milk, and cardamom until satiny smooth.",
        timer_seconds: 300,
        tip: "Passing through a sieve guarantees a silky, lump-free texture."
      },
      {
        step_number: 3,
        title: "Chill and Garnish",
        instruction: "Garnish with heaps of bright green pistachio slivers. Chill for 1 hour before serving.",
        timer_seconds: 60,
        tip: "Classic accompaniment to hot Gujarati puris."
      }
    ]
  },
  {
    name: "Bengali Sandesh",
    slug: "bengali-sandesh",
    description: "Delicate and subtly sweet melt-in-mouth confection crafted from freshly prepared chhena, green cardamom, and saffron.",
    image: "/images/recipes/bengali-sandesh.jpg",
    cuisine: "Desserts",
    region: "Bengal",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 20,
    cook_time: 10,
    difficulty: "Medium",
    rating: 4.8,
    calories: 140,
    protein: 6,
    carbs: 18,
    fat: 5,
    fasting_info: null,
    ingredients: [
      { name: "Fresh Chhena (well drained)", quantity: "300", unit: "grams" },
      { name: "Powdered Sugar or Date Palm Jaggery (Nolen Gur)", quantity: "1/2", unit: "cup" },
      { name: "Cardamom powder", quantity: "1/2", unit: "tsp" },
      { name: "Pistachios for garnish", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Chhena",
        instruction: "Knead drained fresh chhena with sugar until completely smooth.",
        timer_seconds: 300,
        tip: "Fresh cow milk chhena makes the softest sandesh."
      },
      {
        step_number: 2,
        title: "Gentle Cooking (Pak)",
        instruction: "Cook the mixture in a non-stick pan on lowest heat for 4-5 minutes until it leaves sides of pan.",
        timer_seconds: 300,
        tip: "Do not overcook or chhena will turn crumbly and lose moisture."
      },
      {
        step_number: 3,
        title: "Mould & Garnish",
        instruction: "Shape into traditional wooden moulds or roll into balls and press pistachios in center.",
        timer_seconds: 180,
        tip: "Allow to set at room temperature before serving."
      }
    ]
  },
  {
    name: "Jalebi with Creamy Rabdi",
    slug: "jalebi-with-creamy-rabdi",
    description: "Crispy, piping hot saffron-soaked jalebi spirals served over a bed of chilled, slow-simmered rich rabdi.",
    image: "/images/recipes/jalebi-with-creamy-rabdi.jpg",
    cuisine: "Desserts",
    region: "North India",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 25,
    cook_time: 35,
    difficulty: "Hard",
    rating: 5.0,
    calories: 410,
    protein: 8,
    carbs: 62,
    fat: 16,
    fasting_info: null,
    ingredients: [
      { name: "Fermented Jalebi batter", quantity: "2", unit: "cups" },
      { name: "Saffron sugar syrup", quantity: "2", unit: "cups" },
      { name: "Full cream milk (for Rabdi)", quantity: "1.5", unit: "liters" },
      { name: "Sugar for rabdi", quantity: "1/4", unit: "cup" },
      { name: "Ghee for frying jalebi", quantity: "400", unit: "ml" },
      { name: "Cardamom and pistachio slivers", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Rabdi",
        instruction: "Slow-simmer milk in wide pan, collecting layers of skin (laccha) on the sides. When milk is reduced by 70%, stir layers back with sugar and cardamom.",
        timer_seconds: 1800,
        tip: "Chill rabdi completely before serving with hot jalebi."
      },
      {
        step_number: 2,
        title: "Pipe Jalebis in Ghee",
        instruction: "Pipe batter in tight spirals into medium-hot flat kadai of ghee. Fry until crisp and golden.",
        timer_seconds: 180,
        tip: "A flat-bottomed kadai gives the best circular spiral control."
      },
      {
        step_number: 3,
        title: "Dip in Syrup & Serve with Rabdi",
        instruction: "Dip hot jalebis in warm saffron syrup for 45 seconds. Arrange on top of chilled thick rabdi.",
        timer_seconds: 60,
        tip: "The hot crunchy jalebi with cold creamy rabdi is the king of Indian sweet pairings."
      }
    ]
  },
  {
    name: "Royal Rasmalai",
    slug: "royal-rasmalai",
    description: "Delicate flattened chhena patties soaked in rich, saffron-cardamom flavored thickened milk, garnished with pistachio slivers.",
    image: "/images/recipes/royal-rasmalai.jpg",
    cuisine: "Desserts",
    region: "Bengal & Odisha",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 30,
    cook_time: 30,
    difficulty: "Hard",
    rating: 5.0,
    calories: 280,
    protein: 9,
    carbs: 36,
    fat: 11,
    fasting_info: null,
    ingredients: [
      { name: "Fresh Chhena patties (poached in syrup)", quantity: "12", unit: "pieces" },
      { name: "Full cream milk (for Ras)", quantity: "1.2", unit: "liters" },
      { name: "Sugar", quantity: "1/2", unit: "cup" },
      { name: "Saffron strands (Kesar)", quantity: "20", unit: "strands" },
      { name: "Cardamom powder", quantity: "1/2", unit: "tsp" },
      { name: "Slivered pistachios and almonds", quantity: "4", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Poach Chhena Patties",
        instruction: "Shape kneaded chhena into flat discs and boil in thin sugar syrup for 10 minutes until spongy.",
        timer_seconds: 600,
        tip: "Gently squeeze out excess sugar syrup between two flat ladles while warm."
      },
      {
        step_number: 2,
        title: "Prepare Saffron Ras",
        instruction: "Simmer milk until reduced by half. Add saffron, sugar, and cardamom powder.",
        timer_seconds: 1200,
        tip: "Keep milk slightly light so the spongy patties can absorb it."
      },
      {
        step_number: 3,
        title: "Soak and Chill",
        instruction: "Place squeezed patties into the warm saffron milk. Chill in refrigerator for at least 4 hours before serving.",
        timer_seconds: 0,
        tip: "Patties absorb the fragrant yellow milk and turn ultra-soft."
      }
    ]
  },
  {
    name: "Moong Dal Halwa",
    slug: "moong-dal-halwa",
    description: "Opulent Rajasthani winter dessert made with split yellow moong lentils roasted in pure desi ghee, sugar syrup, and dry fruits.",
    image: "/images/recipes/moong-dal-halwa.jpg",
    cuisine: "Desserts",
    region: "Rajasthan",
    categorySlug: "desserts",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 20,
    cook_time: 40,
    difficulty: "Hard",
    rating: 4.9,
    calories: 420,
    protein: 8,
    carbs: 52,
    fat: 22,
    fasting_info: null,
    ingredients: [
      { name: "Yellow Moong Dal (soaked & ground coarse)", quantity: "1", unit: "cup" },
      { name: "Pure Desi Ghee", quantity: "1", unit: "cup" },
      { name: "Sugar", quantity: "1", unit: "cup" },
      { name: "Water or milk", quantity: "2", unit: "cups" },
      { name: "Cardamom & Saffron", quantity: "1", unit: "tsp" },
      { name: "Roasted cashews & almonds", quantity: "1/4", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Slow Roast Dal in Ghee",
        instruction: "Melt ghee in heavy kadai, add coarse moong paste. Roast on low flame for 25-30 minutes until golden brown and aromatic.",
        timer_seconds: 1800,
        tip: "Patience is key: continuous stirring prevents sticking and burns."
      },
      {
        step_number: 2,
        title: "Add Warm Milk/Syrup",
        instruction: "Carefully pour hot saffron milk or water into roasted dal, stirring continuously to prevent lumps.",
        timer_seconds: 300,
        tip: "Pour carefully as hot steam will billow."
      },
      {
        step_number: 3,
        title: "Cook until Ghee Separates",
        instruction: "Stir in sugar and cardamom. Cook until halwa absorbs liquid and releases glistening ghee along the sides.",
        timer_seconds: 420,
        tip: "Serve piping hot for celebratory royal feasts."
      }
    ]
  },

  // ==========================================
  // 10 REGIONAL & NORTH INDIAN RECIPES
  // ==========================================
  {
    name: "Kashmiri Dum Aloo",
    slug: "kashmiri-dum-aloo",
    description: "Deep-fried baby potatoes slow-cooked under steam (dum) in a fragrant, rich fennel and dry ginger infused curd gravy.",
    image: "/images/recipes/kashmiri-dum-aloo.jpg",
    cuisine: "Kashmiri",
    region: "Kashmir",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Jain"],
    servings: 4,
    prep_time: 20,
    cook_time: 35,
    difficulty: "Medium",
    rating: 4.9,
    calories: 310,
    protein: 6,
    carbs: 42,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Baby potatoes (boiled & peeled)", quantity: "500", unit: "grams" },
      { name: "Whisked Curd (Yoghurt)", quantity: "1.5", unit: "cups" },
      { name: "Kashmiri red chilli powder", quantity: "2", unit: "tbsp" },
      { name: "Fennel powder (Saunf)", quantity: "1.5", unit: "tbsp" },
      { name: "Dry ginger powder (Saunth)", quantity: "1", unit: "tsp" },
      { name: "Mustard oil", quantity: "4", unit: "tbsp" },
      { name: "Asafoetida (Hing) & Cloves", quantity: "1/2", unit: "tsp each" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prick and Fry Potatoes",
        instruction: "Prick baby potatoes all over with a fork. Deep fry in hot mustard oil until golden brown and crispy.",
        timer_seconds: 480,
        tip: "Pricking lets the luscious curd gravy penetrate to the potato's core."
      },
      {
        step_number: 2,
        title: "Whisk Spiced Curd Base",
        instruction: "Whisk curd with Kashmiri chilli powder, saunf powder, saunth powder, and salt. Cook in hot mustard oil with hing and cloves, stirring constantly.",
        timer_seconds: 420,
        tip: "Continuous whisking prevents curd from splitting."
      },
      {
        step_number: 3,
        title: "Dum Cooking",
        instruction: "Add fried potatoes to gravy, seal pot with foil or dough, and slow-cook on low flame (dum) for 15-20 minutes.",
        timer_seconds: 1020,
        tip: "Serve with steamed basmati rice or sheermal."
      }
    ]
  },
  {
    name: "Rajasthani Dal Baati Churma",
    slug: "rajasthani-dal-baati-churma",
    description: "The crown jewel of Rajasthan: hard wheat dumplings baked over coals, dunked in pure ghee, served with panchmel dal and sweet churma.",
    image: "/images/recipes/rajasthani-dal-baati-churma.jpg",
    cuisine: "Rajasthani",
    region: "Rajasthan",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 30,
    cook_time: 45,
    difficulty: "Hard",
    rating: 5.0,
    calories: 580,
    protein: 18,
    carbs: 76,
    fat: 24,
    fasting_info: null,
    ingredients: [
      { name: "Whole wheat coarse flour (Atta)", quantity: "2", unit: "cups" },
      { name: "Panchmel Dal (mix of 5 lentils)", quantity: "1.5", unit: "cups" },
      { name: "Pure Desi Ghee", quantity: "1/2", unit: "cup" },
      { name: "Carom seeds (Ajwain)", quantity: "1", unit: "tsp" },
      { name: "Jaggery & Cardamom for Churma", quantity: "1/2", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Make Baati Dough",
        instruction: "Knead coarse wheat flour with 3 tbsp ghee, ajwain, and salt into a firm dough. Shape into round balls with an indentation in center.",
        timer_seconds: 300,
        tip: "A firm dough yields flaky, well-cooked baatis."
      },
      {
        step_number: 2,
        title: "Bake Baatis",
        instruction: "Bake in an oven at 200°C or baati tandoor for 25-30 minutes, turning halfway until cracked and golden brown.",
        timer_seconds: 1800,
        tip: "Cracks on the baati surface indicate they are baked through to the center."
      },
      {
        step_number: 3,
        title: "Dunk in Ghee & Serve with Dal",
        instruction: "Gently crush hot baati between your palms and dip completely in warm melted desi ghee. Serve with steaming spicy panchmel dal and sweet powdered churma.",
        timer_seconds: 180,
        tip: "The quintessential royal Rajasthani meal."
      }
    ]
  },
  {
    name: "Kolhapuri Misal Pav",
    slug: "kolhapuri-misal-pav",
    description: "Fiery sprouted moth bean curry with a layer of spicy red oil 'kat' or 'rassa', topped with farsan, chopped onions, and lemon.",
    image: "/images/recipes/kolhapuri-misal-pav.jpg",
    cuisine: "Maharashtrian",
    region: "Maharashtra",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 20,
    cook_time: 25,
    difficulty: "Medium",
    rating: 4.9,
    calories: 360,
    protein: 14,
    carbs: 52,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Sprouted Matki (Moth beans)", quantity: "2", unit: "cups" },
      { name: "Misal Farsan / Chiwda", quantity: "1.5", unit: "cups" },
      { name: "Ladi Pav", quantity: "8", unit: "buns" },
      { name: "Kolhapuri Kanda-Lasun Masala", quantity: "2", unit: "tbsp" },
      { name: "Dry coconut & onion paste", quantity: "1/2", unit: "cup roasted" },
      { name: "Chopped onions, coriander & lemon wedges", quantity: "1", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook Sprouted Matki",
        instruction: "Boil sprouted matki with turmeric and salt until tender but holding shape.",
        timer_seconds: 480,
        tip: "Sprouted moth beans are packed with protein and natural sweetness."
      },
      {
        step_number: 2,
        title: "Prepare the Fiery Kat (Tarri)",
        instruction: "Sauté roasted coconut-onion paste in oil with Kolhapuri masala until deep red oil floats to top. Add dal broth and simmer.",
        timer_seconds: 600,
        tip: "The thin floating red oil layer is the soul of authentic Kolhapuri misal."
      },
      {
        step_number: 3,
        title: "Layer and Serve",
        instruction: "In a wide bowl, place cooked matki, add crunchy farsan, ladle fiery kat all around, and top with raw onions and fresh coriander.",
        timer_seconds: 120,
        tip: "Eat with soft pav and extra kat served in a side bowl."
      }
    ]
  },
  {
    name: "Maharashtrian Puran Poli",
    slug: "maharashtrian-puran-poli",
    description: "Festive sweet flatbread stuffed with a luscious spiced filling of chana dal, jaggery, nutmeg, and cardamom, smeared with ghee.",
    image: "/images/recipes/maharashtrian-puran-poli.jpg",
    cuisine: "Maharashtrian",
    region: "Maharashtra",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 25,
    cook_time: 25,
    difficulty: "Hard",
    rating: 5.0,
    calories: 290,
    protein: 8,
    carbs: 52,
    fat: 6,
    fasting_info: null,
    ingredients: [
      { name: "Chana dal (split Bengal gram)", quantity: "1.5", unit: "cups" },
      { name: "Jaggery (Gud, grated)", quantity: "1.5", unit: "cups" },
      { name: "Nutmeg powder (Jaiphal) & Cardamom", quantity: "1/2", unit: "tsp each" },
      { name: "All-purpose & wheat flour dough", quantity: "2", unit: "cups" },
      { name: "Desi Ghee", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Cook Chana Dal & Jaggery Puran",
        instruction: "Boil chana dal until soft, mash with jaggery, and cook in a pan with cardamom and nutmeg until thick and firm.",
        timer_seconds: 900,
        tip: "Pass hot puran through puran yantra or sieve for an ultra-velvety texture."
      },
      {
        step_number: 2,
        title: "Stuff and Roll Thin",
        instruction: "Cup soft dough in palms, place puran ball equal to dough size, seal tightly, and roll out thin with gentle strokes.",
        timer_seconds: 300,
        tip: "Equal ratio of dough to puran ensures it puffs up completely."
      },
      {
        step_number: 3,
        title: "Roast with Ghee",
        instruction: "Cook on medium tawa until it puffs like a balloon with golden spots. Brush with generous melted ghee.",
        timer_seconds: 180,
        tip: "Serve warm with Katachi Amti or a bowl of warm milk with ghee."
      }
    ]
  },
  {
    name: "Bengali Luchi & Alur Dom",
    slug: "bengali-luchi-alur-dom",
    description: "Crispy, white puffed flour flatbreads paired with rich, spicy, dry ginger-asafoetida baby potato curry.",
    image: "/images/recipes/bengali-luchi-alur-dom.jpg",
    cuisine: "Bengali",
    region: "Bengal",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Jain"],
    servings: 4,
    prep_time: 25,
    cook_time: 25,
    difficulty: "Medium",
    rating: 4.9,
    calories: 380,
    protein: 7,
    carbs: 56,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Maida for Luchi", quantity: "2", unit: "cups" },
      { name: "Baby potatoes (boiled & peeled)", quantity: "500", unit: "grams" },
      { name: "Panch Phoron (Bengali 5 spice mix)", quantity: "1", unit: "tsp" },
      { name: "Ginger paste & Tomato paste", quantity: "2", unit: "tbsp each" },
      { name: "Mustard oil & Ghee", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Knead Luchi Dough",
        instruction: "Knead maida with 2 tbsp ghee and water into soft dough. Rest 15 minutes.",
        timer_seconds: 300,
        tip: "Luchis are made without browning, remaining pristine white."
      },
      {
        step_number: 2,
        title: "Cook Niramish Alur Dom",
        instruction: "Sauté baby potatoes with panch phoron, ginger, cumin, tomato, and Kashmiri chilli. Simmer until sauce clings to potatoes.",
        timer_seconds: 600,
        tip: "Niramish means no onion, no garlic, letting the hing and spices sing."
      },
      {
        step_number: 3,
        title: "Fry White Luchis",
        instruction: "Roll small rounds and fry in hot oil for 20 seconds each until fully puffed and soft-crisp.",
        timer_seconds: 120,
        tip: "The quintessential Sunday breakfast of Kolkata."
      }
    ]
  },
  {
    name: "Kashmiri Paneer Rogan Josh",
    slug: "kashmiri-paneer-rogan-josh",
    description: "Crispy fried cottage cheese simmered in a regal gravy infused with ratan jot (cockscomb), Kashmiri chillies, fennel, and hing.",
    image: "/images/recipes/kashmiri-paneer-rogan-josh.jpg",
    cuisine: "Kashmiri",
    region: "Kashmir",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 25,
    difficulty: "Medium",
    rating: 4.8,
    calories: 360,
    protein: 18,
    carbs: 10,
    fat: 26,
    fasting_info: null,
    ingredients: [
      { name: "Paneer (cut into large cubes)", quantity: "350", unit: "grams" },
      { name: "Kashmiri red chilli powder & Ratan jot", quantity: "2", unit: "tbsp" },
      { name: "Fennel powder (Saunf) & Dry ginger (Saunth)", quantity: "1.5", unit: "tbsp each" },
      { name: "Whisked yoghurt (Curd)", quantity: "1", unit: "cup" },
      { name: "Mustard oil", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Fry Paneer",
        instruction: "Fry paneer cubes in hot mustard oil until golden brown on all sides. Plunge into warm salted water.",
        timer_seconds: 300,
        tip: "Soaking fried paneer in warm water keeps it incredibly succulent."
      },
      {
        step_number: 2,
        title: "Cook Rogan Gravy",
        instruction: "Temper mustard oil with black cardamom, cloves, and hing. Stir in Kashmiri chilli paste and whisked curd continuously.",
        timer_seconds: 480,
        tip: "Whisk curd non-stop until it boils to avoid curdling."
      },
      {
        step_number: 3,
        title: "Simmer with Paneer",
        instruction: "Add paneer cubes, saunf, saunth, and garam masala. Simmer gently for 10 minutes until aromatic red oil floats on surface.",
        timer_seconds: 600,
        tip: "Serve with steaming hot long-grain Kashmiri basmati rice."
      }
    ]
  },
  {
    name: "Goan Coconut Veg Caldine",
    slug: "goan-coconut-veg-caldine",
    description: "Mild, fragrant yellow Goan coconut curry loaded with fresh vegetables, spiced with green chillies, cumin, and vinegar.",
    image: "/images/recipes/goan-coconut-veg-caldine.jpg",
    cuisine: "Goan",
    region: "Goa",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    servings: 4,
    prep_time: 15,
    cook_time: 20,
    difficulty: "Easy",
    rating: 4.8,
    calories: 240,
    protein: 5,
    carbs: 22,
    fat: 16,
    fasting_info: null,
    ingredients: [
      { name: "Thick & thin fresh coconut milk", quantity: "2", unit: "cups" },
      { name: "Mixed vegetables (cauliflower, beans, carrots, potatoes)", quantity: "2.5", unit: "cups" },
      { name: "Turmeric powder & cumin", quantity: "1", unit: "tsp each" },
      { name: "Green chillies (slit)", quantity: "3", unit: "whole" },
      { name: "Goan toddy vinegar or lemon juice", quantity: "1", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Boil Vegetables in Thin Coconut Milk",
        instruction: "Cook vegetables with turmeric, slit chillies, and thin coconut milk until just fork-tender.",
        timer_seconds: 600,
        tip: "Thin coconut milk imparts subtle coconut sweetness into the veggies."
      },
      {
        step_number: 2,
        title: "Finish with Thick Milk & Vinegar",
        instruction: "Stir in thick first-pressed coconut milk, splash of vinegar, and salt. Bring to gentle simmer and turn off immediately.",
        timer_seconds: 180,
        tip: "Do not boil thick coconut milk or it will curdle."
      },
      {
        step_number: 3,
        title: "Serve",
        instruction: "Garnish with fresh coriander and serve with steamed Goan red rice.",
        timer_seconds: 60,
        tip: "Gentle, soothing, and utterly aromatic."
      }
    ]
  },
  {
    name: "Bihari Litti Chokha",
    slug: "bihari-litti-chokha",
    description: "Traditional roasted wheat dough balls stuffed with spiced roasted gram flour (sattu), served with smoky roasted eggplant and tomato chokha.",
    image: "/images/recipes/bihari-litti-chokha.jpg",
    cuisine: "Bihari",
    region: "Bihar",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Vegan"],
    servings: 4,
    prep_time: 30,
    cook_time: 30,
    difficulty: "Medium",
    rating: 5.0,
    calories: 410,
    protein: 16,
    carbs: 62,
    fat: 12,
    fasting_info: null,
    ingredients: [
      { name: "Roasted Chana Sattu (gram flour)", quantity: "1.5", unit: "cups" },
      { name: "Whole wheat flour for dough", quantity: "2", unit: "cups" },
      { name: "Mustard oil & Kalonji (nigella seeds)", quantity: "2", unit: "tbsp" },
      { name: "Pickle masala (Aam ka achaar)", quantity: "2", unit: "tbsp" },
      { name: "Large Eggplant (Baingan for chokha)", quantity: "1", unit: "large" },
      { name: "Roasted tomatoes & boiled potatoes", quantity: "2", unit: "each" },
      { name: "Desi Ghee for dipping", quantity: "1/2", unit: "cup" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Prepare Sattu Filling",
        instruction: "Mix sattu with raw mustard oil, achaar masala, kalonji, ajwain, chopped garlic, ginger, green chillies, and lemon juice.",
        timer_seconds: 300,
        tip: "Mustard oil and spicy pickle masala are the soul of authentic Bihari sattu."
      },
      {
        step_number: 2,
        title: "Stuff and Roast Litti",
        instruction: "Stuff dough cups with sattu mixture, seal into balls, and roast over charcoal, open flame, or bake in oven at 200°C for 25 minutes until cracked.",
        timer_seconds: 1500,
        tip: "Wipe with a clean dry towel after roasting to remove ash."
      },
      {
        step_number: 3,
        title: "Smoky Baingan Chokha",
        instruction: "Char eggplant and tomatoes over open flame, peel, and mash with boiled potatoes, raw mustard oil, garlic, and chillies.",
        timer_seconds: 600,
        tip: "Break hot litti and submerge in melted desi ghee before serving with chokha."
      }
    ]
  },
  {
    name: "Malabar Parotta with Veg Kurma",
    slug: "malabar-parotta-with-veg-kurma",
    description: "Flaky, multi-layered spiral flatbread served with a coconut, cashew, and poppy seed laced mixed vegetable kurma.",
    image: "/images/recipes/malabar-parotta-with-veg-kurma.jpg",
    cuisine: "South Indian",
    region: "Kerala",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian"],
    servings: 4,
    prep_time: 30,
    cook_time: 30,
    difficulty: "Hard",
    rating: 5.0,
    calories: 450,
    protein: 9,
    carbs: 58,
    fat: 20,
    fasting_info: null,
    ingredients: [
      { name: "Maida (for parotta)", quantity: "2.5", unit: "cups" },
      { name: "Oil or Ghee for lamination", quantity: "1/2", unit: "cup" },
      { name: "Mixed vegetables for kurma", quantity: "2", unit: "cups" },
      { name: "Grated coconut, cashews & fennel (paste)", quantity: "1/2", unit: "cup" },
      { name: "Whole spices (star anise, cinnamon, cloves)", quantity: "1", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Stretch and Pleat Parotta Dough",
        instruction: "Rest soft dough, roll thin as paper, coat with oil, pleat like an accordion, and roll into a coil. Rest 15 minutes.",
        timer_seconds: 900,
        tip: "Adequate resting relaxes gluten so dough stretches effortlessly without tearing."
      },
      {
        step_number: 2,
        title: "Cook Vegetable Kurma",
        instruction: "Simmer vegetables with whole spices, then add coconut-cashew-fennel paste and cook until fragrant.",
        timer_seconds: 600,
        tip: "Fennel and star anise give authentic Kerala hotel kurma fragrance."
      },
      {
        step_number: 3,
        title: "Fry and Clap Parottas",
        instruction: "Roll coiled dough gently and cook on tawa with ghee until golden. Clap between palms while hot to release the hundreds of flaky layers.",
        timer_seconds: 300,
        tip: "Clapping between hands while warm is mandatory to reveal flaky layers."
      }
    ]
  },
  {
    name: "Hyderabadi Dum Veg Biryani",
    slug: "hyderabadi-dum-veg-biryani",
    description: "Layers of fragrant aged basmati rice and marinated spiced seasonal vegetables slow-cooked in a sealed handi with saffron milk, fried onions, and mint.",
    image: "/images/recipes/hyderabadi-dum-veg-biryani.jpg",
    cuisine: "North Indian",
    region: "Telangana & Hyderabad",
    categorySlug: "regional",
    dietary_tags: ["Vegetarian", "Gluten-Free"],
    servings: 6,
    prep_time: 30,
    cook_time: 40,
    difficulty: "Medium",
    rating: 5.0,
    calories: 420,
    protein: 11,
    carbs: 64,
    fat: 14,
    fasting_info: null,
    ingredients: [
      { name: "Aged Basmati Rice (soaked 30 mins)", quantity: "2", unit: "cups" },
      { name: "Mixed vegetables (paneer, carrots, beans, potatoes, peas)", quantity: "3", unit: "cups" },
      { name: "Biryani masala & Shahi Jeera", quantity: "2", unit: "tbsp" },
      { name: "Fried crispy onions (Birista)", quantity: "1", unit: "cup" },
      { name: "Whisked yoghurt (Curd)", quantity: "1", unit: "cup" },
      { name: "Saffron dissolved in warm milk", quantity: "4", unit: "tbsp" },
      { name: "Mint & Coriander leaves", quantity: "1/2", unit: "cup" },
      { name: "Pure Desi Ghee", quantity: "3", unit: "tbsp" }
    ],
    steps: [
      {
        step_number: 1,
        title: "Marinate Vegetables",
        instruction: "Marinate vegetables and paneer with thick curd, ginger-garlic paste, biryani masala, half of the fried onions, mint, and salt.",
        timer_seconds: 600,
        tip: "Marinate for at least 30 minutes for deep flavor infusion."
      },
      {
        step_number: 2,
        title: "Parboil Basmati Rice",
        instruction: "Boil soaked rice in heavily salted water with whole spices (bay leaf, cloves, cardamom) until 70% cooked. Drain immediately.",
        timer_seconds: 420,
        tip: "70% cooked rice has a firm bite in center; it finishes cooking during dum."
      },
      {
        step_number: 3,
        title: "Layer Biryani in Handi",
        instruction: "Layer marinated vegetables at the bottom, spread parboiled rice evenly on top, scatter fried onions, fresh mint, coriander, saffron milk, and ghee.",
        timer_seconds: 300,
        tip: "Layering creates the beautiful contrast of white and saffron grains."
      },
      {
        step_number: 4,
        title: "Slow Dum Cooking",
        instruction: "Seal lid with dough or foil. Cook on high for 5 minutes, then place a tawa underneath and cook on low heat for 25 minutes.",
        timer_seconds: 1800,
        tip: "Rest for 10 minutes before gently fluffing with a flat spoon from the bottom."
      }
    ]
  }
];
