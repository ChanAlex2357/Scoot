-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS ScootDB;
USE ScootDB;

-- Création de la table Identification
CREATE TABLE IF NOT EXISTS Identification (
    idIdentification INT AUTO_INCREMENT PRIMARY KEY, -- Clé primaire pour chaque identification
    code VARCHAR(50) NOT NULL UNIQUE,                -- Code unique d'identification
    nom VARCHAR(100) NOT NULL,                       -- Nom de l'identification
    role_id INT NOT NULL,                            -- Clé étrangère pour le rôle
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date de mise à jour
);

-- Création de la table Role
CREATE TABLE IF NOT EXISTS Role (
    idRole INT AUTO_INCREMENT PRIMARY KEY,          -- Clé primaire pour chaque rôle
    nom VARCHAR(50) NOT NULL UNIQUE,                -- Nom du rôle
    montantAPayer DOUBLE NOT NULL DEFAULT 0,        -- Montant à payer associé au rôle
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date de mise à jour
);

-- Création de la table Payement
CREATE TABLE IF NOT EXISTS Payement (
    idPayement INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique pour chaque paiement
    idIdentification INT NOT NULL,                 -- Clé étrangère vers Identification
    Montant DOUBLE NOT NULL,                       -- Montant du paiement
    DatePayement DATE NOT NULL,                    -- Date du paiement
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Date de mise à jour
    CONSTRAINT chk_montant_positive CHECK (Montant > 0), -- Vérification que le montant est positif
    CONSTRAINT fk_payement_identification FOREIGN KEY (idIdentification)
        REFERENCES Identification (idIdentification) ON DELETE CASCADE
);