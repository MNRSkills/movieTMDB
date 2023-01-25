CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    users_name VARCHAR(50),
    users_email VARCHAR(250) UNIQUE,
    users_password VARCHAR(250)
);

INSERT INTO users (users_name,users_email,users_password) VALUES ('Mack R', 'mackrmrz@gmail.com', 'password' );


CREATE TABLE fav_list (
    ID SERIAL PRIMARY KEY NOT NULL,
    movie_id VARCHAR(250) NOT NULL
)

INSERT INTO fav_list (movie_id) VALUES ( 724089 );