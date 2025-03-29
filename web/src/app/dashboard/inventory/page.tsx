import AddSellProducts from '@/components/AddProducts/AddSellProducts'
import InventoryView from '@/views/Dashboard/inventory/InventoryView'
import React from 'react'

const Inventory = () => {
  return (
    <div>
      {/* <InventoryView/> */}
      <AddSellProducts type="sell"/>
    </div>
  )
}

export default Inventory
