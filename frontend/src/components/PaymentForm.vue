<template>
    <div class="payment-form">
      <h2>Insertion Paiement</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="id-identification">ID Identification :</label>
          <input
            type="text"
            id="id-identification"
            v-model="formData.IdIdentification"
            placeholder="Entrez l'ID de l'identification"
            required
          />
        </div>
        <div class="form-group">
          <label for="montant">Montant :</label>
          <input
            type="number"
            id="montant"
            v-model.number="formData.Montant"
            placeholder="Entrez le montant"
            required
          />
        </div>
        <div class="form-group">
          <label for="date-payement">Date de Paiement :</label>
          <input
            type="date"
            id="date-payement"
            v-model="formData.datePayement"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Soumettre</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "PaymentForm",
    data() {
      return {
        formData: {
          IdIdentification: "",
          Montant: null,
          datePayement: "",
        },
      };
    },
    methods: {
      submitForm() {
        // Émettre les données du formulaire au parent
        this.$emit("submit-payment", { ...this.formData });
        
        // Réinitialiser le formulaire après soumission
        this.formData = {
          IdIdentification: "",
          Montant: null,
          datePayement: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .payment-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  