CREATE TABLE PACKAGES (
   name varchar not null unique,
   version varchar not null,
   r_version_needed varchar,
   dependencies varchar,
   suggests varchar,
   date timestamp not null,
   title varchar ,
   description varchar ,
   authors  text[] ,
   maintainer varchar ,
   license varchar not null,
   PRIMARY KEY (name)
);


