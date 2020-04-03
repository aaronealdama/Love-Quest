-- Create the database seinfeld and specified it for use.
DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb;
USE userdb;

-- Create the table actors.
CREATE TABLE User (
  id int AUTO_INCREMENT,
  username varchar(30) NOT NULL,
  password varchar(60) NOT NULL,
  PRIMARY KEY(id)
);


