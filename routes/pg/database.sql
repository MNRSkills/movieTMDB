CREATE TABLE persons (
    ID SERIAL PRIMARY KEY,
    persons_name VARCHAR(50),
    persons_email VARCHAR(250),
    persons_password VARCHAR(250)
);

INSERT INTO persons (persons_name,persons_email,persons_password) VALUES ('Tony Start', 'Start@stark.com', 'passwordyysys' );


CREATE TABLE fav_list (
    ID SERIAL PRIMARY KEY NOT NULL,
    movie_id VARCHAR(250) NOT NULL
)

INSERT INTO fav_list (movie_id) VALUES ( 724089 );

UPDATE fav_list SET id = 1;