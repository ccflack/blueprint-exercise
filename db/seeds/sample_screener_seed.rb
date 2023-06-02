# The assess action assumes an existing screener with the following data.

# Create a screener
screener = Screener.find_or_create_by!(
  id: -1,
  name: "BPDS",
  disorder: "Cross-Cutting",
  full_name: "Blueprint Diagnostic Screener"
)

# Create battery of answers
answers_arr = [
  {
    "title": "Not at all",
    "value": 0
  },
  {
    "title": "Rare, less than a day or two",
    "value": 1
  },
  {
    "title": "Several days",
    "value": 2
  },
  {
    "title": "More than half the days",
    "value": 3
  },
  {
    "title": "Nearly every day",
    "value": 4
  }
]

answers = answers_arr.map do |answer_attribute|
  Answer.find_or_create_by!(answer_attribute)
end

# Create battery of questions
questions_arr = [
  {
    "question_id": "question_a",
    "domain": "depression",
    "title": "Little interest or pleasure in doing things?"
  },
  {
    "question_id": "question_b",
    "domain": "depression",
    "title": "Feeling down, depressed, or hopeless?"
  },
  {
    "question_id": "question_c",
    "domain": "mania",
    "title": "Sleeping less than usual, but still have a lot of energy?"
  },
  {
    "question_id": "question_d",
    "domain": "mania",
    "title": "Starting lots more projects than usual or doing more risky things than usual?"
  },
  {
    "question_id": "question_e",
    "domain": "anxiety",
    "title": "Feeling nervous, anxious, frightened, worried, or on edge?"
  },
  {
    "question_id": "question_f",
    "domain": "anxiety",
    "title": "Feeling panic or being frightened?"
  },
  {
    "question_id": "question_g",
    "domain": "anxiety",
    "title": "Avoiding situations that make you feel anxious?"
  },
  {
    "question_id": "question_h",
    "domain": "substance_use",
    "title": "Drinking at least 4 drinks of any kind of alcohol in a single day?"
  }
]

questions = questions_arr.map do |question_attribute|
  Question.find_or_create_by!(question_attribute)
end

# Create a section
section = Section.find_or_initialize_by({
  "type": "standard",
  "title": "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
})

# Associates questions and answers with section
unless section.persisted?
  section.questions = questions
  section.answers = answers
  section.save!
end

# Create a content
content = Content.find_or_initialize_by(display_name: "BDS")

# Associates content to screener and section to content
unless content.persisted?
  content.sections = [section]
  content.screener = screener
  content.save!
end
