import axios from "axios";

export const setBalance = (payload) => (dispatch) => {
  if (payload === "clean") {
    dispatch({
      type: "SET_BALANCE",
      payload: null,
    });
  } else {
    try {
      axios.get("http://localhost:3001/balance").then((res) =>
        dispatch({
          type: "SET_BALANCE",
          payload: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const setTenMovements = (payload) => (dispatch) => {
  if (payload === "clean") {
    dispatch({
      type: "SET_TEN",
      payload: [],
    });
  } else {
    try {
      axios.get("http://localhost:3001/tenMovements").then((res) =>
        dispatch({
          type: "SET_TEN",
          payload: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const setAllMovements = (payload) => (dispatch) => {
  if (payload === "clean") {
    dispatch({
      type: "SET_ALL_MOVEMENTS",
      payload: [],
    });
  } else {
    try {
      axios.get("http://localhost:3001/allMovements").then((res) =>
        dispatch({
          type: "SET_ALL_MOVEMENTS",
          payload: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const addMovement = (movement) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/movements/create", movement)
      .then((res) => alert(res.data))
      .then(() => window.location.reload(false));
  } catch (error) {
    alert(error.request.response);
  }
};

export const deleteMovement = (id) => async (dispatch) => {
  if (window.confirm("Seguro quieres eliminar este movimiento?")) {
    try {
      await axios
        .delete(`http://localhost:3001/movements/delete/${id}`)
        .then((res) => alert(res.data))
        .then(() => window.location.reload(false));
    } catch (error) {
      alert(error.request.response);
    }
  }
};

export const editThisMovement = (movement) => async (dispatch) => {
  if (
    movement.type &&
    movement.type !== "income" &&
    movement.type !== "expense"
  ) {
    alert("No se puede cambiar el tipo de movimiento.");
  } else {
    try {
      await axios
        .put(`http://localhost:3001/movements/edit`, movement)
        .then((res) => alert(res.data))
        .then(() => window.location.reload(false));
    } catch (error) {
      alert(error.request.response);
    }
  }
};
