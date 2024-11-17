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
import axios from "axios";

export default {
  data() {
    return {
      annee: "",
      montantEstime: 0,
      montantRecolte: 0,
      montantARecolter: 0,
      details: [],
    };
  },
  computed: {
    total() {
      return this.details.reduce((sum, detail) => sum + detail.montantAPayer, 0);
    },
  },
  methods: {
    async fetchData() {
      try {
        // Appel API avec l'année
        const response = await axios.get("http://localhost:3000/sccot-api/summary", {
          params: { annee: this.annee },
        });
        const data = response.data;

        // Mettre à jour les données du composant avec la réponse
        this.montantEstime = data.montantEstime;
        this.montantRecolte = data.montantRecolte;
        this.montantARecolter = data.montantARecolter;
        // this.details = data.details;
        console.log("Données récupérées :", data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.response?.data || error.message);
        alert("Impossible de récupérer les données. Veuillez réessayer.");
      }
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
  