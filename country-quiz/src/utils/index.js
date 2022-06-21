// Get random number
export const randomNum = (max) => {
  let number = Math.floor(Math.random() * max);
  return number;
};

// Shuffle array
export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

// Get unique random number
export const generateUniqueRandom = (max, arr) => {
  let number = randomNum(max);

  if (!arr.includes(number)) {
    arr.push(number);
    return number;
  } else {
    if (arr.length < max) {
      return generateUniqueRandom(max, arr);
    } else {
      return false;
    }
  }
};

// Get and store random quiz question
export const getQuizQuestion = (allCountries, defaultQuiz, setQuiz) => {
  allCountries = allCountries
    ?.filter((country) => country.capital && country.capital[0] !== "")
    .filter((country) => country.flags?.svg !== "");

  // Generate country data for question and true answer
  let trueCountry = allCountries[randomNum(allCountries.length)];
  const { capital = [], flags = {} } = trueCountry;
  if (!capital[0] || !flags?.svg) {
    return (trueCountry = allCountries[randomNum(allCountries.length)]);
  }

  // Generate country data for false answer
  const falseCountry = [];
  const randArr = [];
  for (let i = 1; i <= 3; i++) {
    let rand = generateUniqueRandom(allCountries.length, randArr);
    falseCountry.push(allCountries[rand].name?.common);
  }

  // Shuffle answer option
  const option = [trueCountry.name?.common, ...falseCountry];
  shuffle(option);

  // Set updated quiz
  const quiz = {
    question: { capital: trueCountry.capital[0], flag: trueCountry.flags?.svg },
    answer: { trueAnswer: trueCountry.name?.common, falseAnswer: falseCountry },
    option,
    alfabet: defaultQuiz.alfabet,
  };

  // Update quiz
  setQuiz(quiz);
};

// Handle value change
export const onValueChange = (e, state, setState, id) => {
  switch (e.target.name) {
    case "type":
      switch (id) {
        case "capital":
          setState({
            ...state,
            type: { ...state.type, capital: !state.type.capital },
          });
          break;
        case "flag":
          setState({
            ...state,
            type: { ...state.type, flag: !state.type.flag },
          });
          break;
        default:
          break;
      }
      break;
    case "level":
      switch (e.target.value) {
        case "VeryEasy":
          setState({ ...state, level: 5 });
          break;
        case "Easy":
          setState({ ...state, level: 15 });
          break;
        case "Normal":
          setState({ ...state, level: 30 });
          break;
        case "Hard":
          setState({ ...state, level: 65 });
          break;
        case "VeryHard":
          setState({ ...state, level: 100 });
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
