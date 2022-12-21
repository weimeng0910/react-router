import React from 'react';
import { nanoid } from 'nanoid';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '@/data/data';

const Invoices: React.FC = () => {
  let invoicesData = getInvoices();
  //获取url中的参数
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: '1px solid', padding: '1rem' }}>
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            let value = event.target.value;
            value ? setSearchParams({ filter: value }) : setSearchParams({});
          }}
        />
        {invoicesData
          .filter(invoice => {
            let filter = searchParams.get('filter');
            if (!filter) {
              return true;
            }
            let name = invoice.name.toLowerCase();
            return name.includes(filter.toLowerCase());
          })
          .map(invoice => {
            return (
              <NavLink
                to={`/invoices/${invoice.number}`}
                key={nanoid()}
                style={({ isActive }) => {
                  return {
                    display: 'block',
                    margin: '1rem 0',
                    color: isActive ? 'red' : '',
                  };
                }}
              >
                {invoice.name}
              </NavLink>
            );
          })}
      </nav>
      <Outlet />
    </div>
  );
};

export default Invoices;
