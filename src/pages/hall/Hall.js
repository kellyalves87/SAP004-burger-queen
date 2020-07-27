import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import line from "../../assets/line.svg";

const Hall = () => {
  const [category, setCategory] = useState("Café da Manhã");
  const [customer, setCustomer] = useState("");
  const [table, setTable] = useState("");
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);

  useEffect(() => {
    firebase.firestore
      .collection("products")
      .get()
      .then((snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBreakfastItems(
          allProducts.filter((doc) => doc.Category === "breakfast")
        );
        setLunchItems(allProducts.filter((doc) => doc.Category === "brunch"));
      });
  }, []);

  return (
    <div>
      <Link to='/login'>
        <figure>
          <Image src={logo} alt='logo' class='logo' />
        </figure>
        <h1 className='h1'>BURGER QUEEN</h1>
        <figure>
          <Image src={line} alt='line' class='line' />
        </figure>
        <Button
            className="breakfast"
            handleClick={(e) => {
              setCategory('Café da Manhã');
              e.preventDefault()
            }}
            title={'Café da Manhã'}
          />
        <Button name='Exit' onClick={() => firebase.auth().signOut()} />
      </Link>
    </div>
  );
};

export default Hall;
