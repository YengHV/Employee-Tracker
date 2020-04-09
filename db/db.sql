-- to delete database if it exists
DROP DATABASE IF EXISTS employee_db;
-- create database 
CREATE DATABASE employee_db;
-- use database to create tables
USE employee_db;
-- department table that holds Names
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    names VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    -- sales, engineering, finance
);
-- roles with id, title, salary, and deparment_id
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIAML (8,2) NOT NULL,
    deparment_id INT NOT NULL AUTO_INCREAMENT,
    PRIMARY KEY (id)
);
-- employee table that holds id, first_name, last_name, role_id, and manager_id
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);
-- Insert into department table
-- values that will be inserted
INSERT INTO department (names)
VALUES ("Sales");
INSERT INTO department (names)
VALUES ("Engineering");
INSERT INTO department (names)
VALUES ("Finance");
-- insert into roles table
-- values that will be inserted
INSERT INTO roles (title)
VALUES ("Sales Lead");
INSERT INTO roles (title)
VALUES ("Software Engineer");
INSERT INTO roles (title)
VALUES ("Accountant");
INSERT INTO roles (title)
VALUES ("Lead Engineer");
-- insert into employees table
-- values that will be inserted
INSERT INTO employees (first_name, last_name)
Values ("John", "Wick");
INSERT INTO employees (first_name, last_name)
Values ("Abra", "Cadabra");
INSERT INTO employees (first_name, last_name)
Values ("Mark", "Colt");



