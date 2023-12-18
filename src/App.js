import React,{ useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Hearder';




function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured 
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      

    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setblackHeader(true);
      }else{
        setblackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className="page">

      <Header black={blackHeader}/>

    {featuredData &&
      <FeaturedMovie item={featuredData} />
    }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Clone da Netflix feito com amor pelo IagoCustodio <span role="img" aria-lang="carinha-feliz">🙂</span><br/>
        Dados da API Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://blog.motionisland.com/wp-content/uploads/2022/03/Loading_13.gif" alt="Carregando"/>
        </div>
      } 
    </div>
  );
}

export default App;