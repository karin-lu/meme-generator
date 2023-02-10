import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Here the meme card is created
export default function Meme (props) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem', margin: "25px" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Button onClick={(e) => navigate(`/editor?url=${props.img}`)} variant="primary"> Create </Button>
        </Card.Body>
    </Card>
  );
};