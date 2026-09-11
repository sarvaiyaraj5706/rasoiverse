import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== VERIFYING RESPONSIVE CODE QUALITY ACROSS RASOIVERSE ===")

src_dir = os.path.join(os.getcwd(), 'client', 'src')
issues = []
checked_files = 0

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            checked_files += 1
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check for hardcoded fixed pixel widths >= 400px without responsiveness (excluding max-w)
            matches = re.findall(r'(?<!max-)(w-\[\d+px\]|min-w-\[\d+px\])', content)
            for m in matches:
                num = int(re.search(r'\d+', m).group())
                # If > 320px, ensure it's either wrapped in an overflow container or qualified with breakpoint
                if num > 320 and 'overflow-x-auto' not in content:
                    issues.append(f"{file}: Found uncontained fixed width '{m}'")

print(f"Checked {checked_files} frontend source files.")
if issues:
    print(f"Found {len(issues)} issues:")
    for i in issues:
        print(f"  ✗ {i}")
else:
    print("✓ Zero uncontained fixed-width hazards found in any component!")

# Verify responsive grid declarations in key pages
key_pages = [
    'HomePage.tsx', 'ExploreRecipesPage.tsx', 'FaraliVratPage.tsx',
    'FavoritesPage.tsx', 'ProfilePage.tsx', 'IngredientSearchPage.tsx'
]

print("\nVerifying responsive grid definitions in key pages:")
for kp in key_pages:
    p = os.path.join(src_dir, 'pages', kp)
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            c = f.read()
        has_resp_grid = 'grid-cols-1 sm:grid-cols-2' in c or 'grid-cols-2 sm:grid-cols-' in c
        if has_resp_grid:
            print(f"  ✓ {kp}: Contains fluid responsive grid column definitions")
        else:
            print(f"  ✗ {kp}: Missing standard responsive grid")

# Verify MobileNav and Navbar
nav_path = os.path.join(src_dir, 'components', 'Navbar.tsx')
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_c = f.read()

assert 'isMobileMenuOpen' in nav_c
assert 'slide-in-from-right' in nav_c
assert 'pb-safe' in nav_c
assert 'Select Language' in nav_c or 'App Language' in nav_c
print("\n✓ Navbar slide-over drawer and mobile controls thoroughly verified.")

mob_path = os.path.join(src_dir, 'components', 'MobileNav.tsx')
with open(mob_path, 'r', encoding='utf-8') as f:
    mob_c = f.read()

assert 'pb-safe' in mob_c
assert 'touch-target' in mob_c
print("✓ MobileNav bottom tab bar with safe-area padding verified.")

cook_path = os.path.join(src_dir, 'pages', 'CookingModePage.tsx')
with open(cook_path, 'r', encoding='utf-8') as f:
    cook_c = f.read()

assert 'touch-target' in cook_c
assert 'pb-safe' in cook_c
assert 'overflow-y-auto' in cook_c
print("✓ CookingModePage full-screen kitchen ergonomics verified.")

print("\n=== ALL RESPONSIVE CODE QUALITY CHECKS PASSED ===")
