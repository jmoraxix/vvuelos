import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ValidarTarjetaDataService from '../services/validarTarjeta.service';
import { Badge } from 'reactstrap';

const PaymentForm = (monto) => {

    const [state, setState] = useState({
        Num_Tarjeta: '',
        Nombre: '',
        CVV: '',
        Mes_Exp: '',
        Ano_Exp: '',
        expiry: '',
        focus: '',
        Monto: 510,
        Tipo: "V",
        resultado: ''
    })

    const handleFocus = (e) => {
        setState({ 
            ...state,
            focus: e.target.name 
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ 
            ...state,
            [name]: value 
        });

        // if(name == 'Mes_Exp'){
        //   setState({
        //     ...state,
        //     expiry: value + '' + state.Ano_Exp
        //   });
        // } else if(name == 'Ano_Exp'){
        //   setState({
        //     ...state,
        //     expiry: state.Mes_Exp + '' + value
        //   });
        // }
    }

    const submitPayment = () => {
      const tarjeta = {
        Num_Tarjeta: state.Num_Tarjeta,
        Mes_Exp: state.Mes_Exp,
        Ano_Exp: state.Ano_Exp,
        CVV: state.CVV,
        Tipo: state.Tipo,
        Monto: state.Monto
      }
        console.log("Tarjeta a validar => ", tarjeta)

      ValidarTarjetaDataService.create(tarjeta)
        .then(response => {
          this.setState({
            resultado: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    return (
        <div className="card" >
            <div className="card-body">
                <Cards
                    cvc={state.CVV}
                    expiry={state.expiry}
                    focused={state.focus}
                    name={state.Nombre}
                    number={state.Num_Tarjeta}
                />
                <form>
                    <div className="form-group">
                        <label htmlFor="Num_Tarjeta">Número de la tarjeta</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Num_Tarjeta"
                            maxLength="16"
                            placeholder="Número de tarjeta"
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Nombre"
                            maxLength="30"
                            placeholder="Nombre"
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="Mes_Exp">Vencimiento</label>
                          <input
                              type="text"
                              className="form-control"
                              name="Mes_Exp"
                              maxLength="2"
                              placeholder="Mes"
                              onChange={handleChange}
                              onFocus={handleFocus}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="Ano_Exp"></label>
                          <input
                              type="text"
                              className="form-control"
                              name="Ano_Exp"
                              maxLength="4"
                              placeholder="A&ntilde;o"
                              onChange={handleChange}
                              onFocus={handleFocus}
                          />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="CVV">CVC</label>
                            <input
                                type="text"
                                className="form-control"
                                name="CVV"
                                maxLength="4"
                                placeholder="CVC"
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                    </div>
                  <button
                      type="button"
                      className="btn btn-success btn-block btn-lg"
                      onClick={submitPayment}
                  >Pagar</button>
                  {/*TODO validar colores success/error */}
                  <Badge color="success" pill>{state.resultado}</Badge>
                </form>
            </div>
        </div>
    );
}

export default PaymentForm;