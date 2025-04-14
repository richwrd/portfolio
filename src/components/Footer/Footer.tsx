import { Container } from './styles'
import reactIcon from '../../assets/react-icon.svg'
import linkedin from '../../assets/linkedin.svg'
import githubIcon from '../../assets/github.svg'
import whatsapp from '../../assets/whatsapp.svg'
import telegram from '../../assets/telegram.svg'
import instagramIcon from '../../assets/instagram.svg'
import x from '../../assets/twitterx.png'

export function Footer() {
  return (
    <Container className="footer" style={{ textAlign: 'center', alignItems: "center", justifyContent: 'center' }}>

      <div>
        <p>
          Feito com
          <span>❤️</span>
          <img src={reactIcon} alt="React" />
        </p>
      </div>

      &nbsp;
      &nbsp;

      <br />
      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/eduardorichard/"
          target="_blank"
          rel="noreferrer"
          style={{ height: 30, padding: 0, borderRadius: 6 }}
        >
          <img src={linkedin} alt="Linkedin" sizes="15" />
        </a>

      </div>
    </Container>
  )
}
