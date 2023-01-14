import React, {useState, useEffect} from "react";

const TableOfPayment = () => {
    const [cards, setCards]=useState([]);
    useEffect(() => {
        let cards = JSON.parse(localStorage.getItem("cards"));
        setCards(cards);
    }, []);
    console.log(cards);
    return(<table className="table table-striped table-dark">
        <thead>
        <tr>
            <th scope="col">Tarjeta</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Expiracion</th>
        </tr>
        </thead>
        <tbody>
        {cards.map((card)=><tr>
            <td>{card.number}</td>
            <td>{card.name}</td>
            <td>{card.expiry}</td>
        </tr>)}
        </tbody>
    </table>);
}
export default TableOfPayment;