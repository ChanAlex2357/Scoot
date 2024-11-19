--! GROUP BY DIOSEZY
-- Requête pour les montants estimés, récoltés, et restants à remonter
SELECT 
    iden.idDiosezy,
    iden.nomDiosezy,
    SUM(iden.montantAPayer) AS montantEstime,
    COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (SUM(iden.montantAPayer) - COALESCE(SUM(p.Montant), 0)) AS montantARecolter
FROM 
    identification_cpl AS iden
LEFT JOIN 
    Payement AS p
    ON iden.idIdentification = p.idIdentification
WHERE 
    DATE_PART('year', p.DatePayement) = DATE_PART('year', CURRENT_DATE) -- Limiter les paiements à l'année en cours
    OR p.DatePayement IS NULL
GROUP BY 
    iden.idDiosezy,
    iden.nomDiosezy
;   


--! GROUP BY FARITRA
-- Requête pour les montants estimés, récoltés, et restants à remonter
SELECT
    iden.idFaritra,
    iden.nomFaritra,
    SUM(iden.montantAPayer) AS montantEstime,
    COALESCE(SUM(p.Montant), 0) AS montantRecolte,
    (SUM(iden.montantAPayer) - COALESCE(SUM(p.Montant), 0)) AS montantARecolter
FROM 
    identification_cpl AS iden
LEFT JOIN 
    Payement AS p
    ON iden.idIdentification = p.idIdentification
WHERE 
    DATE_PART('year', p.DatePayement) = DATE_PART('year', CURRENT_DATE) -- Limiter les paiements à l'année en cours
    OR p.DatePayement IS NULL
GROUP BY 
    iden.idFaritra,iden.nomFaritra
;   