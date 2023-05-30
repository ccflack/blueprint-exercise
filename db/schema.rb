# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_30_212317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.string "title"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contents", force: :cascade do |t|
    t.string "display_name"
    t.bigint "screener_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["screener_id"], name: "index_contents_on_screener_id"
  end

  create_table "contents_sections", id: false, force: :cascade do |t|
    t.bigint "content_id", null: false
    t.bigint "section_id", null: false
    t.index ["content_id"], name: "index_contents_sections_on_content_id"
    t.index ["section_id"], name: "index_contents_sections_on_section_id"
  end

  create_table "question_responses", force: :cascade do |t|
    t.bigint "screener_response_id", null: false
    t.bigint "question_id", null: false
    t.integer "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_question_responses_on_question_id"
    t.index ["screener_response_id"], name: "index_question_responses_on_screener_response_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "question_id"
    t.integer "domain"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "screener_responses", force: :cascade do |t|
    t.integer "depression_score"
    t.integer "mania_score"
    t.integer "anxiety_score"
    t.integer "substance_use_score"
    t.string "results", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "screener_id", null: false
    t.bigint "user_id", null: false
    t.index ["screener_id"], name: "index_screener_responses_on_screener_id"
    t.index ["user_id"], name: "index_screener_responses_on_user_id"
  end

  create_table "screeners", force: :cascade do |t|
    t.string "name"
    t.string "full_name"
    t.string "disorder"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections", force: :cascade do |t|
    t.string "type"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections_answers", id: false, force: :cascade do |t|
    t.bigint "section_id", null: false
    t.bigint "answer_id", null: false
    t.index ["answer_id"], name: "index_sections_answers_on_answer_id"
    t.index ["section_id"], name: "index_sections_answers_on_section_id"
  end

  create_table "sections_questions", id: false, force: :cascade do |t|
    t.bigint "section_id", null: false
    t.bigint "question_id", null: false
    t.index ["question_id"], name: "index_sections_questions_on_question_id"
    t.index ["section_id"], name: "index_sections_questions_on_section_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "contents", "screeners"
  add_foreign_key "question_responses", "questions"
  add_foreign_key "question_responses", "screener_responses"
  add_foreign_key "screener_responses", "screeners"
  add_foreign_key "screener_responses", "users"
end
