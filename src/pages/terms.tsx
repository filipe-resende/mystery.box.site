import React from 'react'

export default function Terms() {
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
            <a href="">Início</a> /<span>Termos de Uso</span>
          </div>
        </div>
      </section>

      <section className="games-single-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 game-single-content">
              <h2 className="gs-title">Termos de Uso</h2>
              <h4>1. Aceitação dos Termos</h4>
              <p>
                Bem-vindo ao site. Estes Termos de Uso regulam o acesso e o uso
                deste site. Ao utilizar nossos serviços, você concorda em
                cumprir e aceitar todos os termos e condições aqui
                estabelecidos. Se não concordar com estes termos, não utilize
                nossos serviços.
              </p>
              <h4>2. Elegibilidade</h4>
              <p>
                Você deve ter pelo menos 18 anos de idade para utilizar nossos
                serviços. Ao aceitar estes Termos de Uso, você declara e garante
                que possui a capacidade legal para cumprir este acordo.
              </p>
              <h4>3. Uso do Site</h4>
              <p>
                Você concorda em fornecer informações verdadeiras, precisas e
                atualizadas durante o uso do site. Você é responsável por manter
                a confidencialidade de suas informações de login e é
                inteiramente responsável por todas as atividades que ocorrem sob
                sua conta. Você concorda em não utilizar nossos serviços para
                atividades ilegais, fraudulentas ou não autorizadas.
              </p>
              <h4>4. Códigos Aleatórios da Steam</h4>
              <p>
                Oferecemos códigos aleatórios da Steam que são fornecidos recém
                gerados. Não garantimos a compatibilidade ou funcionalidade do
                jogo em cada sistema ou equipamente em específico, apenas
                garantimos a compatibilidade com a plataforma Steam.
                Reservamo-nos o direito de alterar, limitar ou encerrar a venda
                de códigos a qualquer momento, sem aviso prévio. Os códigos são
                para uso pessoal e não comercial. Qualquer uso indevido pode
                resultar na suspensão ou encerramento de sua conta.
              </p>
              <h4>5. Responsabilidade por Jogos na Conta do Cliente</h4>
              <p>
                Não nos responsabilizamos por jogos que o cliente já possui em
                sua conta da Steam ou em qualquer outra plataforma. Como nossos
                códigos são aleatórios, não temos controle sobre os jogos
                específicos que serão fornecidos no ato da entrega. Recomendamos
                que os clientes verifiquem sua biblioteca de jogos antes de
                resgatar os códigos para evitar duplicatas. Não temos acesso à
                conta Steam do cliente nem podemos verificar sua biblioteca de
                jogos.
              </p>
              <h4>6. Direitos Autorais e Propriedade Intelectual</h4>
              <p>
                Todo o conteúdo do site, incluindo textos, imagens, logotipos e
                design, é de propriedade exclusiva de Gamer Lucky ou é usado sob
                licença. O conteúdo é protegido por leis de direitos autorais e
                outras leis de propriedade intelectual. Não é permitida a
                reprodução, distribuição ou modificação do conteúdo sem
                autorização expressa por escrito.
              </p>
              <h4>7. Limitação de Responsabilidade</h4>
              <p>
                Não somos responsáveis por quaisquer danos diretos, indiretos,
                incidentais, especiais ou consequentes decorrentes do uso dos
                jogos resgatados, sendo responsabilidade exclusiva dos
                portadores dos direitos do jogo em questão, apenas realizamos o
                intermédio fornecedor/cliente. Reservamo-nos o direito de
                modificar, suspender ou interromper o site a qualquer momento,
                sem aviso prévio.
              </p>
              <h4>8. Links para Sites de Terceiros</h4>
              <p>
                Nosso site pode conter links para sites de terceiros. Não
                endossamos ou garantimos a precisão do conteúdo nesses sites e
                não somos responsáveis pelo seu conteúdo ou práticas de
                privacidade.
              </p>
              <h4>9. Lei Aplicável e Jurisdição</h4>
              <p>
                Estes Termos de Uso serão regidos e interpretados de acordo com
                as leis brasileiras. Qualquer disputa relacionada a estes termos
                será submetida à jurisdição exclusiva dos tribunais brasileiros.
              </p>
              <h4>10. Alterações nos Termos</h4>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a
                qualquer momento. As alterações entrarão em vigor imediatamente
                após a publicação no site.
              </p>
              <h4>11. Contato</h4>
              <p>
                Para entrar em contato conosco sobre qualquer assunto
                relacionado a estes Termos de Uso, utilize as informações de
                contato disponíveis em nosso site.
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
            <p>
              Ao utilizar nosso site, você concorda com estes Termos de Uso.
              Estes termos representam o acordo completo entre você e substituem
              todos os acordos anteriores.
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
