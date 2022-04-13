CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE pokemon (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pkm_name VARCHAR(50) NOT NULL,
	pkm_level INT NOT NULL,
	type_1 VARCHAR(50) NOT NULL,
	type_2 VARCHAR(50),
	added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO users (first_name, last_name, email) VALUES (
	1, "Diana", "Cerda", "diana@pokemon.cl"
);

INSERT INTO pokemon (id, pkm_name, pkm_level, type_1, user_id) VALUES (
  1, "Pikachu", 15, "Electric", 1
);

