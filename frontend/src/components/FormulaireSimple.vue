<script>
    import PaymentForm from "./PaymentForm.vue";

    export default {
    components: {
        PaymentForm,
    },
    methods: {
        handlePayment(paymentData) {
        console.log("Données de paiement reçues :", paymentData);

        // Envoyer les données à une API ou les traiter
        // Exemple : utiliser fetch ou axios
        // axios.post('/scoot-api/payement', paymentData).then(...);
        },
    },
};
</script>
<template>
    <div>
      <PaymentForm @submit-payment="handlePayment" />
    </div>
</template>