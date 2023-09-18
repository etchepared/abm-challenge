import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovement,
  deleteMovement,
  editThisMovement,
  setAllMovements,
} from "../../Actions";
import "./ABM.css";

export default function ABM() {
  const alphaExp = /^[a-zA-Z \u00f1\u00d1\u00C0-\u017F]+$/;
  //letras y espacios => [a-zA-Z ]
  //ñ y Ñ => \u00f1\u00d1
  //acentos \u00C0-\u017F
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const dispatch = useDispatch();
  const movements = useSelector((store) => {
    return store.allMovements;
  });

  useEffect(() => {
    dispatch(setAllMovements());
    return () => {
      dispatch(setAllMovements("clean"));
    };
  }, [dispatch]);

  const [editFlag, setEditFlag] = useState("");

  const [newMovement, setNewMovement] = useState({
    date: "",
    concept: "",
    type: "",
    amount: "",
  });

  const [editMovement, setEditMovement] = useState({
    date: "",
    concept: "",
    type: "",
    amount: "",
  });

  const [dateError, setDateError] = useState("");
  const [conceptError, setConceptError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [editDateError, setEditDateError] = useState("");
  const [editConceptError, setEditConceptError] = useState("");
  const [editTypeError, setEditTypeError] = useState("");
  const [editAmountError, setEditAmountError] = useState("");

  useEffect(() => {
    if (newMovement.date && !dateRegex.test(newMovement.date)) {
      setDateError("El campo acepta sólo fecha en formato aaaa-mm-dd.");
    } else {
      setDateError("");
    }
  }, [newMovement.date]);

  useEffect(() => {
    if (newMovement.concept && !alphaExp.test(newMovement.concept)) {
      setConceptError("Concepto acepta sólo letras.");
    } else {
      setConceptError("");
    }
  }, [newMovement.concept]);

  useEffect(() => {
    if (
      newMovement.type &&
      newMovement.type !== "income" &&
      newMovement.type !== "expense"
    ) {
      setTypeError("Tipo acepta sólo 'income'  o 'expense'.");
    } else {
      setTypeError("");
    }
  }, [newMovement.type]);

  useEffect(() => {
    if (isNaN(Number(newMovement.amount)) || newMovement.amount < 0) {
      setAmountError("Tipo acepta sólo números mayores a 0.");
    } else {
      setAmountError("");
    }
  }, [newMovement.amount]);

  useEffect(() => {
    if (editMovement.date && !dateRegex.test(editMovement.date)) {
      setEditDateError("El campo acepta sólo fecha en formato aaaa-mm-dd.");
    } else {
      setEditDateError("");
    }
  }, [editMovement.date]);

  useEffect(() => {
    if (editMovement.concept && !alphaExp.test(editMovement.concept)) {
      setEditConceptError("Concepto acepta sólo letras.");
    } else {
      setEditConceptError("");
    }
  }, [editMovement.concept]);

  useEffect(() => {
    if (isNaN(Number(editMovement.amount)) || editMovement.amount < 0) {
      setEditAmountError("Tipo acepta sólo números mayores a 0.");
    } else {
      setEditAmountError("");
    }
  }, [editMovement.amount]);

  const onDateChange = (e) => {
    setNewMovement({ ...newMovement, [e.target.id]: e.target.value });
  };

  const onConceptChange = (e) => {
    setNewMovement({ ...newMovement, [e.target.id]: e.target.value });
  };

  const onTypeChange = (e) => {
    setNewMovement({ ...newMovement, [e.target.id]: e.target.value });
  };

  const onAmountChange = (e) => {
    setNewMovement({ ...newMovement, [e.target.id]: e.target.value });
  };

  const onEditDateChange = (e) => {
    setEditMovement({ ...editMovement, [e.target.id]: e.target.value });
  };

  const onEditConceptChange = (e) => {
    setEditMovement({ ...editMovement, [e.target.id]: e.target.value });
  };

  const onEditAmountChange = (e) => {
    setEditMovement({ ...editMovement, [e.target.id]: e.target.value });
  };

  const onNewMovementClick = (e) => {
    dispatch(addMovement(newMovement));
    setNewMovement({
      date: "",
      concept: "",
      type: "",
      amount: "",
    });
  };

  const onEditMovementClick = (e) => {
    setEditMovement({
      id: e.id,
      date: e.date,
      concept: e.concept,
      type: e.type,
      amount: e.amount,
    });
    setEditFlag(e.id);
    //window.location.reload(false);
  };

  //usar esto para aceptar edit
  const onAcceptEditMovementClick = (e) => {
    dispatch(editThisMovement(editMovement));
    // window.location.reload(false);
  };

  const onCancelEditMovementClick = (e) => {
    setEditFlag(false);
    window.location.reload(false);
  };

  const onDeleteMovementClick = (e) => {
    dispatch(deleteMovement(e.target.id));
  };

  return (
    <div>
      <div>
        <h2>ABM</h2>
        <h3>Movimientos</h3>
      </div>
      <div className="tableContainer">
        <div className="table">
          <table>
            {editFlag && <h3>Editar este movimiento</h3>}
            {editFlag && (
              <tr>
                <td>
                  <strong>Fecha</strong>
                </td>
                <td>
                  <strong>Concepto</strong>
                </td>
                <td>
                  <strong>Tipo</strong>
                </td>
                <td>
                  <strong>Monto</strong>
                </td>
                <td>
                  <strong>Editar</strong>
                </td>
                <td>
                  <strong>Eliminar</strong>
                </td>
              </tr>
            )}
            {editFlag && (
              // Edit movement is here
              <tr className="input">
                <td>
                  <input
                    id="date"
                    type="date"
                    value={editMovement.date}
                    onChange={onEditDateChange}
                  />
                  {!editDateError ? null : <div>{editDateError}</div>}
                </td>
                <td>
                  <input
                    id="concept"
                    type="text"
                    value={editMovement.concept}
                    placeholder={editMovement.concept}
                    onChange={onEditConceptChange}
                  />
                  {!editConceptError ? null : <div>{editConceptError}</div>}
                </td>
                <td>{editMovement.type}</td>
                <td>
                  <input
                    id="amount"
                    type="text"
                    value={editMovement.amount}
                    placeholder="monto"
                    onChange={onEditAmountChange}
                  />
                  {!editAmountError ? null : <div>{editAmountError}</div>}
                </td>
                <td onClick={onAcceptEditMovementClick}>Aceptar</td>
                <td onClick={onCancelEditMovementClick}>Cancelar</td>
              </tr>
            )}
            <h3>Agregar movimiento</h3>
            <tr>
              <td>
                <strong>Fecha</strong>
              </td>
              <td>
                <strong>Concepto</strong>
              </td>
              <td>
                <strong>Tipo</strong>
              </td>
              <td>
                <strong>Monto</strong>
              </td>
              <td>
                <strong>Editar</strong>
              </td>
              <td>
                <strong>Eliminar</strong>
              </td>
            </tr>

            <tr className="input">
              <td>
                <input
                  id="date"
                  type="date"
                  value={newMovement.date}
                  onChange={onDateChange}
                />
                {!dateError ? null : <div>{dateError}</div>}
              </td>
              <td>
                <input
                  id="concept"
                  type="text"
                  value={newMovement.concept}
                  placeholder="Concepto"
                  onChange={onConceptChange}
                />
                {!conceptError ? null : <div>{conceptError}</div>}
              </td>
              <td>
                <input
                  id="type"
                  type="text"
                  value={newMovement.type}
                  placeholder="income / expense"
                  onChange={onTypeChange}
                />
                {!typeError ? null : <div>{typeError}</div>}
              </td>
              <td>
                <input
                  id="amount"
                  type="text"
                  value={newMovement.amount}
                  placeholder="monto"
                  onChange={onAmountChange}
                />
                {!amountError ? null : <div>{amountError}</div>}
              </td>
            </tr>
            {newMovement.date &&
              newMovement.concept &&
              newMovement.type &&
              newMovement.amount &&
              !dateError &&
              !conceptError &&
              !typeError &&
              !amountError && (
                <div>
                  <button onClick={onNewMovementClick}>
                    Agregar movimiento
                  </button>
                </div>
              )}
          </table>
        </div>

        <div className="table">
          <table>
            <tr>
              <td>
                <strong>Fecha</strong>
              </td>
              <td>
                <strong>Concepto</strong>
              </td>
              <td>
                <strong>Tipo</strong>
              </td>
              <td>
                <strong>Monto</strong>
              </td>
              <td>
                <strong>Editar</strong>
              </td>
              <td>
                <strong>Eliminar</strong>
              </td>
            </tr>
            {movements.map((am) => {
              return am.type === "income" ? (
                <tr key={am.id} className="greenRow">
                  <td>{am.date}</td>
                  <td>{am.concept}</td>
                  <td>{am.type}</td>
                  <td>$ {am.amount}</td>
                  <td id={am.id} onClick={() => onEditMovementClick(am)}>
                    Editar
                  </td>
                  <td id={am.id} onClick={onDeleteMovementClick}>
                    Eliminar
                  </td>
                </tr>
              ) : (
                <tr key={am.id} className="redRow">
                  <td>{am.date}</td>
                  <td>{am.concept}</td>
                  <td>{am.type}</td>
                  <td>$ {am.amount}</td>
                  <td id={am.id} onClick={() => onEditMovementClick(am)}>
                    Editar
                  </td>
                  <td id={am.id} onClick={onDeleteMovementClick}>
                    Eliminar
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
