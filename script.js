//language change functionality

const languageSelector = document.getElementById("language-selector_content");
languageSelector.addEventListener("click", (e) => {
  //if we force close wee need to also remove focus - if not blur will trigger when trying to open again
  e.target.blur();
  languageSelector.classList.toggle("hidden", true);
  handleLanguageChange(e);
});

function handleLanguageChange(event) {
  let targetPath = getTargetPath(event.target.name);
  if (targetPath == window.location.pathname) return;
  window.location.href = targetPath;
}

function getLanguageFolder(selectedValue) {
  const languages = {
    English: "en",
    Deutsch: "de",
  };
  return languages[selectedValue];
}

function getCurrentPageName() {
  let path = window.location.pathname;
  let page = path.split("/").pop();
  return page;
}

function getTargetPath(selectedValue) {
  let path = `/${getLanguageFolder(selectedValue)}/${getCurrentPageName()}`;
  return path;
}

//dropdown functionality

const dropdown_array = [...document.querySelectorAll(".dropdown-menu")];
dropdown_array.forEach((x) =>
  x.addEventListener("focusin", (e) => openDropdown(e.currentTarget))
);
dropdown_array.forEach((x) =>
  x.addEventListener("focusout", (e) => closeDropdown(e.currentTarget))
);

const dropdownButton_array = [...document.querySelectorAll(".dropdown-button")];
//currentTarget because button has child elements (<span>)
dropdownButton_array.forEach((x) =>
  x.addEventListener("click", (e) => toggleDropdown(e.currentTarget.parentNode))
);
//click will toggle - no need for focusin to trigger (if focusin triggeres it will first open and then immediatly toggle to closed)
dropdownButton_array.forEach((x) =>
  x.addEventListener("focusin", (e) => e.stopPropagation())
);

//closes dropdown if currently open & opens if currently closed
function toggleDropdown(dropdownElement) {
  const dropdownContent = dropdownElement.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("hidden");
}

function openDropdown(dropdownElement) {
  const dropdownContent = dropdownElement.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("hidden", false);
}

function closeDropdown(dropdownElement) {
  const dropdownContent = dropdownElement.querySelector(".dropdown-content");
  //only forces "hidden true" when dropdown is not being hovered on
  dropdownContent.classList.toggle(
    "hidden",
    !dropdownElement.matches(":hover")
  );
}
