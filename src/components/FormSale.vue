<template>
  <div>
    <v-form
      ref="formSale"
      v-model="validForm"
      lazy-validation
      @submit.prevent="submitCreateSale"
    >
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            v-if="user"
            sm6
            xs12
          >
            <v-text-field
              v-model="user.name"
              label="Usuario (vendedor)"
              readonly
              hide-details
            />
          </v-flex>
          <v-flex
            xs12
            sm6
            md4
          >
            <v-text-field
              v-model="form.date"
              label="Fecha actual"
              prepend-icon="event"
              readonly
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            md4
          >
            <v-text-field
              v-model="form.invoice"
              label="Nro de Factura"
              :rules="rules.invoice"
              :disabled="processingForm"
            />
          </v-flex>
        </v-layout>
        <v-divider class="pb-3" />

        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            md6
            sm6
            xs12
          >
            <v-autocomplete
              v-model="productSelected"
              :items="detailProducts"
              :loading="loadingDetailProducts"
              :disabled="processingForm"
              :item-text="item => `${item.product.kairoProduct.name}`"
              dense
              return-object
              small-chips
              append-outer-icon="search"
              clearable
              box
              label="Productos"
              @change="onChangeProduct"
            />
          </v-flex>
        </v-layout>
        <v-divider />
        <v-data-table
          :headers="[
            { text: 'Tipo', value: '', sortable:false },
            { text: 'Producto', value: '', sortable:false },
            { text: 'accion', value: '', sortable:false },
            { text: 'Cantidad ', value: '', sortable:false },
            { text: 'P.Unitario', value: '', sortable:false },
            { text: 'P.Total', value: '', sortable:false },
            { text: 'Eliminar', value: '', sortable:false, class:['px-1'] },
          ]"
          :items="productsSelected"
          class="elevation-1"
        >
          <template
            slot="items"
            slot-scope="props"
          >
            <tr>
              <td>
                <v-edit-dialog
                  :return-value="props.item.box"
                  lazy
                  @save="save"
                  @cancel="cancel"
                >
                  {{ props.item.box }}
                  <v-autocomplete
                    slot="input"
                    v-model="props.item.box"
                    style="max-width: 120px"
                    :items="types"
                    hide-no-data
                    item-text="short_name"
                    item-value="value"
                    dense
                    small-chips
                    label="Tipo"
                    persistent-hint
                    hint="ENTER para Guardar"
                    @change="onChangeBox(props.item)"
                  />
                </v-edit-dialog>
              </td>
              <td editable>
                {{ props.item.product.kairoProduct.name }}
              </td>
              <td editable>
                {{ props.item.product.kairoDescription.name }}
              </td>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.item.lot_id"
                  lazy
                  @save="save"
                  @cancel="cancel"
                  @open="getCostProductByLots({ productId: props.item.product_id })"
                >
                  {{ props.item.detailPurchase.lot }}
                  <template v-slot:input>
                    <v-autocomplete
                      slot="input"
                      v-model="props.item.lot_id"
                      style="max-width: 120px"
                      :items="lots"
                      :loading="true"
                      hide-no-data
                      item-text="value"
                      item-value="id"
                      dense
                      small-chips
                      label="Lotes"
                      persistent-hint
                      hint="ENTER para Guardar"
                    />
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.item.quantity"
                  lazy
                  @save="save"
                  @cancel="cancel"
                >
                  {{ props.item.quantity }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="props.item.quantity"
                      label="Cantidad"
                      type="number"
                      :min="1"
                      style="max-width: 120px"
                      persistent-hint
                      hint="ENTER para Guardar"
                    />
                  </template>
                </v-edit-dialog>
              </td>
              <td>{{ props.item.price }}</td>
              <td>{{ (props.item.price * props.item.quantity).toFixed(2) }}</td>
              <td class="text-xs-center px-1">
                <v-btn
                  class="ma-0"
                  small
                  fab
                  flat
                  color="error"
                  @click="removeDetailSale(props.item)"
                >
                  <v-icon small>
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-slot:footer>
            <tr class="font-weight-bold">
              <td
                colspan="5"
                class="text-xs-right"
              >
                Total:
              </td>
              <td
                colspan="2"
                class="text-xs-center"
              >
                {{ totalOfSale }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
      <v-divider class="mb-3" />
      <div class="text-xs-center pb-3">
        <v-btn
          type="submit"
          color="success"
          :disabled="!validForm || processingForm || !productsSelected.length"
          :loading="processingForm"
        >
          Registrar Venta
        </v-btn>
      </div>
    </v-form>
    <div
      id="el"
      class="text-xs-center pb-3 "
    >
      <pre align="center">
        <h2>Boleta Nª 0001</h2>
        <h3>fecha: 11/05/2019</h3>
        <li>Producto 1   S/. 3.40</li>
        <li>Producto 1   S/. 3.40</li>
        <li>Producto 1   S/. 3.40</li>
      </pre>
      <v-btn
        type="submit"
        color="success"
        :disabled="!validForm || processingForm || !productsSelected.length"
        @click="print"
      >
        Imprimir Boleta
      </v-btn>
    </div>
    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn
        flat
        @click="snack = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {

  data () {
    return {
      cssText: ` pre {
        color: black;
      }`,
      snack: false,
      snackColor: '',
      snackText: '',
      types: [
        { value: 'unidades', short_name: 'Unid.' },
        { value: 'caja', short_name: 'Caj.' }
      ],

      lots: [
        { id: '1', value: '12345', short_name: 'lote_1' },
        { id: '2', value: '12322', short_name: 'lote_2' }
      ],

      form: {
        total: 0,
        date: new Date().toISOString().substr(0, 10),
        state: 'normal',
        invoice: '',
        user_id: ''
      },

      validForm: true,
      processingForm: false,

      productsSelected: [],
      productSelected: null,

      formErrors: {},

      rules: {
        invoice: [
          v => !!v || 'Este campo es requerido'],
        price: [
          v => !!v || 'El precio es requerida'],
        box: [
          v => !!v || 'La medida es requerida'],
        product_id: [
          v => !!v || 'Seleccione un producto']
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      detailProducts: state => state.detailProducts.detailProducts,
      loadingDetailProducts: state => state.detailProducts.loadingDetailProducts,
      costProductByLots: state => state.products.costProductByLots,
      loadingCostProductsByLots: state => state.products.loadingCostProductsByLots
    }),

    totalOfSale: function () {
      let total = 0
      this.productsSelected.forEach(item => {
        let subTotal = item.price * item.quantity
        total += subTotal
      })

      return total.toFixed(2)
    }
  },
  created () {
    this.getDetailProducts()
    this.form.user_id = this.user.id
  },

  methods: {
    ...mapActions({
      getDetailProducts: 'detailProducts/getDetailProducts',
      replaceShowModalDeleteProduct: 'products/replaceShowModalDeleteProduct',
      replaceCurrentProduct: 'products/replaceCurrentProduct',
      replaceProducts: 'products/replaceProducts',
      getCostProductByLots: 'products/getCostProductByLots',
      getDetailPurchases: 'detailPurchases/getDetailPurchases',
      saleSave: 'sales/saleSave',
      createDetailSale: 'detailSales/createDetailSale'
    }),

    removeDetailSale (item) {
      const index = this.productsSelected.indexOf(item)
      this.productsSelected.splice(index, 1)
    },

    onChangeProduct (item) {
      if (!item) return false
      this.productsSelected.push({
        quantity: 1,
        price: item.detailPurchase.cost,
        box: 'unidades',
        product_id: item.product.id,

        ...item
      })
    },
    onChangeBox (item) {
      if (!item) return false

      switch (item.box) {
        case 'unidades':
          item.price = item.detailPurchase.cost
          break
        case 'caja':
          item.price = (item.detailPurchase.cost * item.product.grouped).toFixed(2)
          break
      }
    },

    submitCreateSale () {
      if (!this.$refs.formSale.validate()) return false

      this.form.total = this.totalOfSale

      this.saleSave({ data: this.form })
        .then(response => {
          const sale_id = response.data.id
          console.log('data')
          this.productsSelected.map(product => {
            const data = {
              quantity: product.quantity,
              price: product.price,
              box: product.box,
              sale_id,
              product_id: product.product_id,
              detail_product_id: product.id
            }
            console.log('data', data)
            this.createDetailSale({ data }).then(response => {
              console.log('detail', response.data)
            })
          })
        })
    },
    save () {
      console.log('save')
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },

    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    }
  }

}
</script>
