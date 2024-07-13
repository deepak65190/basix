import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "./form.module.css";
import Table from "./Table";
export default function Form() {
  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [email, setEmail] = useState("");
  const [count ,setCount]=useState(0)
  const toast = useToast();

  const handleForm = (event) => {
    event.preventDefault();
    const data = {
      name,
      rollNum,
      email,
    };

    axios
      .post("https://basix-3.onrender.com/todo", data)
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Data posted successfully",
            position: "top-right",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        setCount((prev)=>prev+1)
          setName("");
          setRollNum("");
          setEmail("");
        }
        // window.location.reload()
      })
      .catch((err) => {
        console.error("Error posting data:", err);
        toast({
          title: "Something went wrong",
          position: "top-right",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
    <div>
      <section>
        <form onSubmit={handleForm}>
          <h1>Student Form</h1>
          <input
            type="text"
            value={name}
            required
            autoFocus
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={rollNum}
            required
            placeholder="Enter Roll Number"
            onChange={(e) => setRollNum(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter Email Id"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              width: "90%",
              backgroundColor: "teal",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            type="submit"
          />
        </form>
      </section>
    </div>
    <Table count={count}/>
   </>
  );
}
