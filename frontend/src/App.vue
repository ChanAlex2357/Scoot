<script setup>
import FormulaireSimple from './components/FormulaireSimple.vue'
</script>

<template>
  <div class="app">
    <nav class="navigation">
      <ul>
        <li>
          <router-link to="/insertion-simple">Insertion Payement</router-link>
        </li>
        <li>
          <router-link to="/controle-payement">Controle Payement</router-link>
        </li>
      </ul>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.navigation {
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.navigation ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  margin-right: 20px;
}

.navigation a {
  text-decoration: none;
  color: #007bff;
}

.navigation a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>

