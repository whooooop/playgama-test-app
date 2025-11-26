<template>
  <Section title="Payments">
    <InfoGrid>
      <InfoItem label="Is Supported:" :value="isSupported" />
    </InfoGrid>

    <SubSection title="Get Purchases">
      <ButtonGroup>
        <Button @click="getPurchases" :disabled="!isSupported">
          Get Purchases
        </Button>
      </ButtonGroup>
      <div v-if="purchases">
        <CodeBlock>{{ purchases }}</CodeBlock>
      </div>
    </SubSection>

    <SubSection title="Get Catalog">
      <ButtonGroup>
        <Button @click="getCatalog" :disabled="!isSupported">
          Get Catalog
        </Button>
      </ButtonGroup>
      <div v-if="catalog">
        <CodeBlock>{{ catalog }}</CodeBlock>
      </div>
    </SubSection>

    <SubSection title="Purchase & Consume">
      <InputGroup>
        <Input v-model="paymentId" placeholder="ID" />
        <Button @click="purchase" :disabled="!isSupported || !paymentId">
          Purchase
        </Button>
        <Button @click="consume" :disabled="!isSupported || !paymentId">
          Consume
        </Button>
      </InputGroup>
      <div v-if="purchaseStatus">
        <InfoItem label="Response:" :value="''" />
        <CodeBlock>{{ purchaseStatus }}</CodeBlock>
      </div>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';

const bridge = computed(() => window.bridge);
const isSupported = computed(() => bridge.value?.payments?.isSupported);

const purchases = ref('');
const catalog = ref('');
const paymentId = ref('');
const purchaseStatus = ref('');

const getPurchases = async () => {
  if (!bridge.value?.payments) return;

  try {
    const purchasesData = await bridge.value.payments.getPurchases();
    purchases.value = JSON.stringify(purchasesData, undefined, 2);
  } catch (error: any) {
    console.error('Error getting purchases:', error);
    purchases.value = 'Error: ' + error.message;
  }
};

const getCatalog = async () => {
  if (!bridge.value?.payments) return;

  try {
    const catalogData = await bridge.value.payments.getCatalog();
    catalog.value = JSON.stringify(catalogData, undefined, 2);
  } catch (error: any) {
    console.error('Error getting catalog:', error);
    catalog.value = 'Error: ' + error.message;
  }
};

const purchase = async () => {
  if (!bridge.value?.payments || !paymentId.value) return;

  try {
    const result = await bridge.value.payments.purchase(paymentId.value);
    purchaseStatus.value = JSON.stringify(result, undefined, 2);
  } catch (error: any) {
    console.error('Error purchasing:', error);
    purchaseStatus.value = JSON.stringify(error, undefined, 2);
  }
};

const consume = async () => {
  if (!bridge.value?.payments || !paymentId.value) return;

  try {
    const result = await bridge.value.payments.consumePurchase(paymentId.value);
    purchaseStatus.value = JSON.stringify(result, undefined, 2);
  } catch (error: any) {
    console.error('Error consuming purchase:', error);
    purchaseStatus.value = JSON.stringify(error, undefined, 2);
  }
};
</script>
