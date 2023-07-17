CREATE DATABASE IF NOT EXISTS atelier;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS "questions" (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    asker_name VARCHAR(50) NOT NULL,
    asker_email VARCHAR(50) NOT NULL,
    helpful INTEGER NOT NULL DEFAULT 0,
    reported BOOLEAN NOT NULL DEFAULT false,
    body VARCHAR(1000) NOT NULL,
    tmp_date BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "answers" (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    body VARCHAR(2000) NOT NULL,
    date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answerer_name VARCHAR(50) NOT NULL,
    answerer_email VARCHAR(50) NOT NULL,
    helpful INTEGER NOT NULL DEFAULT 0,
    reported BOOLEAN NOT NULL DEFAULT false,
    tmp_date BIGINT NOT NULL,
    CONSTRAINT fk_question
        FOREIGN KEY(question_id)
        REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS "photos" (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER references answers(id),
    url VARCHAR(1000),
    CONSTRAINT fk_answer
        FOREIGN KEY(answer_id)
        REFERENCES answers(id)
);

COPY questions(id, product_id, body, tmp_date, asker_name, asker_email, reported, helpful)
from '/Users/joegutman/Repositories/Hack-Reactor/rfp2305-SDC-Backend/QuestionsAnswers-API/data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers( id, question_id, body, tmp_date, answerer_name, answerer_email, reported, helpful)
from '/Users/joegutman/Repositories/Hack-Reactor/rfp2305-SDC-Backend/QuestionsAnswers-API/data/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos( id, answer_id, url)
FROM '/Users/joegutman/Repositories/Hack-Reactor/rfp2305-SDC-Backend/QuestionsAnswers-API/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

UPDATE questions set date_written = to_timestamp(tmp_date/1000)::date;
UPDATE answers set date_written = to_timestamp(tmp_date/1000)::date;

ALTER TABLE questions drop column tmp_date;
ALTER TABLE answers drop column tmp_date;



