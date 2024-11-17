-- Ajout des rôles
INSERT INTO Role (nom, montantAPayer)
VALUES
    ('Filoha', 5000),
    ('Mpiandraikitra', 3000),
    ('Behazina', 1000);

-- Ajout des identifications pour le rôle 'Filoha'
INSERT INTO Identification (code, nom, role_id)
VALUES
    ('IDFILOHA01', 'Rabe Filoha', 1),
    ('IDFILOHA02', 'Rasoa Filoha', 1),
    ('IDFILOHA03', 'Rakoto Filoha', 1);

-- Ajout des identifications pour le rôle 'Mpiandraikitra'
INSERT INTO Identification (code, nom, role_id)
VALUES
    ('IDMPIAND01', 'Rabe Mpiandraikitra', 2),
    ('IDMPIAND02', 'Rasoa Mpiandraikitra', 2),
    ('IDMPIAND03', 'Rakoto Mpiandraikitra', 2),
    ('IDMPIAND04', 'Ranaivo Mpiandraikitra', 2),
    ('IDMPIAND05', 'Rasamy Mpiandraikitra', 2);

-- Ajout des identifications pour le rôle 'Behazina'
INSERT INTO Identification (code, nom, role_id)
VALUES
    ('IDBEHA01', 'Rabe Behazina', 3),
    ('IDBEHA02', 'Rasoa Behazina', 3),
    ('IDBEHA03', 'Rakoto Behazina', 3),
    ('IDBEHA04', 'Ranaivo Behazina', 3),
    ('IDBEHA05', 'Rasamy Behazina', 3),
    ('IDBEHA06', 'Randria Behazina', 3),
    ('IDBEHA07', 'Rafeno Behazina', 3),
    ('IDBEHA08', 'Rajo Behazina', 3),
    ('IDBEHA09', 'Ranto Behazina', 3),
    ('IDBEHA10', 'Raharinaivo Behazina', 3);

-- Création de la table Identification
CREATE TABLE IF NOT EXISTS Identification (
    idIdentification INT AUTO_INCREMENT PRIMARY KEY,                -- Code unique d'identification
    nom VARCHAR(100) NOT NULL,                       -- Nom de l'identification
    idCategorie INT NOT NULL                            -- Clé étrangère pour le rôle
);

-- Création de la table Categorie
CREATE TABLE IF NOT EXISTS Categorie (
    idCategorie INT AUTO_INCREMENT PRIMARY KEY,          -- Clé primaire pour chaque rôle
    nom VARCHAR(50) NOT NULL UNIQUE,                -- Nom du rôle
    montantAPayer DOUBLE NOT NULL DEFAULT 0        -- Montant à payer associé au rôle
);

-- Création de la table Payement
CREATE TABLE IF NOT EXISTS Payement (
    idPayement INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique pour chaque paiement
    idIdentification INT NOT NULL,                 -- Clé étrangère vers Identification
    Montant DOUBLE NOT NULL,                       -- Montant du paiement
    DatePayement DATE NOT NULL,                    -- Date du paiement
    CONSTRAINT chk_montant_positive CHECK (Montant > 0), -- Vérification que le montant est positif
    CONSTRAINT fk_payement_identification FOREIGN KEY (idIdentification)
        REFERENCES Identification (idIdentification) ON DELETE CASCADE
);
