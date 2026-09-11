import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Utensils, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Check, 
  X, 
  Search, 
  Sparkles,
  TrendingUp,
  Heart,
  FolderTree
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  fetchAdminAnalytics, 
  fetchAdminRecipes, 
  createAdminRecipe, 
  updateAdminRecipe, 
  deleteAdminRecipe, 
  toggleAdminRecipeStatus,
  fetchAdminUsers,
  toggleAdminUserStatus,
  fetchCategories
} from '../services/api';
import { Recipe, Category } from '../types';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'analytics' | 'recipes' | 'users' | 'categories'>('analytics');
  const [analytics, setAnalytics] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchRecipe, setSearchRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Add / Edit Recipe Modal State
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formNameHi, setFormNameHi] = useState('');
  const [formNameGu, setFormNameGu] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDescriptionHi, setFormDescriptionHi] = useState('');
  const [formDescriptionGu, setFormDescriptionGu] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formCuisine, setFormCuisine] = useState('Gujarati');
  const [formRegion, setFormRegion] = useState('Gujarat');
  const [formCategoryId, setFormCategoryId] = useState<number>(1);
  const [formDietaryTags, setFormDietaryTags] = useState('Vegetarian');
  const [formServings, setFormServings] = useState(4);
  const [formPrepTime, setFormPrepTime] = useState(15);
  const [formCookTime, setFormCookTime] = useState(25);
  const [formDifficulty, setFormDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formCalories, setFormCalories] = useState(250);
  const [formIngredients, setFormIngredients] = useState<any[]>([
    { name: '', quantity: '', unit: '' }
  ]);
  const [formSteps, setFormSteps] = useState<any[]>([
    { step_number: 1, title: 'Preparation', instruction: '', timer_seconds: 0, tip: '' }
  ]);

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Guard: require admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Admin Access Required
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          You do not have administrative privileges to view this dashboard. Please log in with an authorized admin account (admin@rasoiverse.com).
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [stats, recs, usrs, cats] = await Promise.all([
        fetchAdminAnalytics().catch(() => null),
        fetchAdminRecipes().catch(() => []),
        fetchAdminUsers().catch(() => []),
        fetchCategories().catch(() => [])
      ]);
      setAnalytics(stats);
      setRecipes(recs || []);
      setUsersList(usrs || []);
      setCategories(cats || []);
    } catch (e) {
      console.error('Error loading admin dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingRecipeId(null);
    setFormName('');
    setFormNameHi('');
    setFormNameGu('');
    setFormDescription('');
    setFormDescriptionHi('');
    setFormDescriptionGu('');
    setFormImage('/images/recipes/paneer-butter-masala.jpg');
    setFormCuisine('Gujarati');
    setFormRegion('Gujarat');
    setFormCategoryId(categories[0]?.id || 1);
    setFormDietaryTags('Vegetarian');
    setFormServings(4);
    setFormPrepTime(15);
    setFormCookTime(20);
    setFormDifficulty('Medium');
    setFormStatus('published');
    setFormCalories(260);
    setFormIngredients([
      { name: 'Flour', quantity: '2', unit: 'cups' },
      { name: 'Spices', quantity: '1', unit: 'tbsp' }
    ]);
    setFormSteps([
      { step_number: 1, title: 'Mix Ingredients', instruction: 'Combine ingredients in bowl.', timer_seconds: 180, tip: 'Stir gently.' }
    ]);
    setIsRecipeModalOpen(true);
  };

  const handleOpenEdit = (rec: Recipe) => {
    setEditingRecipeId(rec.id);
    setFormName(rec.name);
    setFormNameHi(rec.name_hi || '');
    setFormNameGu(rec.name_gu || '');
    setFormDescription(rec.description);
    setFormDescriptionHi(rec.description_hi || '');
    setFormDescriptionGu(rec.description_gu || '');
    setFormImage(rec.image);
    setFormCuisine(rec.cuisine);
    setFormRegion(rec.region || 'India');
    setFormCategoryId(rec.category_id || 1);
    setFormDietaryTags(Array.isArray(rec.dietary_tags) ? rec.dietary_tags.join(', ') : 'Vegetarian');
    setFormServings(rec.servings || 4);
    setFormPrepTime(rec.prep_time || 15);
    setFormCookTime(rec.cook_time || 20);
    setFormDifficulty(rec.difficulty || 'Medium');
    setFormStatus(rec.status || 'published');
    setFormCalories(rec.calories || 250);
    setFormIngredients(rec.ingredients && rec.ingredients.length > 0 ? rec.ingredients : [
      { name: 'Sample Ingredient', quantity: '1', unit: 'cup' }
    ]);
    setFormSteps(rec.steps && rec.steps.length > 0 ? rec.steps : [
      { step_number: 1, title: 'Step 1', instruction: 'Follow instructions.', timer_seconds: 180, tip: '' }
    ]);
    setIsRecipeModalOpen(true);
  };

  const handleSaveRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formName,
      name_hi: formNameHi,
      name_gu: formNameGu,
      description: formDescription,
      description_hi: formDescriptionHi,
      description_gu: formDescriptionGu,
      image: formImage,
      cuisine: formCuisine,
      region: formRegion,
      category_id: formCategoryId,
      dietary_tags: formDietaryTags.split(',').map(s => s.trim()).filter(Boolean),
      servings: formServings,
      prep_time: formPrepTime,
      cook_time: formCookTime,
      difficulty: formDifficulty,
      status: formStatus,
      calories: formCalories,
      ingredients: formIngredients.filter(i => i.name.trim()),
      steps: formSteps.filter(s => s.instruction.trim())
    };

    try {
      if (editingRecipeId) {
        await updateAdminRecipe(editingRecipeId, payload);
      } else {
        await createAdminRecipe(payload);
      }
      setIsRecipeModalOpen(false);
      loadData();
    } catch (e) {
      alert('Failed to save recipe');
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    try {
      await deleteAdminRecipe(id);
      setDeleteConfirmId(null);
      loadData();
    } catch (e) {
      alert('Failed to delete recipe');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleAdminRecipeStatus(id);
      loadData();
    } catch (e) {}
  };

  const handleToggleUser = async (id: number) => {
    try {
      await toggleAdminUserStatus(id);
      loadData();
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-28">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {t('adminTitle')}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Secure Operations, Content Management & Culinary Intelligence Dashboard
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-saffron-600/20 transition-all hover:scale-105 min-h-[44px] touch-target justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addNewRecipeBtn')}</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap rounded-2xl bg-stone-100 p-1.5 max-w-xl text-xs font-bold gap-1 sm:gap-0">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-[100px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] touch-target ${
            activeTab === 'analytics' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('analyticsTab')}</span>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 min-w-[100px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] touch-target ${
            activeTab === 'recipes' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 text-saffron-600" />
          <span>{t('manageRecipesTab')} ({recipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 min-w-[100px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] touch-target ${
            activeTab === 'users' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-cardamom-600" />
          <span>{t('manageUsersTab')} ({usersList.length})</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-8 animate-in fade-in">
          {/* 4 Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t('totalRecipes')}</p>
              <p className="text-3xl font-serif font-bold text-stone-900 mt-2">{analytics.metrics.totalRecipes}</p>
              <span className="text-[11px] text-cardamom-600 font-semibold mt-1 inline-block">Published & Active</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t('totalUsers')}</p>
              <p className="text-3xl font-serif font-bold text-stone-900 mt-2">{analytics.metrics.totalUsers}</p>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">Registered Chefs</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t('aiGenerationsCount')}</p>
              <p className="text-3xl font-serif font-bold text-stone-900 mt-2">{analytics.metrics.totalAiGenerations}</p>
              <span className="text-[11px] text-saffron-600 font-semibold mt-1 inline-block">Synthesized Dishes</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t('totalFavoritesMetric')}</p>
              <p className="text-3xl font-serif font-bold text-stone-900 mt-2">{analytics.metrics.totalFavorites}</p>
              <span className="text-[11px] text-rose-600 font-semibold mt-1 inline-block">User Bookmarks</span>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Most Viewed Recipes */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-saffron-600" />
                <span>Most Viewed Recipes</span>
              </h3>
              <div className="divide-y divide-stone-100">
                {analytics.mostViewedRecipes?.map((r: any) => (
                  <div key={r.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={r.image} alt={r.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-stone-800">{r.name}</p>
                        <p className="text-stone-400">{r.cuisine} • Rating: {r.rating}★</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-saffron-700 bg-saffron-50 px-2.5 py-1 rounded-xl">
                      {r.views_count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Search Queries */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-600" />
                <span>Top Search Queries</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {analytics.popularSearches?.map((q: any, idx: number) => (
                  <div key={idx} className="px-3.5 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs flex items-center gap-2">
                    <span className="font-semibold text-stone-800">“{q.query}”</span>
                    <span className="text-[10px] font-bold text-stone-400 px-1.5 py-0.2 rounded bg-stone-200">
                      {q.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: RECIPES MANAGEMENT */}
      {activeTab === 'recipes' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchRecipe}
                onChange={(e) => setSearchRecipe(e.target.value)}
                placeholder="Search recipe by name or cuisine..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recipe</span>
            </button>
          </div>

          {/* Recipes Table */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-soft overflow-hidden">
            <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
              <table className="w-full text-left text-xs min-w-[680px]">
                <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-5 py-3.5">Recipe</th>
                    <th className="px-5 py-3.5">Cuisine</th>
                    <th className="px-5 py-3.5">Time</th>
                    <th className="px-5 py-3.5">Difficulty</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {recipes
                    .filter(r => r.name.toLowerCase().includes(searchRecipe.toLowerCase()) || r.cuisine.toLowerCase().includes(searchRecipe.toLowerCase()))
                    .map((rec) => (
                      <tr key={rec.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <img src={rec.image} alt={rec.name} className="w-9 h-9 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-stone-900">{rec.name}</p>
                            <p className="text-[11px] text-stone-400">{rec.slug}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">{rec.cuisine}</td>
                        <td className="px-5 py-3.5">{rec.prep_time + rec.cook_time} mins</td>
                        <td className="px-5 py-3.5">{rec.difficulty}</td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => handleToggleStatus(rec.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              rec.status === 'published'
                                ? 'bg-cardamom-50 text-cardamom-800 border border-cardamom-200'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {rec.status === 'published' ? t('statusPublished') : t('statusDraft')}
                          </button>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(rec)}
                              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(rec.id)}
                              className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-soft overflow-hidden">
            <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
              <table className="w-full text-left text-xs min-w-[680px]">
                <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Favorites</th>
                    <th className="px-5 py-3.5">AI Creations</th>
                    <th className="px-5 py-3.5 text-right">Toggle Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-stone-900">{u.name}</p>
                        <p className="text-[11px] text-stone-400">{u.email}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.status === 'active'
                            ? 'bg-cardamom-50 text-cardamom-800'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {u.status === 'active' ? t('userStatusActive') : t('userStatusDeactivated')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">{u.favorites_count || 0}</td>
                      <td className="px-5 py-3.5">{u.ai_generations_count || 0}</td>
                      <td className="px-5 py-3.5 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleToggleUser(u.id)}
                            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold hover:bg-stone-100"
                          >
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT RECIPE MODAL */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {editingRecipeId ? 'Edit Recipe' : 'Add New Recipe'}
              </h3>
              <button
                onClick={() => setIsRecipeModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecipe} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Recipe Name (English)</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Recipe Name (हिन्दी / Hindi)</label>
                  <input
                    type="text"
                    value={formNameHi}
                    onChange={(e) => setFormNameHi(e.target.value)}
                    placeholder="e.g. पनीर बटर मसाला"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Recipe Name (ગુજરાતી / Gujarati)</label>
                  <input
                    type="text"
                    value={formNameGu}
                    onChange={(e) => setFormNameGu(e.target.value)}
                    placeholder="e.g. પનીર બટર મસાલા"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200"
                  />
                  {formImage && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Cuisine</label>
                  <input
                    type="text"
                    value={formCuisine}
                    onChange={(e) => setFormCuisine(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Region</label>
                  <input
                    type="text"
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prep Time (min)</label>
                  <input
                    type="number"
                    value={formPrepTime}
                    onChange={(e) => setFormPrepTime(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Cook Time (min)</label>
                  <input
                    type="number"
                    value={formCookTime}
                    onChange={(e) => setFormCookTime(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Difficulty</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Dietary Tags (comma separated)</label>
                <input
                  type="text"
                  value={formDietaryTags}
                  onChange={(e) => setFormDietaryTags(e.target.value)}
                  placeholder="e.g. Vegetarian, Jain, Farali"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecipeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-saffron-600 text-white font-bold shadow-sm"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {t('confirmDelete')}
            </h3>
            <p className="text-xs text-stone-500">
              This will permanently remove the recipe from the database and all user bookmarks.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRecipe(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
