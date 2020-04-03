-- Create the database seinfeld and specified it for use.
DROP DATABASE IF EXISTS nodelogin;
CREATE DATABASE nodelogin;
USE nodelogin;

-- Create the table actors.
CREATE TABLE accounts (
  id int AUTO_INCREMENT,
  username varchar(30) NOT NULL,
  password varchar(60) NOT NULL,
  PRIMARY KEY(id)
);


