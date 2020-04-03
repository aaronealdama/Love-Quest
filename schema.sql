DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb;

USE userdb;

CREATE TABLE user (
    id UNIQUE NOT NULL AUTO_INCREMENTT,
    account_number VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE login_info (
     id INT UNIQUE NOT NULL AUTO_INCREMENT,
     username VARCHAR(30) NULL,
     user_password VARCHAR(30) NULL,
    
    
    );

CREATE TABLE user_info (
     id INT UNIQUE NOT NULL AUTO_INCREMENT,
     last_name VARCHAR(30) NULL,
     first_name VARCHAR(30) NULL,
     

)

