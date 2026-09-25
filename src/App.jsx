import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  STATIC_USERS
} from "./data/users";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzQRjbni9mHn-awN4gGyGCD3iBdGaYqJTDerzuHbkEW8fXi5R9X4ZA4FqCkcCPJRVeT/exec";



function createSubmissionId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `quiz-${Date.now()}`;
}

function shuffleArray(items) {
  const shuffled = [...items];

  for (
    let currentIndex = shuffled.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      shuffled[currentIndex],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

function getQuestionKey(question) {
  return `${question.set}|${question.id}`;
}


export default function App() {
  const [users] = useState(() => {
  const registeredUsers = new Set();

  return STATIC_USERS
    .map((item) => {
      const participantName =
        String(
          item.participantName || ""
        ).trim();

      const carrier =
        String(
          item.carrier || ""
        ).trim();

      return {
        participantName,
        carrier,

        displayName:
          carrier !== ""
            ? `${participantName} - ${carrier}`
            : participantName
      };
    })
    .filter((item) => {
      if (
        item.participantName === ""
      ) {
        return false;
      }

      const uniqueKey =
        `${item.participantName}|${item.carrier}`
          .toLowerCase();

      if (
        registeredUsers.has(
          uniqueKey
        )
      ) {
        return false;
      }

      registeredUsers.add(
        uniqueKey
      );

      return true;
    })
    .sort((first, second) => {
      return first.displayName.localeCompare(
        second.displayName,
        "id",
        {
          sensitivity: "base"
        }
      );
    });
});

const usersLoading = false;
const usersError = "";

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] =
    useState(false);


  const [questionSets, setQuestionSets] =
    useState([]);

  const [
    questionsLoading,
    setQuestionsLoading
  ] = useState(true);

  const [
    questionsError,
    setQuestionsError
  ] = useState("");

  const [selectedSet, setSelectedSet] =
    useState("");

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const [startedAt, setStartedAt] = useState("");
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] =
  useState(false);
  const [submitError, setSubmitError] =
  useState("");



useEffect(() => {
  let componentActive = true;

  async function loadQuestionSets() {
    setQuestionsLoading(true);
    setQuestionsError("");

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}question-sets.json`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data.sets)) {
        throw new Error(
          "Format daftar set pertanyaan tidak sesuai."
        );
      }

      const validSets =
        data.sets.filter((item) => {
          const setName =
            String(
              item.set || ""
            ).trim();

          const setFile =
            String(
              item.file || ""
            ).trim();

          const questionCount =
            Number(
              item.questionCount
            );

          return (
            setName !== "" &&
            setFile !== "" &&
            questionCount === 15
          );
        });

      if (validSets.length === 0) {
        throw new Error(
          "Tidak ditemukan set dengan tepat 15 pertanyaan."
        );
      }

      if (componentActive) {
        setQuestionSets(validSets);

        console.log(
          `${validSets.length} set pertanyaan berhasil dimuat dari GitHub.`
        );
      }
    } catch (error) {
      console.error(
        "Gagal memuat daftar set pertanyaan:",
        error
      );

      if (componentActive) {
        setQuestionSets([]);

        setQuestionsError(
          error.message ||
            "Daftar set pertanyaan gagal dimuat."
        );
      }
    } finally {
      if (componentActive) {
        setQuestionsLoading(false);
      }
    }
  }

  loadQuestionSets();

  return () => {
    componentActive = false;
  };
}, []);

const filteredUsers = useMemo(() => {
  const keyword =
    search.trim().toLowerCase();

  if (keyword === "") {
    return users;
  }

  return users.filter((item) => {
    const searchableText = [
      item.participantName,
      item.carrier,
      item.displayName
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      keyword
    );
  });
}, [search, users]);

  const currentQuestion = questions[questionIndex];
  const hasStarted = questions.length > 0;



  function selectUser(selectedUser) {
    setUser(selectedUser);
    setSearch(selectedUser.displayName);
    setDropdownOpen(false);
  }

async function startQuiz() {
  if (
    !user ||
    !user.participantName ||
    usersLoading ||
    questionsLoading ||
    questionSets.length === 0
  ) {
    return;
  }

  setQuestionsLoading(true);
  setQuestionsError("");

  try {
    const randomSetIndex =
      Math.floor(
        Math.random() *
          questionSets.length
      );

    const selectedSetData =
      questionSets[randomSetIndex];

    const setName =
      String(
        selectedSetData.set || ""
      ).trim();

    const setFile =
      String(
        selectedSetData.file || ""
      ).trim();

    if (
      setName === "" ||
      setFile === ""
    ) {
      throw new Error(
        "Konfigurasi set pertanyaan tidak lengkap."
      );
    }

    const response = await fetch(
      `${import.meta.env.BASE_URL}${setFile}`
    );

    if (!response.ok) {
      throw new Error(
        `${setName} gagal dimuat. HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    if (
      String(data.set || "").trim() !==
      setName
    ) {
      throw new Error(
        `Nama set pada file ${setFile} tidak sesuai.`
      );
    }

    if (
      !Array.isArray(data.questions)
    ) {
      throw new Error(
        `Format ${setName} tidak sesuai.`
      );
    }

    if (
      data.questions.length !== 15
    ) {
      throw new Error(
        `${setName} tidak memiliki tepat 15 pertanyaan.`
      );
    }

    const validQuestions =
      data.questions.filter(
        (question) => {
          if (
            String(
              question.id || ""
            ).trim() === ""
          ) {
            return false;
          }

          if (
            String(
              question.question || ""
            ).trim() === ""
          ) {
            return false;
          }

          if (
            !Array.isArray(
              question.choices
            ) ||
            question.choices.length !== 4
          ) {
            return false;
          }

          return question.choices.every(
            (choice) => {
              const code =
                String(
                  choice.code || ""
                )
                  .trim()
                  .toUpperCase();

              const text =
                String(
                  choice.text || ""
                ).trim();

              return (
                ["A", "B", "C", "D"].includes(
                  code
                ) &&
                text !== ""
              );
            }
          );
        }
      );

    if (
      validQuestions.length !== 15
    ) {
      throw new Error(
        `${setName} memiliki pertanyaan atau pilihan jawaban yang tidak valid.`
      );
    }

    const registeredIds =
      new Set();

    validQuestions.forEach(
      (question) => {
        const questionId =
          String(
            question.id
          ).trim();

        if (
          registeredIds.has(
            questionId
          )
        ) {
          throw new Error(
            `ID pertanyaan ${questionId} berulang pada ${setName}.`
          );
        }

        registeredIds.add(
          questionId
        );
      }
    );

    const preparedQuestions =
      shuffleArray(
        validQuestions
      ).map((question) => ({
        id:
          String(
            question.id
          ).trim(),

        set:
          setName,

        question:
          String(
            question.question
          ).trim(),

        choices:
          shuffleArray(
            question.choices.map(
              (choice) => ({
                code:
                  String(
                    choice.code
                  )
                    .trim()
                    .toUpperCase(),

                text:
                  String(
                    choice.text
                  ).trim()
              })
            )
          )
      }));

    setSelectedSet(setName);
    setQuestions(preparedQuestions);
    setQuestionIndex(0);
    setAnswers({});
    setStartedAt(
      new Date().toISOString()
    );
    setFinished(false);
    setResult(null);
    setSubmitError("");
  } catch (error) {
    console.error(
      "Gagal memulai quiz:",
      error
    );

    setQuestions([]);
    setSelectedSet("");

    setQuestionsError(
      error.message ||
        "Pertanyaan gagal dimuat."
    );
  } finally {
    setQuestionsLoading(false);
  }
}

  function selectAnswer(selectedChoice) {
  const question =
    questions[questionIndex];

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question);

  setAnswers((previousAnswers) => ({
    ...previousAnswers,
    [questionKey]: selectedChoice
  }));
  }

  function hasCurrentAnswer() {
  const question =
    questions[questionIndex];

  if (!question) {
    return false;
  }

  const questionKey =
    getQuestionKey(question);

  return Boolean(
    answers[questionKey]
  );
  }

  function goToPreviousQuestion() {
    if (questionIndex === 0) {
      return;
    }

    setQuestionIndex(
      (previousIndex) => previousIndex - 1
    );
  }

  function goToNextQuestion() {
  if (!hasCurrentAnswer()) {
    return;
  }

  if (
    questionIndex <
    questions.length - 1
  ) {
    setQuestionIndex(
      (previousIndex) =>
        previousIndex + 1
    );
  }
  }

