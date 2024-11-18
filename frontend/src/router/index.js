// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import InsertionPayement from '@/components/FormulaireSimple.vue';
import InsertionMultiple from '@/components/FormulaireMultiple.vue';
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
  {
    path: '/insertion-multiple',
    name: 'InsertionMultiple',
    component: InsertionMultiple,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
