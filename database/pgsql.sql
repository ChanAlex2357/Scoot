-- Création de la base de données
CREATE DATABASE scoot;
\c scoot;

-- Création de la table Identification
CREATE TABLE IF NOT EXISTS Identification (
    idIdentification SERIAL PRIMARY KEY,          -- Code unique d'identification
    nom VARCHAR(100) NOT NULL,                    -- Nom de l'identification
    idCategorie INT NOT NULL,                      -- Clé étrangère pour le rôle
    idFaritra INT NOT NULL ,
    CONSTRAINT fk_identification_faritra
    FOREIGN KEY (idFaritra) 
    REFERENCES Faritra (idFaritra),
    CONSTRAINT fk_identification_categorie
    FOREIGN KEY (idCategorie) 
    REFERENCES Categorie (idCategorie) 
);

-- Création de la table Categorie
CREATE TABLE IF NOT EXISTS Categorie (
    idCategorie SERIAL PRIMARY KEY,               -- Clé primaire pour chaque rôle
    nomCategorie VARCHAR(50) NOT NULL UNIQUE,     -- Nom du rôle
    montantAPayer DOUBLE PRECISION NOT NULL DEFAULT 0 -- Montant à payer associé au rôle
);

-- Création de la table Payement
CREATE TABLE IF NOT EXISTS Payement (
    idPayement SERIAL PRIMARY KEY,                -- Identifiant unique pour chaque paiement
    idIdentification INT NOT NULL,               -- Clé étrangère vers Identification
    Montant DOUBLE PRECISION NOT NULL,           -- Montant du paiement
    DatePayement DATE NOT NULL,                  -- Date du paiement
    CONSTRAINT chk_montant_positive CHECK (Montant > 0), -- Vérification que le montant est positif
    CONSTRAINT fk_payement_identification FOREIGN KEY (idIdentification)
    REFERENCES Identification (idIdentification) ON DELETE CASCADE
);


CREATE TABLE Diosezy (
    idDiosezy SERIAL PRIMARY KEY ,
    nom VARCHAR(50) NOT NULL
);
CREATE  TABLE Faritra (
    idFaritra SERIAL PRIMARY KEY,
    idDiosezy INT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    CONSTRAINT fk_faritra_diosezy FOREIGN KEY (idDiosezy)
    REFERENCES Diosezy(idDiosezy)
);

CREATE OR REPLACE VIEW Faritra_cpl AS
SELECT
    far.idFaritra,
    far.nom as nomFaritra,
    dio.idDiosezy,
    dio.nom as nomDiosezy
FROM
    Faritra as far
JOIN
    Diosezy as dio on dio.idDiosezy = far.idDiosezy;

-- Vue pour récupérer les montants estimés et récoltés
CREATE OR REPLACE VIEW identification_cpl AS 
SELECT 
    iden.*,
    cat.nomCategorie,
    cat.montantAPayer,
    far.nomFaritra,
    far.idDiosezy,
    far.nomDiosezy
FROM 
    Identification AS iden
JOIN 
    Categorie AS cat 
    ON iden.idCategorie = cat.idCategorie
JOIN
    Faritra_cpl as far
    On far.idFaritra = iden.idFaritra;

-- Vue pour les détails de paiement par identification
CREATE OR REPLACE VIEW details_payement_identification AS
SELECT 
    iden.idIdentification,
    iden.idFaritra,
    iden.nomFaritra,
    iden.idDiosezy,
    iden.nomDiosezy,
    iden.nom AS nomIdentification,
    cat.nomCategorie,
    cat.montantAPayer,
    COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (cat.montantAPayer - COALESCE(SUM(p.Montant), 0)) AS montantARecolter
FROM 
    Identification_cpl AS iden
JOIN 
    Categorie AS cat
    ON iden.idCategorie = cat.idCategorie
LEFT JOIN 
    Payement AS p
    ON iden.idIdentification = p.idIdentification
GROUP BY 
    iden.idIdentification, iden.nom, cat.nomCategorie, cat.montantAPayer,iden.idDiosezy,
    iden.nomDiosezy,iden.idFaritra,iden.nomFaritra;
