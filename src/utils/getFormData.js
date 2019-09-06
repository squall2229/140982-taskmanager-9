const getFormData = (form) => {
  const formData = new FormData(form.querySelector(`.card__form`));

  return {
    description: formData.get(`text`),
    color: formData.get(`color`),
    tags: new Set(formData.getAll(`hashtag`)),
    dueDate: formData.get(`date`) ? new Date(formData.get(`date`)) : null,
    repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, {
      'Mo': false,
      'Tu': false,
      'We': false,
      'Th': false,
      'Fr': false,
      'Sa': false,
      'Su': false,
    })
  };
};

export default getFormData;
