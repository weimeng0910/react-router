import React from 'react';
import { nanoid } from 'nanoid';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '@/data/data';

const Invoices: React.FC = () => {
  let invoicesData = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: '1px solid', padding: '1rem' }}>
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoicesData.map(invoice => {
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
