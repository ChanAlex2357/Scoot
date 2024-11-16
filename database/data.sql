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
