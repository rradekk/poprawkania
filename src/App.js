import React, { useState } from "react";
import "./App.css"; // Dodaj stylizację w pliku CSS, np. dla czarnego tła i białego tekstu

const questions = [
  {
    question: "Które stwierdzenie dotyczące ludzkiej soczewki jest błędne?",
    answers: [
      "A. nie jest unerwiona",
      "B. odżywienie zapewnia jej ciecz wodnista i ciało szkliste",
      "C. jest zawieszona na cienkich filamentowych włóknach ciała rzęskowego tworzących obwódkę Zinna",
      "D. Przez całe życie komórki soczewki na równiku dzielą się co powoduje ciągły wzrost rozmiarów soczewki",
      "E. Prawidłowa soczewka składa się w około 70% z białka",
    ],
    correct: "D",
  },
  {
    question:
      "Jakie powikłania mogą wystąpić w narządzie wzroku po stosowaniu kortykosteroidów?",
    answers: [
      "A. zaćma podtorebkowa tylna",
      "B. jaskra wtórna otwartego kąta u osób predysponowanych",
      "C. opóźnienie procesów gojenia owrzodzeń rogówki",
      "D. zaburzenia refrakcji w kierunku krótkowzroczności",
      "E. wszystkie wymienione",
    ],
    correct: "E",
  },
  {
    question:
      "Monoterapia w leczeniu farmakologicznym jaskry jest skuteczna, jeżeli:",
    answers: [
      "A. stosowane leczenie obniża ciśnienie wewnątrzgałkowe do wartości poniżej 19 mmHg",
      "B. leczenie jest dobrze tolerowane",
      "C. stosowane leczenie obniża ciśnienie wewnątrzgałkowe do wartości ciśnienia docelowego",
      "D. tylko c",
      "E. żadna z wymienionych",
    ],
    correct: "D",
  },
  {
    question: "Trabekulektomia jest:",
    answers: [
      "A. zabiegiem przetokowym, uznawanym nadal za „złoty standard” w leczeniu chirurgicznym jaskry",
      "B. zabiegiem przetokowym i wykonywana tylko w jaskrze zamkniętego kąta",
      "C. zabiegiem mikroinwazyjnym i może być wykonana w każdym typie jaskry",
      "D. zabiegiem mikroinwazyjnym i wykonywana jest tylko w jaskrze zamkniętego kąta",
      "E. zabiegiem cyklodestrukcyjnym",
    ],
    correct: "B",
  },
  {
    question: "Częstą przyczyną zaćmy jest:",
    answers: [
      "A. zmiana związana z wiekiem",
      "B. uraz",
      "C. zapalenie",
      "D. zaburzenie metaboliczne",
      "E. wszystkie odpowiedzi są poprawne",
    ],
    correct: "E",
  },
  {
    question: "Rak podstawnokomórkowy:",
    answers: [
      "A. jest najczęściej spotykaną zmianą złośliwą na powiece",
      "B. częściej występuje na powiece dolnej",
      "C. to guz, który częściej występuje w szóstej, siódmej i ósmej dekadzie życia",
      "D. poprawna odpowiedź A, B, C",
      "E. poprawna odpowiedź A, C",
    ],
    correct: "D",
  },
  {
    question: "Gradówka:",
    answers: [
      "A. jest przewlekłym stanem zapalnym gruczołów Meiboma lub Zeissa",
      "B. jest ostrym stanem zapalnym gruczołów Meiboma lub Zeissa",
      "C. jest zmianą barwnikową",
      "D. poprawna odpowiedź A, C",
      "E. poprawna odpowiedź B, C",
    ],
    correct: "A",
  },
  {
    question: "Które stwierdzenie/stwierdzenia dotyczące zaćmy jest prawdziwe?",
    answers: [
      "A. Rozwój zaćmy jądrowej może prowadzić do narastania krótkowzroczności soczewkowej",
      "B. W zaćmie podtorebkowej tylnej widzenie do bliży jest bardziej ograniczone niż widzenie do dali",
      "C. Częstym objawem zaćmy korowej jest odblask z intensywnych źródeł światła, takich jak reflektory samochodowe",
      "D. Prawidłowe są odpowiedzi B i C",
      "E. Prawidłowe są odpowiedzi A, B i C",
    ],
    correct: "E",
  },
  {
    question: "Które stwierdzenie dotyczące plamki jest błędne?",
    answers: [
      "A. Plamka znajduje się pomiędzy skroniowymi łukami naczyniowymi",
      "B. Dołek to obszar plamki pozbawiony unaczynienia",
      "C. Centralna strefa beznaczyniowa (strefa FAZ) jest osobniczo zmienna",
      "D. Plamka jest obszarem pozbawionym fotoreceptorów (opisuje plamkę ślepą)",
      "E. Postać sucha zwyrodnienia plamki związanego z wiekiem charakteryzuje się obecnością druzów oraz zanikiem fotoreceptorów, nabłonka barwnikowego siatkówki i naczyń włosowatych naczyniówki",
    ],
    correct: "D",
  },
  {
    question:
      "Wybierz prawidłową kolejność układu warstw rogówki od najbardziej zewnętrznej do najbardziej wewnętrznej:",
    answers: [
      "A. Nabłonek, błona Bowmana, istota właściwa, błona Descemeta, śródbłonek",
      "B. Śródbłonek, błona Bowmana, istota właściwa, błona Descemeta, nabłonek",
      "C. Nabłonek, błona Descemeta, istota właściwa, błona Bowmana, śródbłonek",
      "D. Śródbłonek, błona Descemeta, istota właściwa, błona Bowmana, nabłonek",
      "E. Nabłonek, błona Descemeta, istota właściwa, śródbłonek, błona Bowmana",
    ],
    correct: "A",
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {showScore ? (
        <div>
          <h1>
            Twój wynik: {score} z {questions.length}
          </h1>
        </div>
      ) : (
        <div>
          <h1>{questions[currentQuestion].question}</h1>
          <div>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer[0])}
                style={{
                  display: "block",
                  margin: "10px 0",
                  padding: "10px",
                  fontSize: "16px",
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
