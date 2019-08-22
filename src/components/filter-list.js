const getFilterTemplate = ({title, count}) => {
  return `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >
  `.trim();
};

export const getFilterListTemplate = (filterList) => {
  return `
    <section class="main__filter filter container">
      ${filterList.map((filter) => getFilterTemplate(filter)).join(``)}
    </section>
  `;
};
