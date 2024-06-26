import React, {Component} from 'react'
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import cartWrapper from "../../cartWrapper";
import Notification from "../../RestAPI/Notification";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import parse from 'html-react-parser';
import {Helmet} from "react-helmet";
import {CircleSpinner} from "react-spinners-kit";

export class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading : true,
            paymentForm  : ''
        }
    }

    componentDidMount() {
        const { navigate,cart } = this.props;
        const {totalUniqueItems} = cart;

        if (totalUniqueItems===0){
            Notification.error({
                text : "Sepetinizde Ürün Yok !!!"
            })
            navigate("/");
        }else{
            this.getPaymentForm();
        }
    }


    getPaymentForm = ()=>{
        const {cart,navigate} = this.props;
        const {items,cartTotal} = cart;

        RestClient.postRequest(AppUrl.payment,{
            basket : items,
            totalPrice : cartTotal
        }).then((res)=>{
            const status = res.status;
            const result = res.data;

            if (status===200){
                this.setState({
                    isLoading : false,
                    paymentForm : result.view
                })
            }else{
                Notification.error(result);
                navigate("/");
            }
        }).catch((err)=>{
            console.log(err);
            Notification.error({
                text : "Bir hata oluştu. Lütfen Daha Sonra Tekrar Deneyiniz"
            })
        })
    }

    render() {
        const {isLoading,paymentForm} = this.state;

        if (isLoading){
            return (
                <div className={"d-flex justify-content-center align-content-center vh-100"}>
                    <CircleSpinner size={30} color="#686769" loading={isLoading} />
                </div>
            )
        }

        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Ödeme - mCart</title>
                </Helmet>

                <Header/>

                {(paymentForm!=='') ? (
                    parse(paymentForm)
                ) : (
                    <div className={"d-flex justify-content-center align-content-center vh-100"}>
                        Ödeme formu getiriliemedi
                    </div>
                )}
            </>
        )
    }
}

export default withRouter(cartWrapper(Payment));
