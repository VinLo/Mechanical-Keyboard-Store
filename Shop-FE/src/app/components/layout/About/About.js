import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import Headers from "../header/Headers";
import Footer from "../footer/Footer";
const About = () => {
  const visitInstagramLoc = () => {
    window.location = "";
  };
  return (
    // <div className="aboutSection">
    //   <div></div>
    //   <div className="aboutSectionGradient"></div>
    //   <div className="aboutSectionContainer">
    //     <Typography component="h1">Thông tin liên hệ</Typography>

    //     <div>
    //       <div className="container-left">
    //         <Avatar
    //           style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
    //           src=""
    //           alt="Founder"
    //         />
    //       </div>
    //       <div className="container-right">
    //         <Avatar
    //           style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
    //           src=""
    //           alt="Founder"
    //         />
    //         <Typography>Vĩnh Lộc</Typography>
    //         <Button onClick={visitInstagramLoc} color="primary">
    //           Instagram
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <Headers></Headers>
      <div className="about_body">
        <h1
          style={{
            fontSize: "44px",
            textAlign: "center",
            padding: "10px 0 10px 0",
            borderBottom: "1px solid #CFA147",
            paddingBottom: "4px",
          }}
        >
          Về Chúng tôi
        </h1>
        <div className="about_wrapper">
          <div className="_about">
            <div className="about_section">
              <div className="bg_about"></div>
              <div className="about_info">
                <div>
                  <h2>
                    <strong>
                      <font color="#ffffff">Tôi</font>
                      <font color="#000000"></font>
                      <font color="#dd3333">Phác thảo.</font>
                    </strong>
                  </h2>
                  <h2>
                    <strong>
                      <font color="#ffffff">Tôi</font>
                      <font color="#000000"></font>
                      <font color="#dd3333">Làm mô hình.</font>
                    </strong>
                  </h2>
                  <h2>
                    <strong>
                      <font color="#ffffff">Tôi</font>
                      <font color="#000000"></font>
                      <font color="#dd3333">Dựng nguyên mẫu.</font>
                    </strong>
                  </h2>
                </div>
                <div className="about_info_right">
                  <p>
                    <font color="#ffffff">
                      Chúng tôi là nhà sản xuất hoàn toàn mới tạo ra với
                      các khuôn được thiết kế tốt và các huyền thoại nhất quán
                      đậm, sắc nét.
                    </font>
                  </p>
                  <br />
                  <p>
                    <font color="#ffffff">
                      Chúng tôi đã được hình dung để thay đổi quá trình phát
                      triển hiện tại của nhóm mua keycap trong cộng đồng bàn
                      phím cơ. Thông thường, mọi giao dịch mua keycap theo nhóm
                      yêu cầu người tham gia phải đợi một thời gian dài vì các
                      nhà thiết kế, nhà cung cấp và nhà sản xuất tham gia vào
                      quá trình trao đổi qua lại kéo dài để tạo ra sản phẩm hoàn
                      thiện. Với chúng tôi, chúng tôi hy vọng sẽ thay đổi trò
                      chơi và giúp cộng đồng nhận keycaps của họ nhanh hơn.
                      Chúng tôi sẽ hoàn thành tất cả các quy trình cần thiết
                      trước khi các bộ keycap tiến hành mua theo nhóm (bao gồm
                      xác nhận màu sắc và mẫu với nhà thiết kế, lấy tất cả thông
                      tin yêu cầu từ nhà cung cấp, v.v.) Giao tiếp để tạo ra sản
                      phẩm hoàn thiện. Với chúng tôi hy vọng sẽ thay đổi trò
                      chơi và giúp cộng đồng nhận keycaps của họ nhanh hơn.
                    </font>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about_section2">
          <h1 style={{ textAlign: "center", margin: "10px 0 10px 0" }}>
            Công nghệ in keycaps
          </h1>
          <p className="text_edit">
            Khuôn ép nhựa gấp đôi được chúng tôi sử dụng, khuôn hỗ trợ PBT (chủ
            yếu là nguyên liệu thô PBT, không phải nguyên liệu 100% PBT nguyên
            chất) hoặc vật liệu ABS 2, Hiragana subleosystem được tạo ra với
            việc sử dụng công nghệ ép phun ba lần, có thể hiển thị 3 màu trên
            Keycaps, keycaps nhựa, Latin, Hiragana 3 màu khác nhau.
          </p>
        </div>
        <div className="about_section2_img">
          <img src="https://ucarecdn.com/15804395-65de-401c-b831-8fe9f99f763e/-/format/auto/-/preview/480x480/-/quality/lighter/back.jpg" />
          <img src="https://ucarecdn.com/a16bd99b-8341-4912-a281-48611f6f5f4b/-/format/auto/-/preview/480x480/-/quality/lighter/4.jpg" />
          <img src="https://ucarecdn.com/b0403f4e-6e30-4fc6-9a03-f15716051e4d/-/format/auto/-/preview/480x480/-/quality/lighter/9.jpg" />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
