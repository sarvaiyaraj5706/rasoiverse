export type Language = 'en' | 'hi' | 'gu';

export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  preferred_language: Language;
  status?: 'active' | 'deactivated';
  created_at?: string;
  favorites_count?: number;
  ai_generations_count?: number;
}

export interface Ingredient {
  id?: number;
  recipe_id?: number;
  name: string;
  name_hi?: string;
  name_gu?: string;
  quantity?: string;
  numeric_quantity?: number;
  unit?: string;
}

export interface Step {
  id?: number;
  recipe_id?: number;
  step_number: number;
  title: string;
  title_hi?: string;
  title_gu?: string;
  instruction: string;
  instruction_hi?: string;
  instruction_gu?: string;
  image?: string;
  timer_seconds?: number;
  tip?: string;
  tip_hi?: string;
  tip_gu?: string;
  heat_level?: 'Low' | 'Medium' | 'Medium-High' | 'High' | 'Simmer' | 'Off' | string;
}

export interface Recipe {
  id: number;
  name: string;
  name_hi?: string;
  name_gu?: string;
  slug: string;
  description: string;
  description_hi?: string;
  description_gu?: string;
  image: string;
  cuisine: string;
  region?: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  dietary_tags: string[];
  servings: number;
  prep_time: number;
  cook_time: number;
  total_time?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  status: 'published' | 'draft';
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fasting_info?: string;
  views_count?: number;
  created_at?: string;
  isFavorited?: boolean;
  ingredients?: Ingredient[];
  steps?: Step[];
  prep_instructions_en?: string;
  prep_instructions_hi?: string;
  prep_instructions_gu?: string;
  tips_en?: string;
  tips_hi?: string;
  tips_gu?: string;
  common_mistakes_en?: string;
  common_mistakes_hi?: string;
  common_mistakes_gu?: string;
  serving_suggestions_en?: string;
  serving_suggestions_hi?: string;
  serving_suggestions_gu?: string;
  storage_en?: string;
  storage_hi?: string;
  storage_gu?: string;
  // Ingredient search extra fields
  matchedCount?: number;
  totalIngredients?: number;
  missingCount?: number;
  missingIngredients?: string[];
  matchSummary?: string;
  matchScore?: number;
  // AI generated extra fields
  is_ai_generated?: boolean;
  disclaimer?: string;
  tips?: string;
  serving_suggestions?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  recipe_count?: number;
}

export interface AIRecipeParams {
  ingredients: string;
  cuisine: string;
  mealType: string;
  dietaryPreference: string;
  cookingTime: string;
  difficulty: string;
}

export interface ActiveTimer {
  id: string;
  title: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export interface SearchFilterState {
  search?: string;
  cuisine?: string;
  category?: string;
  dietary?: string;
  difficulty?: string;
  maxTime?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
