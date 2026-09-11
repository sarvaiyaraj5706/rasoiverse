import { Recipe, Category, AIRecipeParams, SearchFilterState } from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('rasoi_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchRecipes(filters: SearchFilterState = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.cuisine) params.append('cuisine', filters.cuisine);
  if (filters.category) params.append('category', filters.category);
  if (filters.dietary) params.append('dietary', filters.dietary);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.maxTime) params.append('maxTime', filters.maxTime);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const res = await fetch(`${API_BASE}/recipes?${params.toString()}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function fetchRecipeDetail(slugOrId: string) {
  const res = await fetch(`${API_BASE}/recipes/${slugOrId}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
}

export async function fetchRecipeSuggestions(query: string) {
  if (!query.trim()) return [];
  const res = await fetch(`${API_BASE}/recipes/suggestions?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.suggestions || [];
}

export async function searchByIngredients(ingredients: string[]) {
  const param = encodeURIComponent(ingredients.join(','));
  const res = await fetch(`${API_BASE}/recipes/search-ingredients?ingredients=${param}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to search by ingredients');
  return res.json();
}

export async function parseNaturalLanguage(text: string) {
  const res = await fetch(`${API_BASE}/ai/parse-ingredients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('Failed to parse ingredients');
  const data = await res.json();
  return data.ingredients || [];
}

export async function generateAIRecipe(params: AIRecipeParams) {
  const res = await fetch(`${API_BASE}/ai/generate`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(params)
  });
  if (!res.ok) throw new Error('Failed to generate recipe');
  const data = await res.json();
  return data.recipe as Recipe;
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.categories as Category[];
}

export async function fetchRecommendations(recipeId: number | string) {
  const res = await fetch(`${API_BASE}/recipes/recommended/${recipeId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.recommended || [];
}

export async function fetchFavorites() {
  const res = await fetch(`${API_BASE}/favorites`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch favorites');
  const data = await res.json();
  return data.favorites as Recipe[];
}

export async function toggleFavorite(recipeId: number, currentlyFavorited: boolean) {
  const method = currentlyFavorited ? 'DELETE' : 'POST';
  const res = await fetch(`${API_BASE}/favorites/${recipeId}`, {
    method,
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to update favorite');
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE}/history`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch history');
  const data = await res.json();
  return data.history as Recipe[];
}

export async function fetchAIHistory() {
  const res = await fetch(`${API_BASE}/ai/my-history`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch AI recipe history');
  const data = await res.json();
  return data.history;
}

// Admin APIs
export async function fetchAdminAnalytics() {
  const res = await fetch(`${API_BASE}/admin/analytics`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Admin authorization failed');
  return res.json();
}

export async function fetchAdminRecipes(search?: string, category?: string, status?: string) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (status) params.append('status', status);

  const res = await fetch(`${API_BASE}/admin/recipes?${params.toString()}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to load admin recipes');
  const data = await res.json();
  return data.recipes;
}

export async function createAdminRecipe(recipeData: any) {
  const res = await fetch(`${API_BASE}/admin/recipes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
}

export async function updateAdminRecipe(id: number, recipeData: any) {
  const res = await fetch(`${API_BASE}/admin/recipes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
}

export async function deleteAdminRecipe(id: number) {
  const res = await fetch(`${API_BASE}/admin/recipes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  return res.json();
}

export async function toggleAdminRecipeStatus(id: number) {
  const res = await fetch(`${API_BASE}/admin/recipes/${id}/toggle-status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to toggle status');
  return res.json();
}

export async function fetchAdminUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to load users');
  const data = await res.json();
  return data.users;
}

export async function toggleAdminUserStatus(id: number) {
  const res = await fetch(`${API_BASE}/admin/users/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to toggle user status');
  return res.json();
}
