const isRepeat = (data) => {
  return Object.keys(data).some((key) => data[key]);
};

export default isRepeat;
