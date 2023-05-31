import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="screener"
export default class extends Controller {
  static targets = [
    "answer",
    "nextButton",
    "previousButton",
    "progressBar",
    "question",
    "questionText",
    "screenerId",
  ]

  static values = {
    answerId: Number,
    answerText: String,
    currentQuestionIndex: { type: Number, default: 0 },
    currentQuestionObject: Object,
    params: Object,
    questionsWithIds: Array,
    redirectUrl: { type: String, default: '/screeners/follow_up' },
    submitUrl: { type: String, default: '/api/v1/screener_responses/assess' },
  }

  initialize() {
    this.currentQuestionIndexValue = 0
    this.initializeParams()
    this.updateCurrentQuestion()
    this.progressBarTarget.max = this.questionsWithIds.length
    this.updateProgressBar()
    this.updateButtons()
  }

  initializeParams() {
    this.paramsValue = {
      screener_id: this.screenerIdTarget.value,
      answers: []
    }
  }

  // UI elements updaters

  updateProgressBar() {
    this.progressBarTarget.value = this.currentQuestionIndexValue + 1
  }

  updateCurrentQuestion() {
    this.currentQuestionObjectValue = this.questionsWithIds[this.currentQuestionIndexValue]
    this.questionTextTarget.textContent = this.currentQuestionObjectValue.questionText
  }

  updateButtons() {
    this.updatePreviousButton()
    this.updateNextButton()
  }

  updateInputs() {
    this.answerTargets.forEach(element => {
      element.checked = false
    })
    this.updateButtons()
  }

  updatePreviousButton() {
    if (this.hasPreviousQuestion()) {
      this.previousButtonTarget.disabled = false
    } else {
      this.previousButtonTarget.disabled = true
    }
  }

  updateNextButton() {
    if (this.hasNextQuestion()) {
      this.nextButtonTarget.textContent = "Next"
      this.nextButtonTarget.setAttribute("data-action", "click->screener#next")
      this.nextButtonTarget.classList.add("btn-primary")
      this.nextButtonTarget.classList.remove("btn-accent")
    } else {
      this.nextButtonTarget.textContent = "Submit"
      this.nextButtonTarget.setAttribute("data-action", "click->screener#submit")
      this.nextButtonTarget.classList.add("btn-accent")
      this.nextButtonTarget.classList.remove("btn-primary")
    }

    if (this.hasAnswer()) {
      this.nextButtonTarget.disabled = false
    } else {
      this.nextButtonTarget.disabled = true
    }
  }

  // Actions

  next() {
    this.currentQuestionIndexValue++
    this.updateCurrentQuestion()
    this.updateProgressBar()
    this.updateButtons()
    this.updateInputs()
  }

  previous() {
    this.currentQuestionIndexValue--
    this.updateCurrentQuestion()
    this.updateProgressBar()
    this.updateButtons()
    this.updateInputs()
  }

  selectAnswer(event) {
    const value = event.target.value
    const questionId = this.currentQuestionObjectValue.questionId

    if(this.paramsValue.answers.find(answer => answer.question_id === questionId)) {
      this.changeAnswer(questionId, value)
    } else {
      this.addAnswer(questionId, value)
    }
    console.log(this.paramsValue)
    this.updateButtons()
  }

  // Helpers

  hasAnswer() {
    return this.answerTargets.some(element => element.checked)
  }

  hasPreviousQuestion() {
    return this.currentQuestionIndexValue > 0
  }

  hasNextQuestion() {
    return this.currentQuestionIndexValue < this.questionsWithIds.length - 1
  }

  addAnswer(questionId, value) {
    this.paramsValue = {
      ...this.paramsValue,
      answers: [
        ...this.paramsValue.answers,
        {
          question_id: questionId,
          value: value
        }
      ]
    }
  }

  changeAnswer(questionId, value) {
    this.paramsValue = {
      ...this.paramsValue,
      answers: this.paramsValue.answers.map(answer => {
        if (answer.question_id === questionId) {
          return {
            question_id: questionId,
            value: value
          }
        } else {
          return answer
        }
      })
    }
  }

  // Submit

  submit() {
    const token = document.querySelector("meta[name=csrf-token]").content
    const data = {
      ...this.paramsValue,
      authenticity_token: token,
    }

    const redirectUrl = new URL(window.location.origin + this.redirectUrlValue)
    console.log('redirectUrl')
    console.log(redirectUrl)
    console.log('this.submitUrlValue')
    console.log(this.submitUrlValue)

    fetch(this.submitUrlValue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('data')
        console.log(data)
        redirectUrl.searchParams.set('screener_response_id', data.screener_response_id)
        console.log('redirectUrl')
        console.log(redirectUrl)
        window.location.href = redirectUrl
      })
      .catch(error => console.error(error))
  }

  // Getter helpers

  get params() {
    return this.paramsValue
  }

  get questionsWithIds() {
    const objects = this.questionTargets.map(element => {
      return {
        questionText: element.dataset.questionText,
        questionId: element.dataset.questionId
      }
    })
    return objects
  }
}
