// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import InsertionPayement from '@/components/FormulaireSimple.vue'
import ControlePayement from '@/components/ControlePayement.vue';

const routes = [
  {
    path: '/insertion-simple',
    name: 'InsertionPayement',
    component: InsertionPayement,
  },
  {
    path: '/controle-payement',
    name: 'ControlePayement',
    component: ControlePayement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
