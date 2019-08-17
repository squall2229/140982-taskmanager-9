const isRepeat = (repeatingDays) => {
  return Object.keys(repeatingDays).some((day) => repeatingDays[day]);
};

export default isRepeat;
