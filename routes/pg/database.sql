CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    users_name VARCHAR(50),
    users_email VARCHAR(250) UNIQUE,
    users_password VARCHAR(250)
);

INSERT INTO users (users_name,users_email,users_password) VALUES ('Mack R', 'mackrmrz@gmail.com', 'password' );