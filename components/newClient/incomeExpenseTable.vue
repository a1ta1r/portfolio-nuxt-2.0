<template>
  <el-table
    :data="currentIncomes"
    class="myFavoriteTable table table-bordered"
  >
    <el-table-column
      label="Сумма"
      prop="amount"
      sortable/>
    <el-table-column
      label="Источник"
      prop="reason"
      sortable/>
    <el-table-column
      label="Периоды"
      prop="paymentPeriod"
      sortable/>
    <el-table-column
      :formatter="dateFormatter"
      label="Дата начала"
      prop="startDate"
      sortable/>
    <el-table-column
      label="Операции">
      <template slot-scope="scope">
        <el-dialog
          :visible.sync="editable"
          title="Изменения сохраняются автоматически">
          <income-expense-edit-dialog :current-income="currentEditableIncome"/>
        </el-dialog>
        <el-button-group>
          <el-button
            size="small"
            class="el-icon-edit"
            round
            @click="editRow(scope)"/>
          <el-popover
            ref="popover"
            v-model="scope.row.show_del"
            trigger="click"
            placement="top">
            <p align="left">Удалить {{ scope.row.reason }}?</p>
            <div style="text-align: center">
              <el-button
                size="mini"
                type="text"
                @click="scope.row.show_del = false">Не надо</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="removeItem(scope)">Да
              </el-button>
            </div>
          </el-popover>
          <el-button
            v-popover:popover
            size="small"
            plain
            type="danger"
            class="el-icon-delete"
            round
            @click="scope.row.show_del = true"/>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import IncomeExpenseEditDialog from './IncomeExpenseEditDialog'

export default {
  name: 'IncomeExpenseTable',
  components: { IncomeExpenseEditDialog },
  props: {
    currentIncomes: {
      type: Array,
      default: () => {
        return [
          {
            isIncome: true,
            amount: 1000,
            reason: '',
            paymentPeriod: '',
            frequency: '',
            startDate: new Date(Date.now()),
            isRepeatable: false
          }
        ]
      }
    }
  },
  data() {
    return {
      editable: false,
      currentEditableIncome: {}
    }
  },
  methods: {
    dateFormatter(cellValue) {
      return cellValue.startDate.toLocaleDateString('ru')
    },
    removeItem(item) {
      // TODO mutations and actions
      let index = this.currentIncomes.indexOf(item.row)
      console.log('index ' + index)
      this.currentIncomes.splice(index, 1)
    },
    editRow(scope) {
      this.editable = true
      this.currentEditableIncome = scope.row
    }
  }
}
</script>

<style scoped>
</style>
