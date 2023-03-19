CREATE TABLE persons (
    persons_id SERIAL PRIMARY KEY,
    persons_name VARCHAR(50),
    persons_email VARCHAR(250),
    persons_password VARCHAR(250)
);


ALTER TABLE fav_list
ADD CONSTRAINT fk_persons
FOREIGN KEY (id)
REFERENCES persons (persons_id);


INSERT INTO persons (persons_name,persons_email,persons_password) VALUES ('Peter Parker', 'peterparker@stark.com', 'ramirez' );


CREATE TABLE fav_list (
    list_id SERIAL PRIMARY KEY NOT NULL,
    movie_id VARCHAR(250) NOT NULL,
    persons_id INT,
    FOREIGN KEY (persons_id) REFERENCES persons(persons_id)
);

INSERT INTO fav_list (movie_id, fk_persons) VALUES ( 724089, 2 );

UPDATE fav_list SET id = 1;k 