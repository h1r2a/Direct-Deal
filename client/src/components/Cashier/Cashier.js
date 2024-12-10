import React from 'react'
import { FaCashRegister, FaMoneyBillWave, FaMoneyCheck } from 'react-icons/fa'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import "./cashier.css"
import Product from '../Inventory/Product'
import Catalog from './Catalog'

const Cashier = () => {
  return (
    <div className='cashier'>
      <Tabs>
        <TabList>
          <Tab> <FaMoneyCheck className='tab-icon'/></Tab>
          <Tab> <FaMoneyBillWave  className='tab-icon'/></Tab>
        </TabList>




        <TabPanel >
          <Catalog />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Cashier
