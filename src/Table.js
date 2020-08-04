import React from 'react';
import './Table.css';

const Table = ({ countries }) => {
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <tr key={country}>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
};

export default Table;
