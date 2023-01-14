import React, {useState} from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TableOfPayment from "./TableOfPayment";

const PaymentForm = () => {

    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '--/--',
        cvc: '',
        focused: '',
    })

    const handleInputChanges = (e) => {
        const {name, value} = e.target;
        if (["number","cvc"].includes(name) && (name ==="number" ? value.length <= 16 : name==="cvc" ? value.length <= 3 : value.length <= 16) ) {
            setState({
                ...state,
                [name]: value
        })
        }
        else if (["name","expiry"].includes(name)) {
            setState({
                ...state,
                [name]: value
            })
        }
    }

    const onChangeExpiry = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        if (name === "month") {
            const year = state.expiry.split("/")[1];
            setState({
                ...state,
                expiry: `${value}/${year}`
            })
        }
        if (name === "year") {
            const month = state.expiry.split("/")[0];
            setState({
                ...state,
                expiry: `${month}/${value}`
            })
        }
    }

    const handleFocusChange = (e) => {
        setState({
            ...state,
            focused: e.target.name
        })
    }

    console.log(state.expiry);

    const processPayment = (e) => {
        e.preventDefault();
        console.log("number => ", state.number);
        console.log("name => ", state.name);
        console.log("expiry => ", state.expiry);
        console.log("cvc => ", state.cvc);
        console.log(JSON.stringify(state));
        //Nombre >= 2 por que el nombre minimo requerido por algunas entidades bancarias es 2 caracteres
        if (state.number.length === 16 &&  state.name.length >= 2 && state.cvc.length === 3 && !state.expiry.includes("--")) {
            const {focused, cvc,...data} = state;
            let cards = JSON.parse(localStorage.getItem("cards"));
            console.log(cards);
            if (cards === null) {
                localStorage.setItem("cards", JSON.stringify([data]));
                alert("Tarjeta guardada con exito");
                setState({
                    number: '',
                    name: '',
                    expiry: '--/--',
                    cvc: '',
                    focused: '',
                })
                return;
            }
            localStorage.setItem("cards", JSON.stringify([...cards,data]));
            alert("Tarjeta guardada con exito");
        }
        else {
            alert("Datos incorrectos");
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <Cards
                    number={state.number}
                    name={state.name}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    focused={state.focused}
                />

                <form onSubmit={processPayment}>
                    <div className="form-group">
                        <label htmlFor="number">Numero</label>
                        <input
                            type="number"
                            name="number"
                            value = {state.number}
                            id="number"
                            className="form-control"
                            onChange={handleInputChanges}
                            onFocus={handleFocusChange}
                            //Expresion regular que solo permite numeros
                            onKeyPress={event => {
                                const key = event.keyCode || event.which;
                                const keyValue = String.fromCharCode(key);
                                if(!/[0-9]/.test(keyValue)){
                                    event.preventDefault();
                                }
                            }}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            maxLength="30"
                            className="form-control"
                            onChange={handleInputChanges}
                            onFocus={handleFocusChange}
                        />
                    </div>

                    <div className="form-row g-2">
                        <div className="from-group col-sm-6">
                            <label htmlFor="expity">Fecha de expiracion</label>
                            <div className="form-group">
                                <label htmlFor="month">Mes</label>
                                <select className="form-control" id="month"  name="month" onChange={onChangeExpiry} onFocus={handleFocusChange}>
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                    <option value="03">Marzo</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Mayo</option>
                                    <option value="06">Junio</option>
                                    <option value="07">Julio</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Año</label>
                                <select className="form-control" id="year" name="year"onChange={onChangeExpiry} onFocus={handleFocusChange}>
                                    <option value="22">2022</option>
                                    <option value="23">2023</option>
                                    <option value="24">2024</option>
                                    <option value="25">2025</option>
                                    <option value="26">2026</option>
                                    <option value="27">2027</option>
                                    <option value="28">2028</option>
                                    <option value="29">2029</option>
                                    <option value="30">2030</option>
                                    <option value="31">2031</option>
                                    <option value="32">2032</option>
                                    <option value="33">2033</option>
                                    <option value="34">2034</option>
                                    <option value="35">2035</option>
                                </select>
                            </div>
                        </div>
                        <div className="from-group col-sm">
                            <label htmlFor="cvc">CVC</label>
                            <input
                                type="number"
                                name="cvc"
                                value={state.cvc}
                                id="cvc"
                                className="form-control"
                                onChange={handleInputChanges}
                                onFocus={handleFocusChange}
                                onKeyPress={event => {
                                    const key = event.keyCode || event.which;
                                    const keyValue = String.fromCharCode(key);
                                    if(!/[0-9]/.test(keyValue)){
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block btn-lg mt-3">Guardar</button>
                </form>
            </div>
            <TableOfPayment/>
        </div>
    )

}

export default PaymentForm;
