CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE pokemon (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	level INT NOT NULL,
	type1 VARCHAR(50) NOT NULL,
	type2 VARCHAR(50),
	added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO pokemon (id, name, level, type1, user_id) VALUES (
  1, "Pikachu", 15, "Electric", 1
);

INSERT INTO pokemon (id, name, level, type1, user_id) VALUES (
  2, "Pichu", 06, "Electric", 1
);

INSERT INTO pokemon (id, name, level, type1, type2, user_id) VALUES (
  3, "Lucario", 47, "Fighting", "Steel", 1
);

INSERT INTO pokemon (id, name, level, type1, type2, user_id) VALUES (
  4, "Decidueye", 45, "Grass", "Ghost", 1
);

INSERT INTO pokemon (id, name, level, type1, type2, user_id) VALUES (
  5, "Delphox", 38, "Fire", "Psychic", 1
);
