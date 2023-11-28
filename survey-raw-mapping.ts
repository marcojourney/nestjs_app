class Survey {
  id: number;
  name: string;
  questions?: Question[];
  locales?: SurveyLocale[];
}

class SurveyLocale {
  id: number;
  surveyId: number;
  name: string;
  localeCode: string;
}

class Question {
  id: number;
  surveyId: number;
  name: string;
  locales?: SurveyQuestionLocale[];
}

class SurveyQuestionLocale {
  id: number;
  questionId: number;
  name: string;
  localeCode: string;
}

interface RawSurveyDataFromDatabase {
  survey_id: number;
  survey_name: string;
  locale_id: number;
  locale_name: string;
  locale_code: string;
  question_id: number;
  question_name: string;
  question_locale_id: number;
  question_locale_name: string;
  question_locale_code: string;
}

function fetchSurveyDataFromDatabase(): Promise<RawSurveyDataFromDatabase[]> {
  // Example: Simulate fetching data from a database
  const rawData: RawSurveyDataFromDatabase[] = [
    {
      survey_id: 1,
      survey_name: 'Sample Survey 1',
      locale_id: 101,
      locale_name: 'English',
      locale_code: 'en',
      question_id: 201,
      question_name: 'Question 1 (English)',
      question_locale_id: 301,
      question_locale_name: 'English',
      question_locale_code: 'en',
    },
    {
      survey_id: 1,
      survey_name: 'Sample Survey 1',
      locale_id: 102,
      locale_name: 'Spanish',
      locale_code: 'es',
      question_id: 201,
      question_name: 'Question 1 (Spanish)',
      question_locale_id: 302,
      question_locale_name: 'Spanish',
      question_locale_code: 'es',
    },
    {
      survey_id: 1,
      survey_name: 'Sample Survey 1',
      locale_id: 101,
      locale_name: 'English',
      locale_code: 'en',
      question_id: 202,
      question_name: 'Question 2 (English)',
      question_locale_id: 303,
      question_locale_name: 'English',
      question_locale_code: 'en',
    },
    {
      survey_id: 1,
      survey_name: 'Sample Survey 1',
      locale_id: 102,
      locale_name: 'Spanish',
      locale_code: 'es',
      question_id: 202,
      question_name: 'Question 2 (Spanish)',
      question_locale_id: 304,
      question_locale_name: 'Spanish',
      question_locale_code: 'es',
    },
  ];

  return Promise.resolve(rawData);
}

async function fetchAndMapSurvey(): Promise<Survey | null> {
  const rawData = await fetchSurveyDataFromDatabase();

  if (rawData.length === 0) {
    return null;
  }

  const survey = new Survey();
  survey.id = rawData[0].survey_id;
  survey.name = rawData[0].survey_name;

  // Create a map to store questions and locales temporarily
  const questionMap: Map<number, Question> = new Map();
  const localeMap: Map<number, SurveyLocale> = new Map();

  rawData.forEach((rawItem) => {
    const question = questionMap.get(rawItem.question_id) || new Question();
    question.id = rawItem.question_id;
    question.surveyId = rawItem.survey_id;
    question.name = rawItem.question_name;
    questionMap.set(rawItem.question_id, question);

    const locale = localeMap.get(rawItem.locale_id) || new SurveyLocale();
    locale.id = rawItem.locale_id;
    locale.surveyId = rawItem.survey_id;
    locale.name = rawItem.locale_name;
    locale.localeCode = rawItem.locale_code;
    localeMap.set(rawItem.locale_id, locale);
  });

  // Convert maps to arrays and assign them to the survey object
  survey.questions = Array.from(questionMap.values());
  survey.locales = Array.from(localeMap.values());

  return survey;
}

// Example usage
fetchAndMapSurvey().then((mappedSurvey) => {
  if (mappedSurvey) {
    console.log(mappedSurvey);
  } else {
    console.log('Survey not found.');
  }
});
