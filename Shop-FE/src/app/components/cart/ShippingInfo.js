import React, { Fragment, useState } from "react";
import "./ShippingInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../redux/actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIon from "@material-ui/icons/Phone";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import TransferWithinAStation from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "./CheckoutSteps.js";
import Headers from "../layout/header/Headers";
import Footer from "../layout/footer/Footer";
const ShippingInfo = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.PhoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Số điện thoại không hợp lệ");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };
  return (
    <Fragment>
      <Headers />
      <MetaData title="Thông tin chuyến hàng" />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Thông tin giao hàng</h2>
          <from className="shippingForm" encType="multipart/form-data">
            <div>
              <div className="label_info_input">Địa chỉ:</div>
              {/* <HomeIcon /> */}
              <input
                type="text"
                // placeholder="Địa chỉ"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <div className="shipping_info_row2">
                <div className="shipping_info_2input">
                  <div className="label_info_input">Quận:</div>
                  <input
                    type="text"
                    // placeholder="Quận"
                    required
                    value={city}
                    className="shipping_info-input"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="shipping_info_2input">
                  <div className="label_info_input">PCode:</div>
                  {/* <PinDropIcon /> */}
                  <input
                    className="shipping_info-input"
                    type="number"
                    // placeholder="Mã bưu điện"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="label_info_input">SĐT:</div>
              {/* <PhoneIon /> */}
              <input
                type="number"
                // placeholder="Số điện thoại"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <div className="label_info_input">Nước:</div>
              {/* <PublicIcon /> */}
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Quốc gia</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <div className="label_info_input">City</div>
                {/* <TransferWithinAStation /> */}
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Đơn vị</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Tiếp tục"
              className="shippingBtn"
              onClick={shippingSubmit}
              disabled={state ? false : true}
            />
          </from>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ShippingInfo;
