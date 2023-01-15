import React from "react";

const TableOfPayment = ({cards}) => {
    return(<table className="table table-striped table-dark">
        <thead>
        <tr>
            <th scope="col">Tarjeta</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Expiracion</th>
        </tr>
        </thead>
        <tbody>
        {cards.map((card,i)=><tr key={i}>
            <td>{"**** **** **** "+ card.number.substring(card.number.length-4)}</td>
            <td>{card.name}</td>
            <td>{card.expiry}</td>
        </tr>)}
        </tbody>
    </table>);
}
export default TableOfPayment;