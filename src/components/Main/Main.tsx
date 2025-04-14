import Particles from "react-tsparticles"
import { Container } from "./styles";
import { Hero } from "../Hero/Hero";
import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
import { Project } from "../Project/Project";
import { Skills } from "../Skills/Skills";

import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-svgrepo-com.svg";
import postgresqlIcon from "../../assets/postgresql.svg";
import linuxIcon from "../../assets/linux.svg";
import dockerIcon from "../../assets/docker.svg";
import nestjsIcon from "../../assets/nestjs.svg";
import expogoIcon from "../../assets/expo.svg";
import patroniIcon from "../../assets/patroni_rec.png";
import pgpoolIcon from "../../assets/pgpool.png";
import grafanaIcon from "../../assets/grafana.svg";
import prometheusIcon from "../../assets/prometheus.svg";
import minioobjectStoreIcon from "../../assets/minioobjectstore.png";
import pentahoIcon from "../../assets/pdi.png";
import hopIcon from "../../assets/hop.png";
import oracleIcon from "../../assets/oracle-icon.svg";
import oraclenameIcon from "../../assets/oracle.svg";
import nginxProxyManagerIcon from "../../assets/nginx-proxy-manager.png";
import pythonIcon from "../../assets/python.svg";
import portainerIcon from "../../assets/portainer.png";
import etcdIcon from "../../assets/etcd.png";
import powerbiIcon from "../../assets/powerbi.svg";
import cloudflareIcon from "../../assets/cloudflare.svg";
import gdalIcon from "../../assets/gdal.svg";
import wireguardIcon from "../../assets/wireguard.svg";
import jaspersoftIcon from "../../assets/jaspersoft.png";
import langchainIcon from "../../assets/langchain.png";


export function Main() {
  return (
    <Container>
      <Particles
        id="tsparticles"
        options={{
          "fullScreen": {
            "enable": true,
            "zIndex": 1
          },
          "detectRetina": true,
          "fpsLimit": 60,
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "push"
              },
              "onDiv": {
                "elementId": "repulse-div",
                "enable": false,
                "mode": "repulse"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble",
                "parallax": {
                  "enable": false,
                  "force": 60,
                  "smooth": 10
                }
              },
              "resize": true
            },
            "modes": {
              "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 2,
              },
              "connect": {
                "distance": 80,
                "lineLinked": {
                  "opacity": 0.5
                },
                "radius": 60
              },
              "grab": {
                "distance": 400,
                "lineLinked": {
                  "opacity": 1
                }
              },
              "push": {
                "quantity": 2
              },
              "remove": {
                "quantity": 2
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              }
            }
          },
          "particles": {
            "color": {
              "value": "#ffffff"
            },
            "lineLinked": {
              "blink": false,
              "color": "#000",
              "consent": false,
              "distance": 150,
              "enable": false,
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "attract": {
                "enable": false,
                "rotate": {
                  "x": 600,
                  "y": 1200
                }
              },
              "bounce": false,
              "direction": "none",
              "enable": true,
              "outMode": "out",
              "random": false,
              "speed": 2,
              "straight": false
            },
            "number": {
              "density": {
                "enable": true,
                "area": 800
              },
              "limit": 20,
              "value": 15,
            },
            "opacity": {
              "animation": {
                "enable": true,
                "minimumValue": 0.2,
                "speed": 1,
                "sync": false
              },
              "random": true,
              "value": 1
            },
            "rotate": {
              "animation": {
                "enable": true,
                "speed": 5,
                "sync": false
              },
              "direction": "random",
              "random": true,
              "value": 0
            },
            "shape": {
              "character": {
                "fill": false,
                "font": "Verdana",
                "style": "",
                "value": "*",
                "weight": "400"
              },
              "image": [
                {
                  "src": reactIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": typescriptIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": postgresqlIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": linuxIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": dockerIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": nestjsIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": expogoIcon,
                  "width": 20,
                  "height": 20
                },
                // {
                //   "src": patroniIcon,
                //   "width": 20,
                //   "height": 20
                // },
                {
                  "src": pgpoolIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": grafanaIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": prometheusIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": minioobjectStoreIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": pentahoIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": hopIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": oracleIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": oraclenameIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": nginxProxyManagerIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": pythonIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": portainerIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": etcdIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": powerbiIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": cloudflareIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": gdalIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": wireguardIcon,
                  "width": 20,
                  "height": 20
                },
                {
                  "src": jaspersoftIcon,
                  "width": 20,
                  "height": 20
                },
              ],
              "polygon": {
                "sides": 5
              },
              "stroke": {
                "color": "#000000",
                "width": 0
              },
              "type": "image"
            },
            "size": {
              "animation": {
                "enable": false,
                "minimumValue": 0.1,
                "speed": 40,
                "sync": false
              },
              "random": false,
              "value": 16
            }
          },
          "polygon": {
            "draw": {
              "enable": false,
              "lineColor": "#ffffff",
              "lineWidth": 0.5
            },
            "move": {
              "radius": 10
            },
            "scale": 1,
            "url": ""
          },
          "background": {
            "image": "",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
          }
        }}
      />
      <Hero></Hero>
      <About></About>
      <Skills></Skills>
      <Project></Project>
      <Contact></Contact>
    </Container>
  );
}