import React from 'react'
import { ButtonBase } from '@mui/material'
import { Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { adicionarItem, atualizarItem } from '../redux/store'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Util } from '@/lib/util'
import { useSteamCards } from '../hooks/useSteamCards'
import Item from '../types/Item'

export default function Home() {
  const dispatch = useDispatch()
  const carrinhoItens = useSelector((state: any) => state.carrinho.itens)
  const { cards, loading, error } = useSteamCards()

  const adicionarProdutoAoCarrinho = (produto: Item) => {
    const card = carrinhoItens.find(item => item.id === produto.id)

    if (card) {
      dispatch(atualizarItem({ id: produto.id }))
    } else {
      dispatch(adicionarItem({ ...produto, quantity: 1 }))
    }
  }

  return (
    <div>
      <section className="hero-section">
        <div className="hero-slider">
          <div
            className="hero-item d-flex align-items-center justify-content-center text-center parallax"
            style={{ backgroundImage: `url(/img/slider-bg-1.jpg)` }}
          >
            <div className="container">
              <div>
                <h3>
                  Mystery Box <br />
                  <span style={{ color: '#e259c1' }}>Steam Key</span>
                </h3>
                <span style={{ color: '#feefd9', fontSize: '1.2rem' }}>
                  Compre sua{' '}
                  <span style={{ fontSize: 'x-large' }}>
                    <strong>Mystery Box</strong>
                  </span>{' '}
                  e receba uma key surpresa da Steam! <br />
                  Pode vir indie, clássico ou até um jogão AAA
                </span>
              </div>
              <div
                style={{
                  paddingBottom: '48px',
                  top: '8vh',
                  position: 'relative'
                }}
              >
                <a
                  href="#shop"
                  className="site-btn"
                  style={{
                    border: '2px solid #b01ba5',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Tá pronto pro drop?
                  <Image
                    src="/img/icons/double-arrow.png"
                    alt="#"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="shop"
        style={{ backgroundImage: `url(/img/slider-bg-2.jpg)` }}
        className="intro-section"
      >
        <div className="container">
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>Erro ao carregar cards: {error.message}</p>
          ) : (
            <div className="row">
              <div
                className="col-12"
                style={{ textAlign: 'center', marginBottom: '30px' }}
              >
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: 'xx-large',
                    color: '#c01873',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Steam Card🎮
                </p>

                <p
                  style={{
                    fontSize: 'x-large',
                    color: '#f3edc5',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: 1.5
                  }}
                >
                  Receba uma key e desbloqueie um game surpresa na{' '}
                  <strong>Steam</strong>! Pode ser aquele indie incrível ou um
                  título AAA inesperado.
                </p>
              </div>

              {cards.map(steamCard => (
                <div className="col-md-4" key={steamCard.id}>
                  <div
                    className="intro-text-box text-box text-white"
                    style={{ textAlign: 'left' }}
                  >
                    <div className="blog-thumb">
                      <ButtonBase
                        onClick={() => adicionarProdutoAoCarrinho(steamCard)}
                      >
                        <div className="image-container">
                          <Image
                            src={steamCard.pictureUrl}
                            alt=""
                            className="fade-image"
                          />
                          <div className="title-overlay">
                            <h4>{steamCard.title}</h4>
                          </div>
                          <div className="hover-icon">
                            <span className="div-span shop-div__span">
                              <AddShoppingCartIcon className="icon" />
                              <span className="shop-div__span">
                                Adicionar ao Carrinho
                              </span>
                            </span>
                          </div>
                        </div>
                      </ButtonBase>
                    </div>
                  </div>
                  <div className="btn-space">
                    <ButtonBase
                      onClick={() => adicionarProdutoAoCarrinho(steamCard)}
                      className="btn-buy"
                    >
                      <span className="btn-text">Adicionar ao Carrinho</span>
                      <span className="btn-price">
                        <AddShoppingCartIcon style={{ fontSize: 20 }} />
                        {Util.convertToCurrency(steamCard.unitPrice)}
                        <Image
                          src="/img/icons/double-arrow.png"
                          alt="#"
                          width={12}
                          height={12}
                        />
                      </span>
                    </ButtonBase>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <h2>
            Quer ficar por dentro das promoções? Inscreva-se agora e não perca
            as melhores ofertas!
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