async function submitQuiz() {
  if (
    !hasCurrentAnswer() ||
    isSubmitting
  ) {
    return;
  }

  setIsSubmitting(true);
  setSubmitError("");

  const submittedAt =
    new Date().toISOString();

  const startedTime =
    new Date(startedAt).getTime();

  const submittedTime =
    new Date(submittedAt).getTime();

  const durationSeconds = Math.max(
    0,
    Math.round(
      (
        submittedTime -
        startedTime
      ) / 1000
    )
  );

  const questionDetails = questions
  .map((question, index) => {
    return `${index + 1}. ${question.question}`;
  })
  .join(" || ");

const answerDetails = questions
  .map((question, index) => {
    const questionKey =
      getQuestionKey(question);

    const selectedChoice =
      answers[questionKey];

    const selectedCode =
      selectedChoice?.code || "";

    const selectedText =
      selectedChoice?.text || "";

    return `${index + 1}. ${selectedCode} - ${selectedText}`;
  })
  .join(" || ");

  const quizResult = {
  submissionId:
    createSubmissionId(),

  user:
    user.participantName,

  carrier:
    user.carrier || "",

  set:
    selectedSet,

  startedAt:
    startedAt,

  submittedAt:
    submittedAt,

  durationSeconds:
    durationSeconds,

  questions:
    questionDetails,

  answers:
    answerDetails,

  status:
    "Selesai"
};

  try {
    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(
            quizResult
          )
      }
    );

    setResult({
      ...quizResult
    });

    setFinished(true);
  } catch (error) {
    console.error(
      "Pengiriman hasil gagal:",
      error
    );

    setSubmitError(
      "Hasil belum berhasil dikirim. Periksa koneksi internet, kemudian coba kembali."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  function resetQuiz() {
  setSearch("");
  setUser(null);
  setDropdownOpen(false);
  setQuestions([]);
  setQuestionIndex(0);
  setAnswers({});
  setSelectedSet("");
  setStartedAt("");
  setFinished(false);
  setResult(null);
  setSubmitError("");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-2xl">
        <header className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl">
            <img
              src={`${import.meta.env.BASE_URL}psychometric.jpg`}
              ></img>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Psychometric Test
          </h1>

          <p className="mt-3 text-slate-500">
          Psychometric assessment • 15 pertanyaan
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-xl sm:p-9">
          {!hasStarted && !finished && (
            <div className="space-y-5">
              <div className="relative">
                <label
                  htmlFor="user-search"
                  className="mb-2 block text-sm font-semibold"
                >
                  Pilih user
                </label>

                <input
                  id="user-search"
                  type="text"
                  autoComplete="off"
                  value={search}
                  placeholder="Cari nama user..."
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  onFocus={() => {
                    if (!user) {
                      setDropdownOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setDropdownOpen(false);
                    }, 150);
                  }}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setUser(null);
                    setDropdownOpen(true);
                  }}
                />

                {dropdownOpen && (
                  <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {usersLoading ? (
                      <div className="p-4 text-center">
                        <p className="text-sm font-medium text-indigo-600">
                          Memuat daftar user...
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Mohon tunggu sebentar.
                        </p>
                      </div>
                    ) : usersError ? (
                      <div className="p-4">
                        <p className="text-sm font-semibold text-red-600">
                          Daftar user gagal dimuat
                        </p>

                        <p className="mt-1 text-xs text-red-500">
                          {usersError}
                        </p>
                      </div>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((item) => (
                        <button
                          type="button"
                          key={`${item.participantName}-${item.carrier}`}
                          className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-indigo-50 hover:text-indigo-700"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            selectUser(item);
                          }}
                        >
                          <span className="block font-medium">
                            {item.participantName}
                          </span>

                          {item.carrier && (
                            <span className="mt-1 block text-xs text-slate-400">
                              LP : {item.carrier}
                            </span>
                          )}
                        </button>
                      ))
                    ) : (
                      <p className="p-3 text-sm text-slate-500">
                        User tidak ditemukan.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {user && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  <p className="font-semibold">
                    User terpilih
                  </p>

                  <p className="mt-1">
                    {user.participantName}
                  </p>

                  {user.carrier && (
                    <p className="mt-1 text-xs">
                      LP: {user.carrier}
                    </p>
                  )}
                </div>
              )}

              {/* Pesan error bank pertanyaan */}
              {questionsError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {questionsError}
                </div>
              )}

              <button
                type="button"
                disabled={
                  !user ||
                  usersLoading ||
                  questionsLoading ||
                  Boolean(usersError) ||
                  Boolean(questionsError)
                }
                onClick={startQuiz}
                className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {usersLoading || questionsLoading
                  ? "Memuat Data Quiz..."
                  : "Mulai Quiz"}
              </button>

              <p className="text-center text-xs text-slate-400">
                Hanya user yang sudah terdaftar yang dapat
                mengikuti quiz.
              </p>
            </div>
          )}

          {hasStarted &&
            !finished &&
            currentQuestion && (
              <div>
                <div className="mb-3 text-sm text-slate-500">
                  Peserta:{" "}
                    <strong>
                      {user?.participantName}
                      {user?.carrier
                        ? ` - ${user.carrier}`
                        : ""}
                    </strong>
                </div>


                <div className="mb-4 flex items-center justify-between text-sm font-semibold text-indigo-700">
                  <span>
                    Pertanyaan {questionIndex + 1} dari{" "}
                    {questions.length}
                  </span>

                  <span>
                    {Math.round(
                      ((questionIndex + 1) /
                        questions.length) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: `${
                        ((questionIndex + 1) /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <h2 className="mb-5 text-lg font-bold leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="grid gap-3">
                  {currentQuestion.choices.map(
                    (choice, choiceIndex) => {
                      const questionKey =
                        getQuestionKey(
                          currentQuestion
                        );

                      const selectedChoice =
                        answers[questionKey];

                      const selected =
                        selectedChoice?.code ===
                        choice.code;

                      const choiceClass = selected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-800"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50";

                      return (
                        <button
                          type="button"
                          key={choice.code}
                          onClick={() =>
                            selectAnswer(choice)
                          }
                          className={`flex w-full items-start rounded-xl border-2 p-3 text-left text-sm leading-relaxed transition ${choiceClass}`}
                          >
                          <span className="mr-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">
                            {String.fromCharCode(
                              65 + choiceIndex
                            )}
                          </span>

                          <span className="flex-1">
                            {choice.text}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                {hasCurrentAnswer() && (
                  <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-sm font-semibold text-indigo-700">
                    Jawaban telah dipilih. Silakan lanjut ke
                    pertanyaan berikutnya.
                  </div>
                )}

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    disabled={questionIndex === 0}
                    onClick={goToPreviousQuestion}
                    className="h-11 flex-1 rounded-xl border border-slate-300 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Kembali
                  </button>

                  {questionIndex <
                  questions.length - 1 ? (
                    <button
                      type="button"
                      disabled={!hasCurrentAnswer()}
                      onClick={goToNextQuestion}
                      className="h-11 flex-1 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                    >
                      Berikutnya
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={
                        !hasCurrentAnswer() ||
                        isSubmitting
                      }
                      onClick={submitQuiz}
                      className="h-11 flex-1 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                      {isSubmitting
                        ? "Menyimpan..."
                        : "Kirim Jawaban"}
                    </button>
                  )}
                  </div>
                    {submitError && (
                    <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                      {submitError}
                  </div>
)}
                
              </div>
            )}

          {finished && result && (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                OK
              </div>

              <p className="text-slate-500">
                Terima kasih, {result.user}
                {result.carrier
                  ? ` - ${result.carrier}`
                  : ""}
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                Test Selesai
              </h2>

              <p className="my-7 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                Jawaban telah dikirim dan diproses.
              </p>

              <button
                type="button"
                onClick={resetQuiz}
                className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700"
              >
                Selesai dan Kembali
              </button>
            </div>
          )}
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          Daftar user dan pertanyaan dapat diperbarui sesuai
          database perusahaan.
        </p>
      </div>
    </main>
  );
}

