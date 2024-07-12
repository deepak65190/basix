import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "./table.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function Table() {
  const [list, setList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  // Fetch data function
  const getData = () => {
    axios
      .get("https://basix-3.onrender.com/todo")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log("Something went wrong while fetching data.");
      });
  };

  // Delete item function
  const handleDelete = (id) => {
    axios
      .delete(`https://basix-3.onrender.com/todo/del/${id}`)
      .then((res) => {
        toast({
          title: "Data deleted successfully",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getData(); 
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  // Open modal for editing an item
  const handleOpen = (data) => {
    setSelectedItemId(data._id);
    setName(data.name);
    setEmail(data.email);
    setRollNum(data.rollNum);
  };

  // Edit item function
  const handleEdit = (e) => {
    e.preventDefault(); 
    const data = { name, email, rollNum };
    axios
      .patch(`https://basix-3.onrender.com/todo/edit/${selectedItemId}`, data)
      .then((res) => {
        toast({
          title: `Data updated successfully`,
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        getData(); 
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  // Modal state management
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setSelectedItemId(null); // Clear selected item ID
  };
  const onOpen = () => setIsOpen(true);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {list.length>0?
      
      <table>
        <tbody>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {list.length > 0 &&
            list.map((ele, index) => (
              <tr key={ele._id}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.rollNum}</td>
                <td>{ele.email}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleOpen(ele);
                      onOpen();
                    }}
                    height={5}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(ele._id)}
                    height={5}
                    colorScheme="red"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
:null}
      {/* Modal for editing */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                required
                autoFocus
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                required
                value={rollNum}
                placeholder="Enter Roll Num"
                onChange={(e) => setRollNum(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Email Id"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                style={{
                  width: "90%",
                  backgroundColor: "teal",
                  color: "white",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Table;
