import { BrowserRouter } from "react-router-dom"
import { Container } from "./styles"
import ScrollAnimation from "react-animate-on-scroll"
import Illustration from "../../assets/illustration.svg"
import { NavHashLink } from "react-router-hash-link"
import linkedin from '../../assets/linkedin.svg'
import x from '../../assets/twitterx.png'
import githubIcon from '../../assets/github.svg'
import whatsapp from '../../assets/whatsapp.svg'
import Hello from '../../assets/Hello.gif'
import telegram from '../../assets/telegram.svg'
export function Hero() {
  return (
    <Container id="home" style={{ minHeight: "100vh" }}>
      <div className="hero-text">
        {/* animateIn="fadeInUp" */}
        <ScrollAnimation animateIn="fadeInUp">
          <p>Olá <img src={Hello} alt="Hello" width="20px" />, eu sou <br /> <br /></p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.2 * 1000}>
          <h1>  Eduardo Richard</h1>
        </ScrollAnimation>
        <p></p>
        <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
          <h3></h3>
        </ScrollAnimation>
        <p></p>
        <ScrollAnimation animateIn="fadeInUp" delay={0.6 * 1000}>
          <p className="small-resume">Engenheiro de Dados | DevOps</p>
        </ScrollAnimation>
        <p></p>
        <ScrollAnimation animateIn="fadeInUp" delay={0.6 * 1000}>
          <p className="small-resume">+2 Anos de Experiência</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.8 * 1000}>
          <BrowserRouter>
            <NavHashLink smooth to="#contact" className="button">Contato</NavHashLink>
          </BrowserRouter>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={1 * 1000}>
          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/dheeraj-prajapati-38993a253/"
              target="_blank"
              rel="noreferrer"
              style={{ height: 34, padding: 0, borderRadius: 6 }}
            >
              <img src={linkedin} alt="Linkedin" sizes="15" />
            </a>
            <a
              href="https://github.com/richwrd"
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a
              href="https://wa.me/5544997077333?text=Ol%C3%A1%2C+acabei+de+ver+seu+portf%C3%B3lio+e+gostaria+de+conversar+sobre+um+projeto."
              target="_blank"
              rel="noreferrer"
            >
              <img src={whatsapp} alt="Whatsapp" />
            </a>

          </div>
        </ScrollAnimation>
      </div>
      <div className="hero-image">
        <ScrollAnimation animateIn="fadeInRight" delay={1 * 1000}>


          <img src={Illustration} alt="Ilustração" />


        </ScrollAnimation>
      </div>
    </Container>
  )
}