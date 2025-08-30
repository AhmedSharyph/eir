// kathuru-dropdown.js (Standalone, minimal)
class KathuruDropdown {
  constructor(selector = '.kathuru-dropdown') {
    this.dropdowns = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.dropdowns.forEach(dropdown => {
      const optionsData = dropdown.dataset.options ? JSON.parse(dropdown.dataset.options) : [];

      // Create input box
      const selectBox = document.createElement('input');
      selectBox.type = 'text';
      selectBox.className = 'select-box';
      selectBox.placeholder = dropdown.dataset.placeholder || 'Select...';

      // Create dropdown list container
      const list = document.createElement('div');
      list.className = 'dropdown-list';

      // Create search box inside dropdown
      const searchBox = document.createElement('input');
      searchBox.type = 'text';
      searchBox.className = 'search-box';
      searchBox.placeholder = 'Search...';
      list.appendChild(searchBox);

      // Populate options
      optionsData.forEach(opt => {
        const div = document.createElement('div');
        div.textContent = opt;
        list.appendChild(div);
      });

      // Append elements to dropdown container
      dropdown.appendChild(selectBox);
      dropdown.appendChild(list);

      // Get actual option elements (skip search)
      const options = Array.from(list.querySelectorAll('div')).slice(1);

      // Set first option as default
      if (options.length > 0) selectBox.value = options[0].textContent;

      // Open/close dropdown
      selectBox.addEventListener('click', () => {
        list.classList.toggle('show');
        searchBox.value = '';
        this.filterOptions('', options);
        searchBox.focus();
      });

      // Filter options
      searchBox.addEventListener('input', e => this.filterOptions(e.target.value, options));

      // Click option
      options.forEach(item => {
        item.addEventListener('click', () => {
          selectBox.value = item.textContent;
          list.classList.remove('show');
        });
      });

      // Close if clicked outside
      document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) list.classList.remove('show');
      });
    });
  }

  filterOptions(value, options){
    options.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value.toLowerCase()) ? 'block' : 'none';
    });
  }
}

// Initialize after DOM loaded
document.addEventListener('DOMContentLoaded', () => new KathuruDropdown());
