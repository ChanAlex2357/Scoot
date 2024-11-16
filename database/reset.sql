-- Désactiver temporairement les contraintes de clé étrangère
SET FOREIGN_KEY_CHECKS = 0;

-- Supprimer les données des tables tout en conservant leur structure
TRUNCATE TABLE Payement;
TRUNCATE TABLE Identification;
TRUNCATE TABLE Categorie;

-- Réactiver les contraintes de clé étrangère
SET FOREIGN_KEY_CHECKS = 1;

-- Réinsertion des données de base

-- Ajout des catégories
INSERT INTO Categorie (nom, montantAPayer)
VALUES
    ('Filoha', 5000),
    ('Mpiandraikitra', 3000),
    ('Behazina', 1000);

-- Ajout des identifications pour la catégorie 'Filoha'
INSERT INTO Identification (nom, categorie_id)
VALUES
    ('Rabe Filoha', 1),
    ('Rasoa Filoha', 1),
    ('Rakoto Filoha', 1);

-- Ajout des identifications pour la catégorie 'Mpiandraikitra'
INSERT INTO Identification (nom, categorie_id)
VALUES
    ('Rabe Mpiandraikitra', 2),
    ('Rasoa Mpiandraikitra', 2),
    ('Rakoto Mpiandraikitra', 2),
    ('Ranaivo Mpiandraikitra', 2),
    ('Rasamy Mpiandraikitra', 2);

-- Ajout des identifications pour la catégorie 'Behazina'
INSERT INTO Identification (nom, categorie_id)
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

-- Ajout des paiements pour quelques identifications
INSERT INTO Payement (idIdentification, Montant, DatePayement)
VALUES
    (1, 5000, '2024-01-15'),
    (2, 3000, '2024-01-20'),
    (3, 1000, '2024-01-25');
