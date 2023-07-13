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


