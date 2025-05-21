import Footer from "./Components/Layout/Footer";
import Navbar from "./Components/Layout/Navbar";

export default function Home() {
  return (
    <body>
      <div>
        <Navbar>
        </Navbar>
        <button className="Navres" type="button"></button>
      </div>
      <div>
        <section>
          <div>
            <video src="https://youtu.be/knrc4q1S_q0?si=YCHL-xqUwQONljHv"></video>
            <h1>Destacada de la semana</h1>
          </div>
        </section>
        <section className="py-4">
          <div className="px-6 py-2">
            <h1>Estrenos</h1>
          </div>
          <div>
            <div>
              <a href="...">
                <img src="https://statics.cinemex.com/movie_posters/DIlENCb0ST1jQae-360x540.jpg" alt="" />
              </a>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="px-6 py-2">
            <h1>Todas las películas</h1>
          </div>
          <div>
            <div>
              <a href="...">
                <img src="https://statics.cinemex.com/movie_posters/lgECoCNB7nor0WK-360x540.jpg" alt="" />
              </a>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="px-6 py-2">
            <h1>Preventa</h1>
          </div>
          <div>
            <div>
              <a href="...">
                <img src="https://statics.cinemex.com/movie_posters/JOUJiAnsXiw0ndP-360x540.jpg" alt="" />
              </a>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="px-6 py-2">
            <h1>Próximos Estrenos</h1>
          </div>
          <div>
            <div>
              <a href="...">
                <img src="https://statics.cinemex.com/movie_posters/1FYsHfJwiSRNzQv-360x540.jpg" alt="" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="py-12">
        <Footer></Footer>
      </div>
    </body>
  );
}
