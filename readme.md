# Projet S5 Design - Scoot

SELECT SUM(iden.montantAPayer) AS montantEstime,
       COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (SUM(iden.montantAPayer) - COALESCE(SUM(p.Montant), 0)) AS montantARecolter
      FROM 
          identification_cpl AS iden
      LEFT JOIN 
          Payement AS p
          ON iden.idIdentification = p.idIdentification
      WHERE 
          DATE_PART('year', p.DatePayement) = 2024 -- Limiter les paiements à l'année spécifiée
          OR p.DatePayement IS NULL;

SELECT 
          i.idIdentification, 
          i.nom, 
          c.nomCategorie, 
          c.montantAPayer
      FROM 
          Identification AS i
      INNER JOIN 
          Categorie AS c ON i.idCategorie = c.idCategorie
      WHERE 
          i.idIdentification NOT IN (
              SELECT 
                  p.idIdentification
              FROM 
                  Payement AS p
              WHERE 
                  DATE_PART('year', p.DatePayement) = 2024
          );