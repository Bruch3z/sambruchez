// Function to update content based on selected language
function updateContent(langData, lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = langData[lang][key]; // Use innerHTML to render HTML tags
  });
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  try {
    const response = await fetch(`languages/${lang}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch language data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return {}; // Return an empty object in case of an error
  }
}

// Function to change language
async function changeLanguage(lang, event) {
  event.preventDefault(); // Prevent the default behavior of anchor tag
  localStorage.setItem('language', lang);
  const langData = await fetchLanguageData(lang);
  updateContent(langData, lang);

  // Remove 'active' class from all language links
  document.querySelectorAll('.footer a').forEach(link => {
    link.classList.remove('active');
  });

  // Add 'active' class to the clicked language link
  event.target.classList.add('active');
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang);
  changeLanguage(lang); // Update the content directly without reloading the page
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
  const userPreferredLanguage = localStorage.getItem('language') || 'en';
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData, userPreferredLanguage);

  // Set the initially selected language link to active
  const activeLanguageLink = document.querySelector(`.footer a[href='#'][onclick*='${userPreferredLanguage}']`);
  if (activeLanguageLink) {
    activeLanguageLink.classList.add('active');
  }
});
