import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Headers from "./app/components/layout/header/Headers.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./app/components/layout/footer/Footer.js";
import Home from "./app/components/Home/Home.js";
import Login from "./app/components/User/Login";
import ProductDetails from "./app/components/Product/ProductDetails.js";
import Products from "./app/components/Product/Products.js";
import React, { Profiler, useState } from "react";
import Search from "./app/components/SearchProducts/Search";
import store from "./store";
import { loadUser } from "./redux/actions/userAction";
import UserOption from "./app/components/layout/UserOption/UserOption.js";
import { useSelector, useDispatch } from "react-redux";
import profile from "./app/components/User/Profiler.js";
import ProtectedRoute from "./app/components/Route/ProtectedRoute";
import UpdateProfile from "./app/components/User/UpdateProfile.js";
import UpdatePassword from "./app/components/User/UpdatePassword.js";
import ForgotPassword from "./app/components/User/ForgotPassword.js";
import ResetPassword from "./app/components/User/ResetPassword.js";
import Cart from "./app/components/cart/Cart.js";
import ShippingInfo from "./app/components/cart/ShippingInfo.js";
import ConfirmOrder from "./app/components/cart/ConfirmOrder.js";
import Payment from "./app/components/cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./app/components/cart/OrderSuccess.js";
import MyOrders from "./app/components/Order/MyOrders.js";
import OrderDetails from "./app/components/Order/OrderDetails.js";
import Dashboard from "./app/components/admin/Dashboard.js";
import ProductList from "./app/components/admin/ProductList.js";
import NewProduct from "./app/components/admin/NewProduct";
import UpdateProduct from "./app/components/admin/UpdateProduct.js";
import OrderList from "./app/components/admin/OrderList.js";
import ProcessOrder from "./app/components/admin/ProcessOrder.js";
import UsersList from "./app/components/admin/UsersList.js";
import UpdateUser from "./app/components/admin/UpdateUser";
import ProductReviews from "./app/components/admin/ProductReviews.js";
import Contact from "./app/components/layout/Contact/Contact";
import About from "./app/components/layout/About/About";
import NotFound from "./app/components/layout/Not Found/NotFound";
import Register from "./app/components/User/Register";
import BlogList from "./app/components/admin/BlogList.js";
import NewBlog from "./app/components/admin/NewBlog.js";
import UpdateBlog from "./app/components/admin/UpdateBLog";
import BlogDetails from "./app/components/Blog/BlogDetails";
import Chart from "./app/components/admin/Chart";
import DashboardChart from "./app/components/admin/DashboardChart";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e)=> e.defaultPrevented());

  return (
    <Router>
      {/* <Headers /> */}

      {/* {isAuthenticated && <UserOption user={user} />} */}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/blog/:id" component={BlogDetails} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute exact path="/account" component={profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={ShippingInfo} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/blogs"
          isAdmin={true}
          component={BlogList}
        />
        <ProtectedRoute
          exact
          path="/admin/blog"
          isAdmin={true}
          component={NewBlog}
        />
        <ProtectedRoute
          exact
          path="/admin/blog/:id"
          isAdmin={true}
          component={UpdateBlog}
        />
        <ProtectedRoute
          exact
          path="/admin/chart"
          isAdmin={true}
          component={DashboardChart}
        />

        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

        <Route component={window.location.pathname === "/process/payment"} />
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
