import React from 'react'
import { ButtonBase } from '@mui/material'
import { Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { adicionarItem, atualizarItem } from '../redux/store'
import Item from '../types/Item'

export default function Home() {
  const carrinhoItens = useSelector((state: any) => state.carrinho.itens)
  const dispatch = useDispatch()

  const adicionarProdutoAoCarrinho = (produto: Item) => {
    const produtoExistente = carrinhoItens.find(item => item.id === produto.id)

    if (produtoExistente) {
      dispatch(atualizarItem({ id: produtoExistente.id }))
    } else {
      dispatch(adicionarItem({ ...produto }))
    }
  }

  return (
    <div className="App">
      <section className="hero-section">
        <div className="hero-slider">
          <div
            className="hero-item d-flex align-items-center justify-content-center text-center"
            style={{
              backgroundImage: `url(/img/slider-bg-1.jpg)`
            }}
          >
            <div className="container">
              <h2>Mistery Box</h2>
              <p>
                <br />
                Desvende os enigmas da Steam e mergulhe em uma diversão sem
                limites com nossas{' '}
                <span style={{ color: '#b01ba5' }}>
                  {' '}
                  Mistery Box de Jogos Steam
                </span>
                , uma experiência inigualável para os amantes de games!
              </p>
              <a href="#shop" className="site-btn">
                Shop <Image src="/img/icons/double-arrow.png" alt="#" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div
                className="intro-text-box text-box text-white"
                style={{ textAlign: 'left' }}
              >
                <div className="blog-thumb">
                  <ButtonBase
                    onClick={() =>
                      adicionarProdutoAoCarrinho({
                        id: 1,
                        name: 'MisteryBox',
                        price: 19.9,
                        thumb: '/img/blog/1.jpg',
                        quantity: 1,
                        description: 'Steam MisteryBox Basic'
                      })
                    }
                  >
                    <div className="image-container">
                      <Image src="/img/blog/1.jpg" alt="" />
                      <div className="hover-icon">
                        <i className="fa fa-shopping-bag "></i>
                      </div>
                    </div>
                  </ButtonBase>
                </div>
                <p>Steam Card</p>
                <div className="top-meta">
                  Basic <a href="">Mistery Box</a>
                </div>
                <a href="#" className="read-more">
                  $19.90 <Image src="/img/icons/double-arrow.png" alt="#" />
                </a>
              </div>
            </div>
            <div id="#shop" className="col-md-4">
              <div
                className="intro-text-box text-box text-white"
                style={{ textAlign: 'left' }}
              >
                <div className="blog-thumb">
                  <ButtonBase
                    onClick={() =>
                      adicionarProdutoAoCarrinho({
                        id: 2,
                        name: 'Delux MisteryBox',
                        price: 23.9,
                        thumb: '/img/blog/2.jpg',
                        quantity: 1,
                        description: 'Steam MisteryBox Delux'
                      })
                    }
                  >
                    <div className="image-container">
                      <Image src="/img/blog/2.jpg" alt="" />
                      <div className="hover-icon">
                        <i className="fa fa-shopping-bag"></i>
                      </div>
                    </div>
                  </ButtonBase>
                </div>
                <p>Steam Card</p>
                <div className="top-meta">
                  Delux<a href=""> Mistery Box</a>
                </div>
                <a href="#" className="read-more">
                  $23.90 <Image src="/img/icons/double-arrow.png" alt="#" />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="intro-text-box text-box text-white"
                style={{ textAlign: 'left' }}
              >
                <div className="blog-thumb">
                  <ButtonBase
                    onClick={() =>
                      adicionarProdutoAoCarrinho({
                        id: 3,
                        name: 'Master MisteryBox',
                        price: 29.9,
                        thumb: '/img/blog/3.jpg',
                        quantity: 1,
                        description: 'Steam MisteryBox Master'
                      })
                    }
                  >
                    <div className="image-container">
                      <Image src="/img/blog/3.jpg" alt="" />
                      <div className="hover-icon">
                        <i className="fa fa-shopping-bag"></i>
                      </div>
                    </div>
                  </ButtonBase>
                </div>
                <p>Steam Card</p>
                <div className="top-meta">
                  Master <a href=""> Mistery Box</a>
                </div>
                <a href="#" className="read-more">
                  $29.90 <Image src="/img/icons/double-arrow.png" alt="#" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <h2>
            Quer ficar por dentro das promoções? Inscreva-se agora e não perca
            as melhores ofertas!{' '}
          </h2>
          <form className="newsletter-form">
            <input type="text" placeholder="Digite seu email" />
            <button className="site-btn">
              Enviar <Image src="/img/icons/double-arrow.png" alt="#" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
