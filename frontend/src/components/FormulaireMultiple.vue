<template>
    <div class="container">
      <h1>Insertion de Paiements Multiples</h1>
      
      <table class="table">
        <thead>
          <tr>
            <th>Date de Paiement</th>
            <th>Montant</th>
            <th>ID Identification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payement, index) in payements" :key="index">
            <td>
              <input
                type="date"
                v-model="payement.datePayement"
                class="form-control"
                required
              />
            </td>
            <td>
              <input
                type="number"
                v-model="payement.Montant"
                class="form-control"
                step="0.01"
                min="0"
                required
              />
            </td>
            <td>
              <input
                type="number"
                v-model="payement.IdIdentification"
                class="form-control"
                required
              />
            </td>
            <td>
              <button @click="removePayement(index)" class="btn btn-danger">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="actions">
        <button @click="addPayement" class="btn btn-primary">
          Ajouter un Paiement
        </button>
        <button @click="submitPayements" class="btn btn-success">
          Envoyer les Paiements
        </button>
      </div>
  
      <div v-if="message" class="alert" :class="{'alert-success': success, 'alert-danger': !success}">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        payements: [
          {
            datePayement: "",
            Montant: "",
            IdIdentification: "",
          },
        ],
        message: "",
        success: false,
      };
    },
    methods: {
      addPayement() {
        this.payements.push({
          datePayement: "",
          Montant: "",
          IdIdentification: "",
        });
      },
      removePayement(index) {
        this.payements.splice(index, 1);
      },
      async submitPayements() {
        try {
          // Vérification des données avant soumission
          for (const payement of this.payements) {
            if (!payement.datePayement || !payement.Montant || !payement.IdIdentification) {
              this.message = "Tous les champs doivent être remplis.";
              this.success = false;
              return;
            }
          }
          // Appel à l'API pour insérer les paiements
          const response = await axios.post("http://localhost:3000/sccot-api/payementMultiple", { payements: this.payements });
  
          // Afficher un message de succès
          this.message = "Paiements insérés avec succès.";
          this.success = true;
  
          // Réinitialiser le tableau
          this.payements = [
            {
              datePayement: "",
              Montant: "",
              IdIdentification: "",
            },
          ];
        } catch (error) {
          console.error(error);
          this.message = "Erreur lors de l'insertion des paiements.";
          this.success = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
  }
  .table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
  }
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  .actions {
    margin-top: 20px;
  }
  .alert {
    margin-top: 20px;
    padding: 10px;
  }
  </style>
  