// kathuru-dropdown.js
class KathuruDropdown {
  constructor(selector = '.kathuru-dropdown') {
    this.dropdowns = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.dropdowns.forEach(dropdown => {
      const optionsData = dropdown.dataset.options ? JSON.parse(dropdown.dataset.options) : [];
      
      const selectBox = document.createElement('input');
      selectBox.type = 'text';
      selectBox.placeholder = dropdown.dataset.placeholder || 'Select...';
      selectBox.className = 'select-box';

      const list = document.createElement('div');
      list.className = 'dropdown-list';

      const searchBox = document.createElement('input');
      searchBox.type = 'text';
      searchBox.className = 'search-box';
      searchBox.placeholder = 'Search...';
      list.appendChild(searchBox);

      optionsData.forEach(opt => {
        const div = document.createElement('div');
        div.textContent = opt;
        list.appendChild(div);
      });

      dropdown.appendChild(selectBox);
      dropdown.appendChild(list);

      const options = Array.from(list.querySelectorAll('div')).slice(1); // skip search

      selectBox.addEventListener('click', () => {
        list.classList.toggle('show');
        searchBox.value = '';
        this.filterOptions('', options);
        searchBox.focus();
      });

      searchBox.addEventListener('input', e => this.filterOptions(e.target.value, options));

      options.forEach(item => {
        item.addEventListener('click', () => {
          selectBox.value = item.textContent;
          list.classList.remove('show');
        });
      });

      document.addEventListener('click', e => {
        if(!dropdown.contains(e.target)) list.classList.remove('show');
      });
    });
  }

  filterOptions(value, options){
    options.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value.toLowerCase()) ? 'block' : 'none';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new KathuruDropdown();
});
