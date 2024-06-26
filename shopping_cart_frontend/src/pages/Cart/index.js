import React, { Component } from 'react'
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import {Badge, Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import cartWrapper from "../../cartWrapper";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const KDV = 20;
export class Cart extends Component {

  constructor(props) {
    super(props);
  }

  cartRender = (items)=>{
    const {cart} = this.props;
    const {updateItemQuantity,removeItem} = cart;

    return items.map((item,index)=>{
      return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price} ₺</td>
            <td>{item.quantity * item.price} ₺</td>
            <td>
                <Button variant={"success"} className={"mx-2"} onClick={()=>updateItemQuantity(item.id,item.quantity+1)}>1 Artır</Button>
                <Button variant={"danger"} className={"mx-2"} onClick={()=>updateItemQuantity(item.id,item.quantity-1)}>1 Azalt</Button>
            </td>
            <td>
              <Button variant={"danger"} className={"mx-2"} onClick={()=>removeItem(item.id)}>Kaldır</Button>
            </td>
          </tr>
      )
    });
  }

  render() {
    const {cart} = this.props;
    const {items,totalUniqueItems,cartTotal} = cart;

    return (
      <>
          <Helmet>
              <meta charSet="utf-8" />
              <title>Sepet - mCart</title>
          </Helmet>

      <Header/>

        <Container className={"mt-5"}>
          <h3 className={"mt-5 d-flex justify-content-center"}>- Sepetim -</h3>
          <Row className={"mt-5"}>
            <Col md={12}>
              <Table striped bordered hover>
                <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Ürün Adet</th>
                  <th>Ürün Fiyat</th>
                  <th>Ürün Toplam Fiyat</th>
                  <th>Adet İşlem</th>
                  <th>Silme İşlem</th>
                </tr>
                </thead>
                <tbody>
                {(totalUniqueItems==0) ? (<tr>
                  <td colSpan={12}>
                    <div className={"col-md-12 alert alert-danger text-center"}>
                      Herhangi bir ürün bulunamadı
                    </div>
                  </td>
                </tr>) : this.cartRender(items)}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>


        {(totalUniqueItems!==0) && (
            <Container className={"mt-5"}>
              <Row className={"mt-5"}>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                       Ara Toplam: <Badge className={"text-white p-2 ml-1 bg-success"}>{cartTotal} ₺</Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        KDV: <Badge className={"text-white p-2 ml-1 bg-danger"}>{KDV} %</Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        Toplam Fiyat: <Badge className={"text-white p-2 ml-1 bg-success"}>{cartTotal*((100+KDV)/100)} ₺</Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Button as={Link} to={"/payment"} variant={"success mt-3"}>Ödeme Yap</Button>
            </Container>
        )}
      </>
    )
  }
}

export default withRouter(cartWrapper(Cart))
