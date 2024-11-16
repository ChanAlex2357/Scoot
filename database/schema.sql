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