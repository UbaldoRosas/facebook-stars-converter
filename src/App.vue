<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="">
      <q-page class="flex flex-center">
        <main class="q-pa-lg">
          <header class="text-center q-mb-xl">
            <img src="./assets/star-colors.svg" width="100" alt="">
            <h1 class="text-h4 text-bold">Facebook Stars Converter</h1>
            <h2 class="text-subtitle1">Check how much are Facebook Stars worth on any currency</h2>
          </header>
          <section class="section">
            <q-card class="shadow-11">
              <q-card-section class="card-section q-pa-xl"> 
                <div class="row justify-center q-col-gutter-md">
                  <div class="col-sm-6 col-xs-12">
                    <label class="text-subtitle1 text-bold text-grey-9">Amount</label>
                    <q-input outlined class="q-mt-xs" type="number" suffix="STAR" v-model="stars" min="1">
                      <template v-slot:prepend>
                        <img src="./assets/star.svg" width="20" alt="">
                      </template>
                    </q-input>
                  </div>
                  <!-- <div class="col-auto text-center flex column flex-center q-px-md">
                    <label class="text-subtitle2 text-bold text-white non-selectable">To</label>
                    <p class="text-subtitle1 q-mt-xs q-mb-none">To</p>
                  </div> -->
                  <div class="col-sm-6 col-xs-12">
                    <label class="text-subtitle1 text-bold text-grey-9">Currency</label>
                    <q-select outlined class="q-mt-xs" use-input v-model="currencyName" emit-value map-options behavior="menu" @filter="filterFn" :options="options" label="Select or type currency" option-value="id" option-label="name">
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                          <q-item-section avatar>
                            <div class="currency-flag" :class="`currency-flag-${scope.opt.id}`"></div>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label v-html="scope.opt.name"></q-item-label>
                            <q-item-label caption>{{ scope.opt.id }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="row justify-end q-mt-lg">
                  <div class="col-auto flex flex-center">
                    <q-btn color="primary" label="Convert" class="text-bold" padding="12px 40px" @click="getConversion()" />
                  </div>
                </div>
                <div class="q-mt-lg" v-show="showResult">
                  <p class="text-subtitle1 text-grey-8 q-mb-none">{{ stars }} {{ stars > 1 ? 'stars' : 'star' }} =</p>
                  <h3 class="text-h4 text-bold text-grey-10 q-mt-none" id="result">$40 <span>{{ currencyName }}</span></h3>
                  <p class="text-uppercase q-mb-none text-grey-6">1 star = 0.01 USD</p>
                </div>
              </q-card-section>
            </q-card>
          </section>
          <footer class="text-center q-mt-xl">
            <p class="text-caption text-grey-9">Made with <img class="icon-love" src="./assets/love.svg" width="16" alt=""> by Ubaldo Rosas.</p>
            <p class="text-caption text-grey-6">Currency data provided by <a href="https://coinbase.com" target="blank" class="text-grey-6">Coinbase</a>.</p>
          </footer>
        </main>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
const axios = require('axios');
import 'currency-flags/dist/currency-flags.min.css';

let currencies = [];
let exchangeRates = [];

axios({ method: 'get', url: 'https://api.coinbase.com/v2/currencies'})
  .then(response => currencies = response.data.data );

axios({ method: 'get', url: 'https://api.coinbase.com/v2/exchange-rates'})
  .then(response => exchangeRates = response );

export default {
  name: 'LayoutDefault',

  components: {
  },

  data () {
    return {
      leftDrawerOpen: false,
      currencies,
      stars: 0,
      options: [currencies],
      currencyName: '',
      showResult: false,
    }
  },

  computed: {
    calculate() {
      console.log(typeof this.stars,typeof  this.currencyName);
    }
  },

  methods: {
    getConversion() {
      this.calculate;
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = currencies
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = currencies.filter(currency => (currency.name.toLowerCase().indexOf(needle) > -1 || currency.id.toLowerCase().indexOf(needle) > -1))
      })
    }
  }
}
</script>

<style lang="scss">
  main {
    width: 100%;
  }

  img {
    user-select: none;
    pointer-events: none;
  }

  .section {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  .q-field__native {
    font-size: 17px;
  }

  .q-field__suffix {
    opacity: 0.6;
  }

  .q-item__section--avatar {
    min-width: 41px;
  }

  .icon-love {
    vertical-align: sub;
  }

  .q-card.shadow-11 {
    box-shadow: 0 6px 7px -4px rgb(0 0 0 / 10%), 0 11px 15px 1px rgb(0 0 0 / 7%), 0 4px 20px 3px rgb(0 0 0 / 6%);
  }

  @media (max-width: 599px) {
  }
</style>
