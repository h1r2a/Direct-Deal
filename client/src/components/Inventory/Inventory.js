import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaProductHunt } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import 'react-tabs/style/react-tabs.css';
import './inventory.css';
import Product from './Product';
import Category from './Category';

const Inventory = () => {
  return (
    <div className="inventory">
      <Tabs>
        <TabList>
          <Tab> <FaProductHunt className='tab-icon' /> </Tab>
          <Tab> <TbCategoryFilled className='tab-icon' /></Tab>
        </TabList>



        <TabPanel >
          <Product />
        </TabPanel>
        <TabPanel>
          <Category/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Inventory;
