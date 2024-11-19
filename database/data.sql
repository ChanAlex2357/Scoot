INSERT into Diosezy (nom)VALUES ('Diosezy 1');
INSERT into Faritra (idDiosezy , nom) VALUES 
    (1,'Faritra 1'),
    (1,'Faritra 2'),
    (1,'Faritra 3');
-- Ajout des rôles
INSERT INTO Categorie (nomCategorie, montantAPayer)
VALUES
    ('Filoha', 5000),
    ('Mpiandraikitra', 3000),
    ('Behazina', 1000);

-- Ajout des identifications pour le rôle 'Filoha'
INSERT INTO Identification (nom, idCategorie , idFaritra)
VALUES
    ('Rabe Filoha', 1 ,1),
    ('Rasoa Filoha', 1,2),
    ('Rakoto Filoha', 1,3);

-- Ajout des identifications pour le rôle 'Mpiandraikitra'
INSERT INTO Identification (nom, idCategorie , idFaritra)
VALUES
    ('Rabe Mpiandraikitra', 2,1),
    ('Rasoa Mpiandraikitra', 2,2),
    ('Rakoto Mpiandraikitra', 2,3),
    ('Ranaivo Mpiandraikitra', 2,1),
    ('Rasamy Mpiandraikitra', 2,2);

-- Ajout des identifications pour le rôle 'Behazina'
INSERT INTO Identification (nom, idCategorie,idFaritra)
VALUES
    ('Rabe Behazina', 3,1),
    ('Rasoa Behazina', 3,2),
    ('Rakoto Behazina', 3,3),
    ('Ranaivo Behazina', 3,1),
    ('Rasamy Behazina', 3,2),
    ('Randria Behazina', 3,3),
    ('Rafeno Behazina', 3,1),
    ('Rajo Behazina', 3,2),
    ('Ranto Behazina', 3,3),
    ('Raharinaivo Behazina', 3,1);

