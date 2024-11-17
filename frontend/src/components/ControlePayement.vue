<template>
    <div class="controle-paiement">
      <h1>Controle Payement</h1>
  
      <!-- Zone de saisie pour l'année -->
      <div class="annee-controller">
        <label for="annee">Annee</label>
        <input
          type="text"
          id="annee"
          v-model="annee"
          placeholder="Entrer l'année"
        />
        <button @click="fetchData">Controller</button>
      </div>
  
      <!-- Tableau pour Montant -->
      <div class="tableau-montant">
        <table>
          <thead>
            <tr>
              <th>Montant Estimer</th>
              <th>Montant Recolter</th>
              <th>Montant A recolter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ montantEstime }}</td>
              <td>{{ montantRecolte }}</td>
              <td>{{ montantARecolter }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Tableau des détails -->
      <div class="details-paiement">
        <h2>Details Controle Payement</h2>
        <table>
          <thead>
            <tr>
              <th>IdIdentification</th>
              <th>Nom</th>
              <th>Categorie</th>
              <th>Montant A Payer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in details" :key="detail.id">
              <td>{{ detail.idIdentification }}</td>
              <td>{{ detail.nom }}</td>
              <td>{{ detail.categorie }}</td>
              <td>{{ detail.montantAPayer }}</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <strong>TOTAL : {{ total }}</strong>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        annee: "",
        montantEstime: 40000,
        montantRecolte: 10000,
        montantARecolter: 30000,
        details: [
          // Exemple de données
          // À remplacer avec des données récupérées de l'API
          { idIdentification: 1, nom: "Jean Dupont", categorie: "A", montantAPayer: 1500 },
          { idIdentification: 2, nom: "Marie Curie", categorie: "B", montantAPayer: 2000 },
        ],
      };
    },
    computed: {
      total() {
        return this.details.reduce((sum, detail) => sum + detail.montantAPayer, 0);
      },
    },
    methods: {
      fetchData() {
        // Simulation d'un appel API pour récupérer les données
        console.log("Récupérer les données pour l'année :", this.annee);
        // Exemple : Mettre à jour les détails et montants ici
      },
    },
  };
  </script>
  
  <style scoped>
  .controle-paiement {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .annee-controller {
    margin-bottom: 20px;
  }
  
  .annee-controller label {
    margin-right: 10px;
  }
  
  .annee-controller input {
    padding: 5px;
    margin-right: 10px;
  }
  
  .annee-controller button {
    padding: 5px 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  table th,
  table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  table th {
    background-color: #f2f2f2;
  }
  
  .total {
    text-align: right;
    font-weight: bold;
  }
  </style>
  