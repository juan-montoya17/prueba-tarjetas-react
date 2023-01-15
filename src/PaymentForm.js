import React, {useEffect, useState} from "react";
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
    const [cardPosition, setCardPosition] = useState({
        number1: "",
        number2: "",
        number3: "",
        number4: ""
    });
    const [cards, setCards]=useState([]);


    useEffect(() => {
        let cards = JSON.parse(localStorage.getItem("cards"));
        setCards(cards);
    }, []);

    const handleInputCard = () => {
        setState({...state,number: cardPosition.number1 + cardPosition.number2 + cardPosition.number3 + cardPosition.number4});
    }

    useEffect(() => {
        handleInputCard();
    }, [cardPosition]);

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


    const processPayment = (e) => {
        e.preventDefault();
        //Nombre >= 2 por que el nombre minimo requerido por algunas entidades bancarias es 2 caracteres
        if (state.number.length === 16 &&  state.name.length >= 2 && state.cvc.length === 3 && !state.expiry.includes("--")) {
            const {focused, cvc,...data} = state;
            let cards = JSON.parse(localStorage.getItem("cards"));
            if (cards === null) {
                localStorage.setItem("cards", JSON.stringify([data]));
                setState({
                    number: '',
                    name: '',
                    expiry: '--/--',
                    cvc: '',
                    focused: '',
                });
                setCardPosition({
                    number1: "",
                    number2: "",
                    number3: "",
                    number4: ""
                });
                setCards([...cards , data]);
                alert("Tarjeta guardada con exito");
                return;
            }
            setState({
                number: '',
                name: '',
                expiry: '--/--',
                cvc: '',
                focused: '',

            })
            setCardPosition({
                number1: "",
                number2: "",
                number3: "",
                number4: ""
            });
            setCards([...cards , data]);
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
                    <div className="form-group mt-3">
                        <label htmlFor="number">Numero</label>
                        <div className="d-flex flex-row">
                        <input
                            type="number"
                            name="number"
                            value = {cardPosition.number1}
                            id="input1"
                            className="form-control w-25 mr-3"
                            onChange={(e)=>cardPosition.number2.length > 0 || cardPosition.number1.length > 4? document.getElementById("input2").focus():cardPosition.number1.length === 4? setCardPosition({...cardPosition, number2: e.target.value.slice(4,5)}) : setCardPosition({...cardPosition, number1: e.target.value})}
                            onFocus={handleFocusChange}
                            //Expresion regular que solo permite numeros
                            onKeyPress={event => {
                                const key = event.keyCode || event.which;
                                const keyValue = String.fromCharCode(key);
                                if(!/[0-9]/.test(keyValue)){
                                    event.preventDefault();
                                }
                            }}
                            onKeyUp={event => {
                                if(event.key === "Backspace" && cardPosition.number1.length === 4){
                                    console.log("entros")
                                    setCardPosition({...cardPosition, number1: cardPosition.number1.slice(0, -1)})
                                    return
                                }
                                if (event.target.value.length >= 4) {
                                    document.getElementById("input2").focus();
                                }}
                            }

                        />
                        <input
                            type="number"
                            name="number"
                            value = {cardPosition.number2}
                            id="input2"
                            className="form-control w-25 mr-3"
                            onChange={(e)=>cardPosition.number3.length > 0 || cardPosition.number2.length > 4? document.getElementById("input3").focus():cardPosition.number2.length === 4? setCardPosition({...cardPosition, number3: e.target.value.slice(4,5)}) : setCardPosition({...cardPosition, number2: e.target.value})}
                            onFocus={handleFocusChange}
                            //Expresion regular que solo permite numeros
                            onKeyPress={event => {
                                const key = event.keyCode || event.which;
                                const keyValue = String.fromCharCode(key);
                                if(!/[0-9]/.test(keyValue)){
                                    event.preventDefault();
                                }
                            }}
                            onKeyUp={event => {
                                if(event.key === "Backspace" && cardPosition.number2.length === 4){
                                    console.log("entros")
                                    setCardPosition({...cardPosition, number2: cardPosition.number2.slice(0, -1)})
                                    return
                                }
                                if(event.key === "Backspace" && cardPosition.number2.length === 0){
                                    document.getElementById("input1").focus();
                                    return
                                }
                                if (event.target.value.length >= 4) {
                                    document.getElementById("input3").focus();
                                }}
                            }

                        />
                        <input
                            type="number"
                            name="number"
                            value = {cardPosition.number3}
                            id="input3"
                            className="form-control w-25 mr-3"
                            onChange={(e)=>cardPosition.number4.length > 0 || cardPosition.number3.length > 4? document.getElementById("input4").focus():cardPosition.number3.length === 4? setCardPosition({...cardPosition, number4: e.target.value.slice(4,5)}) : setCardPosition({...cardPosition, number3: e.target.value})}
                            onFocus={handleFocusChange}
                            //Expresion regular que solo permite numeros
                            onKeyPress={event => {
                                const key = event.keyCode || event.which;
                                const keyValue = String.fromCharCode(key);
                                if(!/[0-9]/.test(keyValue)){
                                    event.preventDefault();
                                }
                            }}
                            onKeyUp={event => {
                                if(event.key === "Backspace" && cardPosition.number3.length === 4){
                                    console.log("entros")
                                    setCardPosition({...cardPosition, number3: cardPosition.number3.slice(0, -1)})
                                    return
                                }
                                if(event.key === "Backspace" && cardPosition.number3.length === 0){
                                    document.getElementById("input2").focus();
                                    return
                                }
                                if (event.target.value.length >= 4) {
                                    document.getElementById("input4").focus();
                                }}
                            }

                        />
                        <input
                            type="number"
                            name="number"
                            value = {cardPosition.number4}
                            id="input4"
                            className="form-control w-25"
                            onChange={(e)=>cardPosition.number4.length >3?null:setCardPosition({...cardPosition, number4: e.target.value})}
                            onFocus={handleFocusChange}
                            //Expresion regular que solo permite numeros
                            onKeyPress={event => {
                                const key = event.keyCode || event.which;
                                const keyValue = String.fromCharCode(key);
                                if(!/[0-9]/.test(keyValue)){
                                    event.preventDefault();
                                }
                            }}
                            onKeyUp={event => {
                                if(event.key === "Backspace" && cardPosition.number4.length === 4){
                                    setCardPosition({...cardPosition, number4: cardPosition.number4.slice(0, -1)})
                                }
                                if(event.key === "Backspace" && cardPosition.number4.length === 0){
                                    document.getElementById("input3").focus();
                                }
                            }
                            }

                        />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            maxLength="30"
                            value = {state.name}
                            className="form-control"
                            onChange={handleInputChanges}
                            onFocus={handleFocusChange}
                        />
                    </div>

                    <div className="g-2">
                        <div className="from-group">
                            <label htmlFor="expity">Fecha de expiracion</label>
                            <div className="d-flex flex-row">
                            <div className="form-group w-50 mr-4">
                                <select className="form-control" value={state.expiry.substring(0,2)} id="month"  name="month" onChange={onChangeExpiry} onFocus={handleFocusChange}>
                                    <option value="--" disabled selected>Mes</option>
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
                            <div className="form-group w-50">
                                <select className="form-control" id="year" value={state.expiry.split("/")[1]} name="year"onChange={onChangeExpiry} onFocus={handleFocusChange}>
                                    <option value="--" disabled selected>Año</option>
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
                        </div>
                        <div className="from-group">
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
            <TableOfPayment cards={cards}/>
        </div>
    )

}

export default PaymentForm;
