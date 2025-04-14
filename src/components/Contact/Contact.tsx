import { Container } from "./styles";
import emailIcon from "../../assets/email.svg";
import phoneIcon from "../../assets/whatsapp.svg"
import { Form } from "../Form/Form";


export function Contact() {

  return (
    <Container id="contact">
      <header>
        <h2>Contato</h2>
        <p>Pronto para começar seu projeto?</p>
        <p>Entre em contato comigo agora para uma consulta gratuita.</p>
      </header>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
          alignItems: 'center',
          marginTop: 50
        }}
      >
        <div
          style={{
            backgroundColor: 'rgb(35, 206, 107)',
            width: '100%',
            maxWidth: 350,
            padding: 15,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a href="mailto:eduardorichwrd@gmail.com">
            <img src={emailIcon} alt="Email" width={30} />
          </a>
          <a
            href="mailto:eduardorichwrd@gmail.com"
            style={{ color: 'white', paddingLeft: 15 }}
          >
            eduardorichwrd@gmail.com
          </a>
        </div>

        <div
          style={{
            backgroundColor: 'rgb(35, 206, 107)',
            width: '100%',
            maxWidth: 350,
            padding: 15,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
          }}
        >

          <a href="https://wa.me/5544997077333?text=Ol%C3%A1%2C+acabei+de+ver+seu+portf%C3%B3lio+e+gostaria+de+conversar+sobre+um+projeto." target="_blank" rel="noopener noreferrer">
            <img src={phoneIcon} alt="Phone No" width={30} />
          </a>
          <a href="https://wa.me/5544997077333?text=Ol%C3%A1%2C+acabei+de+ver+seu+portf%C3%B3lio+e+gostaria+de+conversar+sobre+um+projeto." target="_blank" rel="noopener noreferrer" style={{ color: 'white', paddingLeft: 15 }}>
            (+44) 99707-7333
          </a>
        </div>
      </div>

      {/* <Form></Form> */}
    </Container>
  )
}