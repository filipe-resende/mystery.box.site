import React, { useEffect, useState } from 'react'
import { ButtonBase } from '@mui/material'
import { Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { adicionarItem, atualizarItem } from '../redux/store'
import Item from '../types/Item'
import { getSteamCards } from '../services/steamCardService'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Util } from '../util/util'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const carrinhoItens = useSelector((state: any) => state.carrinho.itens)
  const [steamCards, setSteamCards] = useState<Item[]>(null)

  const dispatch = useDispatch()

  const adicionarProdutoAoCarrinho = (produto: Item) => {
    const produtoExistente = carrinhoItens.find(item => item.id === produto.id)

    if (produtoExistente) {
      dispatch(atualizarItem({ id: produtoExistente.id }))
    } else {
      dispatch(adicionarItem({ ...produto }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const steamCards = await getSteamCards()
        setSteamCards(steamCards)
      } catch (erro) {
        console.error('Erro na requisição get Steam Cards:', erro.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <section className="hero-section">
        <div className="hero-slider">
          <div
            className="hero-item d-flex align-items-center justify-content-center text-center parallax"
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
            {steamCards?.map(steamCard => (
              <div className="col-md-4" key={steamCard.id}>
                <div
                  className="intro-text-box text-box text-white"
                  style={{ textAlign: 'left' }}
                >
                  <div className="blog-thumb">
                    <ButtonBase
                      onClick={() =>
                        adicionarProdutoAoCarrinho({
                          id: steamCard.id,
                          name: steamCard.name,
                          price: steamCard.price,
                          thumb: steamCard.thumb,
                          quantity: 1,
                          description: steamCard.description
                        })
                      }
                    >
                      <div className="image-container">
                        <Image src={steamCard.thumb} alt="" />
                        <div className="hover-icon ">
                          <span className="div-span shop-div__span">
                            <AddShoppingCartIcon className="icon" />
                            Adicionar ao Carrinho
                          </span>{' '}
                        </div>
                      </div>
                    </ButtonBase>
                  </div>
                  <p>Steam Card</p>
                  <div className="top-meta">
                    <a href="">{steamCard.name}</a>
                  </div>
                  <a href="#" className="read-more">
                    {Util.convertToCurrency(steamCard.price)}{' '}
                    <Image src="/img/icons/double-arrow.png" alt="#" />
                  </a>
                </div>
              </div>
            ))}
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
