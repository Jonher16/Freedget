import React, { useState } from "react";
import "../App.scss";
import Option from "../components/Option";
import { Container, Row, Col, Button } from "react-bootstrap";
import {GiDeliveryDrone, GiMoneyStack} from "react-icons/gi"
import {BsFillPieChartFill} from "react-icons/bs"


const options = [
  {
    title: "Expense List",
    image: <GiMoneyStack className="option_icon" />,
  },
  {
    title: "Categorization",
    image: <BsFillPieChartFill className="option_icon" />,
  },
];

export default function Panel({onClick}) {
  
  return (
    <>
      <div className="main">
            <Container className="container" fluid>
              <Row>
                {options.map((option) => (
                  <Col
                    className="d-flex justify-content-center w-3"
                    xs="12"
                    lg="6"
                    md="6"
                    style={{ padding: "1rem" }}
                  >
                    <Option
                      title={option.title}
                      image={option.image}
                      onClick={e=>onClick(e, option.title)}
                    />
                  </Col>
                ))}
                
              </Row>
            </Container>
        </div>
    </>
  );
}
