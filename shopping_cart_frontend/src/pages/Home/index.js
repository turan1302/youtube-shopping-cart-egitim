import React, {Component} from 'react'
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import App from "../../App";
import cartWrapper from "../../cartWrapper";
import Notification from "../../RestAPI/Notification";

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading : true,
            products : []
        }
    }

    componentDidMount() {
        this.getProducts();
    }


    getProducts = ()=>{
        RestClient.getRequest(AppUrl.home).then((res)=>{
            const result = res.data;
            const status = res.status;

            if (status===200){
                this.setState({
                    isLoading : false,
                    products : result.data
                })
            }

        }).catch((err)=>{
            console.log(err);
            Notification.error({
                text : "Bir Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz"
            })
        })
    }

    addQuantity = (id,value)=>{
        const {products} = this.state;

        let newProducts = products.map((item,index)=>{
           return (item.prd_id===id) ? {...item,addQuantity : parseInt(value)} : item
        });

        this.setState({
            products : newProducts
        })
    }

    addCart = (id)=>{
        const {products} = this.state;
        const {cart} = this.props;

        let newProducts = products.map((item,index)=>{
           if (item.prd_id===id){
               cart.addItem({
                   id : item.prd_id,
                   name : item.prd_name,
                   price : item.prd_price
               },item.addQuantity);

               delete item.addQuantity;
           }

           return item;
        });

        this.setState({
            products : newProducts
        })
    }

    productRender = (products)=>{
        const {cart} = this.props;

        return products.map((item,index)=>{
            return (
                <Col key={index} md={4} className={"mt-5"}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{item.prd_name}</Card.Title>
                            <Card.Text>
                                Fiyat: {item.prd_price} ₺
                            </Card.Text>
                            <input className={"form-control"} value={(item.addQuantity) ? item.addQuantity : ''} onChange={(event)=>this.addQuantity(item.prd_id,event.target.value)} type={"number"}/>
                            <Button className={"mt-3"} onClick={()=>this.addCart(item.prd_id)} variant="success">Sepete Ekle</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });
    }

    render() {
        const {isLoading,products} = this.state;

        if (isLoading){
            return (
                <div className={"d-flex justify-content-center align-items-center vh-100"}>
                    Yükleniyor...
                </div>
            )
        }

        return (
            <>
                <Header/>

                <Container className={"mt-5"}>
                    <h3 className={"d-flex justify-content-center align-self-center"}>- Ürün Listesi -</h3>
                    <Row className={"mt-5"}>
                        {(products.length===0) ? (<div className={"col-md-12 alert alert-danger text-center"}>Herhangi bir ürün bulunamadı</div>) : this.productRender(products)}
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(cartWrapper(Home));
