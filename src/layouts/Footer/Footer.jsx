import footerPhone from "../../assets/footer/footer-phone.png";
import apple from "../../assets/footer/apple.png";
import google from "../../assets/footer/google.png";
import useLang from "../../utils/useLang";
import PoweredBy from "./FooterSubsections/PoweredBy";
const Footer = () => {
  return (
     <footer className="footer mt-5">
      {/* download IR section */}
      <div className="download-section" style={{ background: "linear-gradient(180deg, #CFAF7A -120.78%, #FFFFFF 41.3%)",padding:"100px 0px"}}>
        <div className="container">
          <div className="row justify-content-center align-items-center">

            <div className="col-12 col-sm-5 m-auto text-center">
               <img src={footerPhone} loading="lazy" className="w-100 h-100" style={{maxWidth:"185px"}} />
            </div>

            <div className="col-12 col-sm-7 mt-4">
              <div className={`content text-center ${useLang("text-sm-start","text-sm-end")}`}>
                <h3 className="text-capitalize custom-fs-2 fw-semibold m-0">{useLang("investor relations app","تطبيق علاقات المستثمرين")}</h3>
                <p className="mt-3 mb-4 custom-fs-5">{useLang(
                  "Access the latest share prices, financial updates, company announcements, investor relations calendar, and more. all in one place.",
                  "اطّلع على أحدث أسعار الأسهم، والتحديثات المالية، وإعلانات الشركة، وتقويم علاقات المستثمرين، والمزيد — كل ذلك في مكان واحد.")}</p>
                  <div className="d-flex justify-content-center justify-content-sm-start align-items-center gap-2">
                    <a href="https://apps.apple.com/us/app/almajdiah-ir/id6756304277" target="_blank" rel="noopener noreferrer" >
                      <img src={apple} loading="lazy" className="w-100 h-100" />
                    </a>
                     <a href="https://play.google.com/store/apps/details?id=app.argaam.ir.almajdiah" target="_blank" rel="noopener noreferrer">
                      <img src={google} loading="lazy" className="w-100 h-100"/>
                     </a>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
     <PoweredBy/>
    </footer>
  );
};

export default Footer;
