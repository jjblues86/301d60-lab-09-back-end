DROP TABLE IF EXISTS weathers;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS movies;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR (255),
  formatted_query VARCHAR (255),
  latitude NUMERIC (8,6), 
  longitude NUMERIC (9,6)
  );

  CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    overview VARCHAR (255),
    average_votes NUMERIC (4,2),
    total_votes NUMERIC (9,2),
    image_url VARCHAR (255),
    popularity NUMERIC (9,2),
    released_on DATE,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id)
  )