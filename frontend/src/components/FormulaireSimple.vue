<script>
import axios from "axios";
import PaymentForm from "./PaymentForm.vue";

export default {
  components: {
    PaymentForm,
  },
  methods: {
    handlePayment(paymentData) {
      // Envoi de la requête POST via Axios
      axios
        .post("http://localhost:3000/scoot-api/payements", paymentData)
        .then((response) => {
          console.log("Paiement ajouté avec succès:", response.data);
          alert("Paiement ajouté avec succès !");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l’ajout du paiement:",
            error.response?.data || error.message
          );
          alert("Une erreur est survenue lors du paiement : "+error.response.data.message);
        });
    },
  },
};
</script>

<template>
  <div>
    <!-- Utilisation du composant PaymentForm -->
    <PaymentForm @submit-payment="handlePayment" />
  </div>
</template>
