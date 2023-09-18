import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { setBalance, setTenMovements } from "../../Actions/index.js";
// styles
import "./home.css";

const Home = () => {
  const balance = useSelector((store) => {
    return store.balance;
  });

  const tenMovements = useSelector((store) => {
    return store.tenMovements;
  });

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBalance());
    dispatch(setTenMovements());
    return () => {
      dispatch(setBalance("clean"));
      dispatch(setTenMovements("clean"));
    };
  }, [dispatch]);

  return (
    <div>
      <div>
        <h3>Home</h3>
      </div>
      <h2>Balance actual ${balance}</h2>
      <h3>Movimientos</h3>
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
          </tr>
          {tenMovements.map((tm) => {
            return tm.type === "income" ? (
              <tr key={tm.id} className="greenRow">
                <td>{tm.date}</td>
                <td>{tm.concept}</td>
                <td>{tm.type}</td>
                <td>$ {tm.amount}</td>
              </tr>
            ) : (
              <tr key={tm.id} className="redRow">
                <td>{tm.date}</td>
                <td>{tm.concept}</td>
                <td>{tm.type}</td>
                <td>$ {tm.amount}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Home;
