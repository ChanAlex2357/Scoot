-- Ajout des rôles
INSERT INTO Categorie (nomCategorie, montantAPayer)
VALUES
    ('Filoha', 5000),
    ('Mpiandraikitra', 3000),
    ('Behazina', 1000);

-- Ajout des identifications pour le rôle 'Filoha'
INSERT INTO Identification (nom, idCategorie)
VALUES
    ('Rabe Filoha', 1),
    ('Rasoa Filoha', 1),
    ('Rakoto Filoha', 1);

-- Ajout des identifications pour le rôle 'Mpiandraikitra'
INSERT INTO Identification (nom, idCategorie)
VALUES
    ('Rabe Mpiandraikitra', 2),
    ('Rasoa Mpiandraikitra', 2),
    ('Rakoto Mpiandraikitra', 2),
    ('Ranaivo Mpiandraikitra', 2),
    ('Rasamy Mpiandraikitra', 2);

-- Ajout des identifications pour le rôle 'Behazina'
INSERT INTO Identification (nom, idCategorie)
VALUES
    ('Rabe Behazina', 3),
    ('Rasoa Behazina', 3),
    ('Rakoto Behazina', 3),
    ('Ranaivo Behazina', 3),
    ('Rasamy Behazina', 3),
    ('Randria Behazina', 3),
    ('Rafeno Behazina', 3),
    ('Rajo Behazina', 3),
    ('Ranto Behazina', 3),
    ('Raharinaivo Behazina', 3);

