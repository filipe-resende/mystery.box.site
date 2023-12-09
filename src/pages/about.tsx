import React from 'react'

export default function About() {
  return (
    <div>
      <section
        className="page-top-section"
        style={{
          backgroundImage: `url(img/page-top-bg/1.jpg)`
        }}
      >
        <div className="page-info">
          <h2>Games</h2>
          <div className="site-breadcrumb">
            <a href="">Início</a> /<span>Sobre</span>
          </div>
        </div>
      </section>

      <section className="games-single-page">
        <div className="container">
          <div className="game-single-preview">
            <img src="img/games/big.jpg" alt="" />
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-7 game-single-content">
              <h2 className="gs-title">Dúvidas frequentes:</h2>
              <h4>Como é feito o envio?</h4>
              <p>
                Será enviado a key (chave) sorteada para seu e-mail cadastrado
                na hora da criação da conta em até 24 horas.
              </p>
              <h4>Qual o prazo de envio?</h4>
              <p>O envio ocorre em até 24 horas.</p>
              <h4>Quais jogos podem vir?</h4>
              <p>
                Nós nos destacamos da maioria justamente pela qualidade das
                nossas chaves. Nosso catálogo inclui uma imensa quantidade de
                jogos conhecidos e famosos, além de vários títulos renomados e
                até mesmo lançamentos.
              </p>
              <h4>Porque enviam a chave por e-mail?</h4>
              <p>
                Temos a disposição um acervo muito grande de keys (chaves), na
                qual deixamos em nosso sistema interno para evitar qualquer erro
                ou problema. Assim que a compra é confirmada nosso sistema
                automaticamente identifica o e-mail do comprador, sorteia,
                separa e envia a key (chave) para o endereço de e-mail
                cadastrado, garantindo assim o total controle e qualidade do
                serviço.
              </p>
              <h4>Jogos que eu já possuo têm direito a reembolso?</h4>
              <p>
                Chaves de jogos que você já possui anteriormente na sua conta
                não podem ser reembolsadas ou trocadas. Isso se deve ao fato de
                que estamos lidando com produtos digitais de uso único, que não
                podem ser reutilizados. Nossos envios de jogos são aleatórios, e
                não temos acesso às contas da Steam para verificar os jogos em
                cada biblioteca. Além disso, interferir nesse processo aleatório
                prejudicaria a natureza imparcial e aleatória das chaves
                distribuídas.
              </p>
              <div className="geme-social-share pt-5 d-flex">
                <p>Share:</p>
                <a href="#">
                  <i className="fa fa-pinterest"></i>
                </a>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-dribbble"></i>
                </a>
                <a href="#">
                  <i className="fa fa-behance"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="game-author-section">
        <div className="container">
          <div
            className="game-author-pic set-bg"
            data-setbg="img/author.jpg"
          ></div>
          <div className="game-author-info">
            <h4>Sobre nós</h4>
            <p>
              Somos um grupo de jovens que sempre foi apaixonado por jogos e
              resolveu tornar o lazer em dinheiro, unindo-se para montar um
              negócio. Agora vendemos o que mais amamos: jogos. Desde o início,
              nosso comprometimento foi com a satisfação do cliente, garantindo
              a ele uma ótima experiência, tal qual temos ao jogar.
            </p>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <h2>Subscribe to our newsletter</h2>
          <form className="newsletter-form">
            <input type="text" placeholder="ENTER YOUR E-MAIL"></input>
            <button className="site-btn">
              subscribe <img src="img/icons/double-arrow.png" alt="#" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
