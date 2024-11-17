-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS scoot;
USE scoot;

-- Création de la table Identification
CREATE TABLE IF NOT EXISTS Identification (
    idIdentification INT AUTO_INCREMENT PRIMARY KEY,                -- Code unique d'identification
    nom VARCHAR(100) NOT NULL,                       -- Nom de l'identification
    idCategorie INT NOT NULL                            -- Clé étrangère pour le rôle
);

-- Création de la table Categorie
CREATE TABLE IF NOT EXISTS Categorie (
    idCategorie INT AUTO_INCREMENT PRIMARY KEY,          -- Clé primaire pour chaque rôle
    nomCategorie VARCHAR(50) NOT NULL UNIQUE,                -- Nom du rôle
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


-- recuperer Les montants resultat

    -- Le montan a payer pour une annee
    create or replace view identification_cpl as 
    select iden.* , cat.nomCategorie , cat.montantAPayer
    from Identification as iden
    Join Categorie as cat on iden.idCategorie = cat.idCategorie;

    select sum(montantAPayer) from identification_cpl;

SELECT 
    SUM(iden.montantAPayer) AS montantEstime,
    COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (SUM(iden.montantAPayer) - COALESCE(SUM(p.Montant), 0)) AS montantARemonter
FROM 
    identification_cpl AS iden
LEFT JOIN 
    Payement AS p
    ON iden.idIdentification = p.idIdentification
WHERE 
    YEAR(p.DatePayement) = YEAR(CURDATE()) -- Limiter les paiements à l'année en cours
    OR p.DatePayement IS NULL;            -- Inclure les identifications sans paiements


-- DETAILS DE Payement
CREATE OR REPLACE VIEW details_payement_identification AS
SELECT 
    iden.idIdentification,
    iden.nom AS nomIdentification,
    cat.nomCategorie,
    cat.montantAPayer,
    COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (cat.montantAPayer - COALESCE(SUM(p.Montant), 0)) AS montantARemonter
FROM 
    Identification AS iden
JOIN 
    Categorie AS cat
    ON iden.idCategorie = cat.idCategorie
LEFT JOIN 
    Payement AS p
    ON iden.idIdentification = p.idIdentification
GROUP BY 
    iden.idIdentification, cat.nomCategorie, cat.montantAPayer;
