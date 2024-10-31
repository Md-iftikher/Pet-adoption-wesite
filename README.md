# Pet Adoption System

A modern, user-friendly pet adoption platform designed to connect potential adopters with pets in need of loving homes. This web application dynamically fetches and displays pet data from an API, offering a seamless and engaging user experience. Users can browse pets by categories, view detailed profiles, and even begin the adoption process directly from the interface. The system is built using ES6 standards, ensuring clean, maintainable, and scalable code.

## Features

1. **Browse Pets by Category:**
   - Users can filter pets based on predefined categories (e.g., cats, dogs, birds). Categories are dynamically loaded from the backend API, and clicking on a category immediately updates the displayed pet list.

2. **Favorite Pets:**
   - With the "like" feature, users can save their favorite pets. Liked pets are added to a special section on the page, allowing users to easily revisit and compare their favorites.

3. **Detailed Pet Information:**
   - Each pet has a dedicated profile modal that provides comprehensive details including breed, birthdate, gender, vaccination status, and price. This allows users to make informed decisions when choosing a pet.

4. **Adoption Process with Countdown:**
   - Users can initiate the adoption process by clicking the "Adopt" button. A congratulatory modal appears, featuring a countdown timer to signify the start of the adoption process. Once completed, the pet is marked as "Adopted."

5. **Sort by Price:**
   - Users have the option to sort the pets by price in descending order, making it easier to identify the pets that fit their budget.

## ES6 Features Used

- **Arrow Functions:**
  - Simplified syntax for writing functions (e.g., `likedpets`, `loadDetailsOfPet`, etc.), making the code more concise and readable.
  
- **Template Literals:**
  - Used for dynamically generating HTML content with embedded variables, improving the clarity and maintainability of string concatenations.

- **`const` and `let`:**
  - Consistent use of block-scoped variables (`let`) and constants (`const`) ensures that variable mutation and scoping are controlled and predictable.

- **Array Methods (`forEach`, `sort`):**
  - Array iteration is handled efficiently using `forEach`, and sorting of pets is done via `sort`, allowing for dynamic and interactive behavior when displaying pets.

## live link: # https://petty-pet-website.netlify.app/

